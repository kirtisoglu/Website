#!/usr/bin/env python3
"""
Generate FalcomPlot dashboard datasets from FalcomChain.

For each preset, this script:
  1. Builds a base graph (synthetic grid here; real data wiring elsewhere)
  2. Constructs an initial Partition + ChainState with travel times and
     a SuperFacilityAssignment factory (so level-2 ensemble stats are
     non-trivial)
  3. Attaches a Recorder (record_substeps=True) and an EnsembleStats
     callback to the chain
  4. Runs the chain for `total_steps`
  5. Calls Recorder.export_to_json to materialize manifest.json + step_*.json
     + phases/phases_*.json
  6. Writes blocks.json (1x1 grid cell polygons) and ensemble.json

Output layout::

    website/static/falcomplot/<preset_id>/
        blocks.json
        manifest.json
        ensemble.json
        step_0001.json
        ...
        phases/phases_0001.json
        ...

Run::

    python website/scripts/generate_datasets.py             # all presets
    python website/scripts/generate_datasets.py grid_10x10  # one preset
"""

from __future__ import annotations

import json
import math
import shutil
import sys
from functools import partial
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Tuple

# --- repo path setup -------------------------------------------------------

HERE = Path(__file__).resolve().parent
WEBSITE_ROOT = HERE.parent
REPO_ROOT = WEBSITE_ROOT.parent
FALCOMCHAIN_PATH = REPO_ROOT / "FalcomChain"
if str(FALCOMCHAIN_PATH) not in sys.path:
    sys.path.insert(0, str(FALCOMCHAIN_PATH))

OUTPUT_ROOT = WEBSITE_ROOT / "static" / "falcomplot"


# --- imports ---------------------------------------------------------------

from falcomchain.candidates import repair_facility_density  # noqa: E402
from falcomchain.ensemble import EnsembleStats  # noqa: E402
from falcomchain.graph.grid import Grid  # noqa: E402
from falcomchain.markovchain.accept import always_accept  # noqa: E402
from falcomchain.markovchain.chain import MarkovChain  # noqa: E402
from falcomchain.markovchain.energy import compute_energy  # noqa: E402
from falcomchain.markovchain.facility import SuperFacilityAssignment  # noqa: E402
from falcomchain.markovchain.proposals import hierarchical_recom  # noqa: E402
from falcomchain.markovchain.state import ChainState  # noqa: E402
from falcomchain.partition import Partition  # noqa: E402
from falcomchain.partition.assignment import Assignment  # noqa: E402
from falcomchain.random import set_seed  # noqa: E402
from falcomchain.tree.snapshot import Recorder  # noqa: E402


# ---------------------------------------------------------------------------
# Presets
# ---------------------------------------------------------------------------

PRESETS: Dict[str, dict] = {
    "grid_10x10": {
        "label": "10 x 10 demo grid",
        "description": (
            "100-node synthetic grid. Quick demo at low scale; useful for "
            "verifying the visual pipeline end-to-end."
        ),
        "dimensions": (10, 10),
        "num_candidates": 18,
        "demand_target": 1000,
        "epsilon_base": 0.2,
        "epsilon_super": 0.25,
        "capacity_level": 3,
        "total_steps": 80,
        "burn_in": 10,
        "thin": 1,
        "seed": 2025,
    },
    "grid_20x20": {
        "label": "20 x 20 grid",
        "description": (
            "400-node synthetic grid. Demonstrates the algorithm on a "
            "moderately sized planar graph; longer chain shows ensemble "
            "convergence of boundary and facility frequencies."
        ),
        "dimensions": (20, 20),
        "num_candidates": 60,
        "demand_target": 1000,
        "epsilon_base": 0.2,
        "epsilon_super": 0.25,
        "capacity_level": 3,
        "total_steps": 120,
        "burn_in": 20,
        "thin": 1,
        "seed": 2025,
    },
}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _set_grid_travel_times(graph) -> None:
    """Grids have unit-spaced coords — Manhattan distance is fine."""
    nodes = list(graph.nodes)
    Assignment.travel_times = {
        (a, b): float(abs(a[0] - b[0]) + abs(a[1] - b[1]))
        for a in nodes
        for b in nodes
    }


