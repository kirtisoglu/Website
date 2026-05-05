# FalCom Visualizer — overnight build notes

## What's shipped

A working FalCom Visualizer dashboard at **`/research/falcom/dashboard/`**.
The "Coming Soon" placeholder is gone.

```
npm run dev -- --port 5174
open http://127.0.0.1:5174/research/falcom/dashboard/
```

The dashboard renders the canvas animation, sidebar metadata, and an
"Overlay" dropdown for ensemble analysis (None / Boundary frequency /
Facility frequency / Capacity utilisation). The dataset picker at the top
swaps between pre-recorded chains.

## Files added / modified

### New
- `src/lib/falcomplot/` — vendored JS modules (renderer, dataLoader,
  animation, view, input, logger, geometry, config) plus a per-instance
  mount API.
  - `mountFalcomPlot.js` — `mountFalcomPlot({canvas, controlsEl,
    sidebarEl, statusEl, treeMetaEl, tooltipEl, dataPath})` returns a
    `cleanup()`.
  - `FalcomPlot.svelte` — Svelte wrapper. Pass `dataPath`, optionally
    `showEnsembleSelect` and `showStatusLog`. Re-mounts on `dataPath`
    changes.
  - `dataLoader.js` — parametrised on `dataPath`, with caching for
    steps + phases and a `loadEnsemble()` for `ensemble.json`.
  - `renderer.js` — added an ensemble overlay layer (boundary heatmap,
    facility-frequency rings, capacity placeholder).
- `src/routes/(fullscreen)/research/falcom/dashboard/+page.svelte` — the
  dashboard. Sits under the `(fullscreen)` route group so it occupies
  the whole viewport without the site nav/footer.
- `scripts/generate_datasets.py` — runs FalcomChain end-to-end (Recorder
  + EnsembleStats), exports manifest + step JSON, writes blocks.json and
  ensemble.json. Run with `python3 scripts/generate_datasets.py [preset]`.
- `static/falcomplot/datasets.json` — index consumed by the dashboard.
- `static/falcomplot/grid_10x10/` — pre-recorded 100-node demo chain
  (80 steps, 70 ensemble samples). ~2 MB.
- `static/falcomplot/grid_20x20/` — pre-recorded 400-node chain
  (120 steps, 100 ensemble samples). ~3.7 MB.

### Modified
- `src/routes/research/falcom/+page.svelte` — "Coming Soon" → "Open
  Visualizer" link to the dashboard.
- `src/routes/research/falcom/dashboard/+page.svelte` — deleted (replaced
  by the fullscreen variant; SvelteKit route groups don't change URL,
  so both can't coexist).
- `vite.config.js` — added `optimizeDeps.exclude` for `@deck.gl/*` so the
  dev server boots. The chicago-healthcare dashboard imports deck.gl,
  which transitively needs `@luma.gl/shadertools` + `@luma.gl/webgl`,
  neither of which is in `node_modules`. Excluding from pre-bundle keeps
  the rest of the site running. **Action item:** if you want the chicago
  dashboard back, run
  `npm install @luma.gl/shadertools @luma.gl/webgl --legacy-peer-deps`.

## Decisions worth knowing

- **Pre-recorded only.** I dropped the live-Pyodide-in-browser idea. The
  bundle hit (~50 MB Pyodide + numpy/networkx wheels) and 2-3 s startup
  weren't worth it for this first cut. Adding new datasets is a matter
  of rerunning `scripts/generate_datasets.py` with a new preset.
- **Skipped the LAS dataset for now.** The script has hooks for grids
  only. Adding LAS is a follow-up: load the LSOA graph + travel-time
  matrix from your Brain/LAS data, run a few hundred steps. The
  dashboard picks it up automatically once the directory and
  `datasets.json` entry exist.
- **Dataset format.**
  - `manifest.json`: `total_steps`, `graph_nodes`, `parameters`,
    `node_coordinates: {id: [x, y]}`, `node_candidates: {id: bool}`.
  - `step_NNNN.json`: `step`, `accepted`, `energy`, `assignment`,
    `changed_nodes`, `districts`.
  - `phases/phases_NNNN.json`: per-step phase data for the four-phase
    animation (upper level, select, lower level, accept/reject).
  - `blocks.json`: GeoJSON FeatureCollection. For grids I synthesize
    1×1 cells around each node so the overview mode has something to
    fill. For real geographies, pass the actual block GeoJSON with
    `properties.id` matching the FalcomChain node id.
  - `ensemble.json`: boundary/facility/capacity frequencies from
    `EnsembleStats.report()`. Edge keys are joined with `'|'`.
- **Energy was zero on first run** until I passed
  `energy_fn=compute_energy` to `ChainState.initial`. The proposal sets
  `energy=0.0` as a placeholder and only invokes `energy_fn` if it's
  set; FalCom is a sampler by default. Worth keeping in mind for any
  other recording pipeline.
- **`(fullscreen)` route group.** Same pattern as
  `(fullscreen)/research/chicago-healthcare-network/dashboard/`. The
  layout strips the nav/footer; the page draws its own topbar.

## Suggested next steps

1. **Smoke-test in browser** — verify animation, overlay dropdown,
   dataset switching. The static fetches return 200 and the SSR HTML
   has the right markers, but I can't actually click things.
2. **LAS dataset** — extend `PRESETS` in
   `scripts/generate_datasets.py` with a `las_subset` entry that loads
   the real graph + travel times.
3. **Capacity overlay** — currently a placeholder. A small histogram of
   demand-CV samples in the sidebar when capacity is selected would
   close the loop.
4. **Per-dataset chain config in sidebar** — could surface ε, d̄,
   capacity_level alongside the existing description / steps / nodes.
5. **Tomorrow's listed jobs** (library edits, tests on grids+LAS,
   writing experiments) don't depend on this work.