def _make_super_facility_fn(graph):
    """Re-uses the candidate set as the level-2 candidate set (every base
    candidate is also super-eligible) so SuperFacilityAssignment.initial
    has nonempty options. This is intentionally permissive for the demo;
    real data ships its own super_candidate flag."""
    for node, attrs in graph.nodes(data=True):
        attrs["super_candidate"] = 1 if attrs.get("candidate") else 0

    def factory(state):
        return SuperFacilityAssignment.from_state(state)

    return factory


def _grid_blocks_geojson(graph) -> dict:
    """Build a GeoJSON FeatureCollection of 1x1 cells around each grid node.

    Each feature carries ``properties.id`` matching the node id string
    (Recorder writes ids as ``str(node)``), so the dashboard can join
    block geometry to assignment data.
    """
    features = []
    for node, attrs in graph.nodes(data=True):
        cx = float(attrs.get("C_X", node[0]))
        cy = float(attrs.get("C_Y", node[1]))
        # 1x1 cell centered at (cx, cy)
        ring = [
            [cx - 0.5, cy - 0.5],
            [cx + 0.5, cy - 0.5],
            [cx + 0.5, cy + 0.5],
            [cx - 0.5, cy + 0.5],
            [cx - 0.5, cy - 0.5],
        ]
        features.append({
            "type": "Feature",
            "geometry": {"type": "Polygon", "coordinates": [ring]},
            "properties": {
                "id": str(node),
                "demand": int(attrs.get("demand", 0)),
                "area": float(attrs.get("area", 1.0)),
                "candidate": 1 if attrs.get("candidate") else 0,
                "super_candidate": 1 if attrs.get("super_candidate") else 0,
                "C_X": cx,
                "C_Y": cy,
            },
        })
    return {"type": "FeatureCollection", "features": features}


def _ensemble_to_json(ensemble: EnsembleStats) -> dict:
    """Serialize an EnsembleStats to a JSON-safe dict matching the renderer's
    expected schema. Edge keys are joined with '|' (renderer splits on it)."""
    bf = ensemble.boundary.frequencies()
    boundary = {f"{a}|{b}": float(f) for (a, b), f in bf.items()}

    facility = {str(n): float(f) for n, f in ensemble.facility.frequencies().items()}
    super_facility = {
        str(n): float(f) for n, f in ensemble.facility.super_frequencies().items()
    }

    cap = ensemble.capacity.summary()

    return {
        "n_samples": int(ensemble.n_samples),
        "boundary_frequencies": boundary,
        "facility_frequencies": facility,
        "super_facility_frequencies": super_facility,
        "robust_boundaries": {
            f"{a}|{b}": float(f) for (a, b), f in ensemble.boundary.robust().items()
        },
        "fragile_boundaries": {
            f"{a}|{b}": float(f) for (a, b), f in ensemble.boundary.fragile().items()
        },
        "essential_facilities": {
            str(n): float(f) for n, f in ensemble.facility.essential().items()
        },
        "substitutable_facilities": {
            str(n): float(f) for n, f in ensemble.facility.substitutable().items()
        },
        "capacity": cap,
    }


# ---------------------------------------------------------------------------
# Per-preset runner
# ---------------------------------------------------------------------------

def run_preset(name: str, cfg: dict, output_root: Path) -> Path:
    """Generate one dataset directory. Returns the directory path."""
    out_dir = output_root / name
    if out_dir.exists():
        shutil.rmtree(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    print(f"\n=== Generating {name} ===")
    print(f"  output: {out_dir}")
    print(f"  config: {cfg['dimensions']} grid, "
          f"{cfg['total_steps']} steps, seed={cfg['seed']}")

    set_seed(cfg["seed"])

    grid = Grid(
        dimensions=cfg["dimensions"],
        num_candidates=cfg["num_candidates"],
        density="uniform",
    )
    graph = grid.graph

    # Repair candidate density so the initial partition is feasible.
    artificial = repair_facility_density(
        graph,
        demand_target=cfg["demand_target"],
        epsilon=cfg["epsilon_base"],
        strategy="weighted_center",
        c_min=1,
    )
    print(f"  candidates: {sum(1 for _, d in graph.nodes(data=True) if d.get('candidate'))} "
          f"(+{len(artificial)} artificial)")

    # Build initial partition.
    partition = Partition.from_random_assignment(
        graph=graph,
        epsilon=cfg["epsilon_base"],
        demand_target=cfg["demand_target"],
        assignment_class=None,
        capacity_level=cfg["capacity_level"],
    )
    print(f"  partition: {len(partition)} districts, teams={dict(partition.teams)}")

    # Travel times (Manhattan on grid coords).
    _set_grid_travel_times(graph)

    # Initial state (level-1 + level-2 facilities, energy).
    super_fn = _make_super_facility_fn(graph)
    state = ChainState.initial(
        partition=partition,
        energy=0.0,
        beta=1.0,
        energy_fn=compute_energy,
        super_facility_fn=super_fn,
    )
    state.energy = compute_energy(state)
    print(f"  initial energy: {state.energy:.1f}")

    # Build proposal + chain. always_accept gives us the unconditional
    # sampling distribution from the paper — best for ensemble analysis.
    proposal = partial(
        hierarchical_recom,
        epsilon_base=cfg["epsilon_base"],
        epsilon_super=cfg["epsilon_super"],
        demand_target=cfg["demand_target"],
        c_min_base=1,
        c_min_super=2,
    )

    recorder = Recorder(str(out_dir / "_raw"), record_substeps=True)
    recorder.write_header(graph, partition, {
        "preset": name,
        "label": cfg["label"],
        "description": cfg["description"],
        "demand_target": cfg["demand_target"],
        "epsilon_base": cfg["epsilon_base"],
        "epsilon_super": cfg["epsilon_super"],
        "capacity_level": cfg["capacity_level"],
        "seed": cfg["seed"],
    })

    ensemble = EnsembleStats(burn_in=cfg["burn_in"], thin=cfg["thin"])

    chain = MarkovChain(
        proposal=proposal,
        constraints=lambda p: True,
        accept=always_accept,
        initial_state=state,
        total_steps=cfg["total_steps"] + 1,
        recorder=recorder,
        callbacks=[ensemble.observe],
    )

    accepted = 0
    failed = 0
    last_logged = -1
    for i, s in enumerate(chain):
        if s.energy is not None and getattr(s, "energy", None) is not None:
            pass
        # Lightweight progress
        if i % max(1, cfg["total_steps"] // 10) == 0 and i != last_logged:
            print(f"    step {i:>4d}  energy={s.energy:.1f}  ensemble n={ensemble.n_samples}")
            last_logged = i

    print(f"  ensemble samples: {ensemble.n_samples}")

    # Export to JSON (manifest.json, step_*.json, phases/).
    Recorder.export_to_json(str(out_dir / "_raw"), str(out_dir))

    # blocks.json — per-node 1x1 cell.
    blocks = _grid_blocks_geojson(graph)
    with open(out_dir / "blocks.json", "w") as f:
        json.dump(blocks, f, separators=(",", ":"))

    # ensemble.json
    ens = _ensemble_to_json(ensemble)
    with open(out_dir / "ensemble.json", "w") as f:
        json.dump(ens, f, separators=(",", ":"))

    # Clean up _raw fcrec — the dashboard only needs the JSON.
    shutil.rmtree(out_dir / "_raw", ignore_errors=True)

    # Compute size summary.
    total_bytes = sum(p.stat().st_size for p in out_dir.rglob("*") if p.is_file())
    print(f"  done: {total_bytes/1024:.0f} KB on disk")
    return out_dir


def write_index(output_root: Path) -> None:
    """Write a top-level datasets.json index that the dashboard reads to
    populate the dataset-picker dropdown."""
    items = []
    for name, cfg in PRESETS.items():
        d = output_root / name
        if not (d / "manifest.json").exists():
            continue
        items.append({
            "id": name,
            "label": cfg["label"],
            "description": cfg["description"],
            "path": f"/falcomplot/{name}",
            "total_steps": cfg["total_steps"],
            "graph_nodes": cfg["dimensions"][0] * cfg["dimensions"][1],
        })
    with open(output_root / "datasets.json", "w") as f:
        json.dump({"datasets": items}, f, indent=2)
    print(f"\nWrote {output_root / 'datasets.json'} ({len(items)} datasets)")


def main(argv: List[str]) -> int:
    requested = argv[1:] if len(argv) > 1 else list(PRESETS.keys())
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    for name in requested:
        if name not in PRESETS:
            print(f"unknown preset: {name}", file=sys.stderr)
            return 2
        run_preset(name, PRESETS[name], OUTPUT_ROOT)
    write_index(OUTPUT_ROOT)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
