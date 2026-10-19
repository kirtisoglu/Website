"""Rebuild the data behind /research/falcom/dashboard (the FalCom explorer).

Reads the FalComPlot LAS dataset and the LAS hierarchy map that already ship
with the site, and writes compact files for the explorer:

  static/falcomplot/las/{blocks,adjacency,manifest,ensemble}.json
  static/falcomplot/las/step_0001.json ... step_NNNN.json
  static/falcomplot/las_hierarchy.html      (LAS groups/sectors per LSOA, stations)
    ->  static/falcomplot/las/explorer/{lsoa,borders,outline,chain,meta}.json

Usage (from the repo root):
  pip install numpy shapely>=2.1
  python3 scripts/falcom-explorer/build_data.py
"""
import json, math, re, sys, collections
import numpy as np
import shapely
from shapely.geometry import shape, mapping
from shapely.ops import linemerge

import glob, os

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SRC = os.path.join(REPO, "static", "falcomplot", "las")
OUT = os.path.join(SRC, "explorer")
os.makedirs(OUT, exist_ok=True)
P = lambda *a: os.path.join(*a)

blocks = json.load(open(P(SRC, "blocks.json")))
adj = json.load(open(P(SRC, "adjacency.json")))
man = json.load(open(P(SRC, "manifest.json")))
ens = json.load(open(P(SRC, "ensemble.json")))


def load_steps():
    """Compress the per-step files to deltas: changed nodes, plus district
    tables only when they differ from the previous step."""
    out, last = [], None
    files = sorted(glob.glob(P(SRC, "step_*.json")))
    for f in files:
        d = json.load(open(f))
        ch = d["changed_nodes"]
        dids = sorted(int(k) for k in d["districts"])
        full = {"dd": dids,
                "sp": [int(d["supers"][str(k)]) for k in dids],
                "ce": [int(d["centers"][str(k)]) for k in dids],
                "tm": [int(d["districts"][str(k)]["teams"]) for k in dids],
                "dm": [round(d["districts"][str(k)]["demand"]) for k in dids]}
        rec = {"a": 1 if d["accepted"] else 0, "e": round(d["energy"], 1)}
        if ch:
            rec["cn"] = [int(k) for k in ch]
            rec["cd"] = [int(v) for v in ch.values()]
        if full != last:
            rec.update(full)
            last = full
        out.append(rec)
    return out


def load_las_layers():
    """Pull LAS group/sector per LSOA and station/HQ/EOC markers out of the
    Folium export (las_hierarchy.html)."""
    h = open(P(REPO, "static", "falcomplot", "las_hierarchy.html"), encoding="utf8").read()
    L = {}
    for name, js in re.findall(r"(geo_json_[0-9a-f]+)_add\((\{.*?)\);\n", h, re.S):
        fs = json.loads(js)["features"]
        if fs and fs[0]["geometry"]["type"] == "MultiPolygon" and "group" in fs[0].get("properties", {}) and "demand" in fs[0]["properties"]:
            L["lsoa"] = {f["properties"]["LSOA21CD"]: {k: f["properties"].get(k) for k in ("group", "sector", "demand", "population", "source")} for f in fs}
    mk = [(m.start(), float(m.group(1)), float(m.group(2))) for m in re.finditer(r"L\.marker\(\s*\[([0-9.\-]+),\s*([0-9.\-]+)\]", h)]
    tt = [(m.start(), m.group(1)) for m in re.finditer(r"\.bindTooltip\(\s*`<div>\s*(.*?)\s*</div>`", h, re.S)]
    L["markers"] = []
    for (p, lat, lon) in mk:
        t = min((x for x in tt if x[0] > p), key=lambda x: x[0])[1]
        L["markers"].append({"lat": lat, "lon": lon, "tip": re.sub(r"\s+", " ", t)})
    return L


steps = load_steps()
LAS = load_las_layers()

feats = blocks["features"]
N = len(feats)
ids = [int(f["properties"]["id"]) for f in feats]
idx = {nid: i for i, nid in enumerate(ids)}
codes = [f["properties"]["LSOA21CD"] for f in feats]
names = [f["properties"]["LSOA21NM"] for f in feats]
borough = [re.sub(r"\s+\d{3}[A-Z]$", "", n) for n in names]

def num(x):
    s = str(x).replace(",", "")
    return int(s) if s.isdigit() else 0

lsoa_attr = LAS["lsoa"]
demand = np.array([num(lsoa_attr[c]["demand"]) for c in codes], dtype=float)
pop = np.array([num(lsoa_attr[c]["population"]) for c in codes], dtype=float)
group = [lsoa_attr[c]["group"] for c in codes]
sector = [lsoa_attr[c]["sector"] for c in codes]

# ---------- geometry ----------
geoms = [shape(f["geometry"]) for f in feats]
geoms = [g if g.is_valid else g.buffer(0) for g in geoms]
simp = shapely.coverage_simplify(np.array(geoms, dtype=object), tolerance=0.00025, simplify_boundary=True)
cent = shapely.point_on_surface(np.array(geoms, dtype=object))
cx = np.array([p.x for p in cent]); cy = np.array([p.y for p in cent])

def rnd(c):
    if isinstance(c, (list, tuple)) and c and isinstance(c[0], (list, tuple)):
        return [rnd(x) for x in c]
    return [round(c[0], 5), round(c[1], 5)]

# distances (km) with local equirectangular projection
lat0 = math.radians(51.5)
KX, KY = 111.32 * math.cos(lat0), 110.57
def dkm(x1, y1, x2, y2):
    return np.hypot((x1 - x2) * KX, (y1 - y2) * KY)

# ---------- LAS facilities ----------
stations, hqs, eocs = [], [], []
for m in LAS["markers"]:
    t = m["tip"]
    head = re.sub(r"<[^>]+>", "", t.split("<br>")[0]).strip()
    if "type: group_hq" in t:
        veh = {k: int(v) for k, v in re.findall(r"(DCA|FRU|MRU|APP):\s*(?:<b>)?(\d+)", t)}
        onshift = re.search(r"on-shift (\d+)", t)
        nm = head.split("—")[1].strip() if "—" in head else head
        hqs.append(dict(lon=round(m["lon"], 5), lat=round(m["lat"], 5), name=nm, veh=veh,
                        onshift=int(onshift.group(1)) if onshift else None))
    elif "type: eoc" in t:
        eocs.append(dict(lon=round(m["lon"], 5), lat=round(m["lat"], 5), name=head.split("—")[-1].strip()))
    else:
        code, nm = [s.strip() for s in head.split("—", 1)]
        sec = re.search(r"sector:\s*([^<]+)", t)
        stations.append(dict(lon=round(m["lon"], 5), lat=round(m["lat"], 5), code=code, name=nm,
                             sector=sec.group(1).strip() if sec else ""))
SX = np.array([s["lon"] for s in stations]); SY = np.array([s["lat"] for s in stations])
D = np.stack([dkm(cx, cy, SX[j], SY[j]) for j in range(len(stations))], axis=1)
nearest = D.argmin(axis=1)
las_dist = D[np.arange(N), nearest]

# ---------- borders: one line per adjacent pair ----------
pairs = set()
for a, b in adj:
    a, b = int(a), int(b)
    if a in idx and b in idx and a != b:
        i, j = idx[a], idx[b]
        pairs.add((min(i, j), max(i, j)))
pairs = sorted(pairs)
bfreq = {}
for k, v in ens["boundary_frequencies"].items():
    a, b = (int(x) for x in k.split("|"))
    if a in idx and b in idx:
        i, j = idx[a], idx[b]
        bfreq[(min(i, j), max(i, j))] = v

border_feats, border_pairs, border_len = [], [], []
tree_b = [shapely.boundary(g) for g in simp]
for (i, j) in pairs:
    inter = shapely.intersection(tree_b[i], tree_b[j])
    if inter.is_empty:
        continue
    if inter.geom_type in ("MultiLineString", "GeometryCollection"):
        lines = [g for g in getattr(inter, "geoms", [inter]) if g.geom_type in ("LineString", "MultiLineString")]
        if not lines:
            continue
        inter = linemerge(shapely.union_all(lines)) if len(lines) > 1 else lines[0]
    if inter.geom_type not in ("LineString", "MultiLineString") or inter.length == 0:
        continue
    k = len(border_pairs)
    border_pairs.append((i, j))
    L = shapely.length(shapely.transform(inter, lambda c: c * np.array([KX, KY])))
    border_len.append(float(L))
    if group[i] == group[j]:
        lv = 1 if nearest[i] != nearest[j] else 0
    else:
        lv = 3 if sector[i] != sector[j] else 2
    gm = mapping(inter)
    gm["coordinates"] = rnd(gm["coordinates"])
    border_feats.append(dict(type="Feature", id=k, geometry=gm,
                             properties=dict(f=round(bfreq.get((i, j), 0.0), 3), l=lv,
                                             b=1 if borough[i] != borough[j] else 0)))

outline = shapely.coverage_union_all(np.array(simp, dtype=object))
outline_b = shapely.boundary(outline)

# ---------- chain replay ----------
dist_of = np.zeros(N, dtype=int)           # district id per node
supers_of_d, centers_of_d, teams_of_d, dem_of_d = {}, {}, {}, {}
A = np.array(border_pairs)
state_colors = []
prev_super_color_by_node = None
PALN = 6
chain_steps = []
stats = []
for si, s in enumerate(steps):
    if "cn" in s:
        for n, d in zip(s["cn"], s["cd"]):
            dist_of[idx[n]] = d
    if "dd" in s:
        supers_of_d = dict(zip(s["dd"], s["sp"]))
        centers_of_d = dict(zip(s["dd"], s["ce"]))
        teams_of_d = dict(zip(s["dd"], s["tm"]))
        dem_of_d = dict(zip(s["dd"], s["dm"]))
    need_color = ("dd" in s) or ("cn" in s) or si == 0
    sup_node = np.array([supers_of_d[d] for d in dist_of])
    rec = dict(a=s["a"], e=s["e"])
    if "cn" in s:
        rec["cn"] = [idx[n] for n in s["cn"]]
        rec["cd"] = s["cd"]
    if "dd" in s:
        rec["dd"] = s["dd"]; rec["sp"] = s["sp"]; rec["tm"] = s["tm"]
        rec["ce"] = [idx[c] for c in s["ce"]]
    if need_color:
        sids = sorted(set(sup_node.tolist()))
        nb = collections.defaultdict(set)
        su, sv = sup_node[A[:, 0]], sup_node[A[:, 1]]
        m = su != sv
        for x, y in zip(su[m], sv[m]):
            nb[x].add(y); nb[y].add(x)
        pref = {}
        if prev_super_color_by_node is not None:
            for sid in sids:
                cnt = collections.Counter(prev_super_color_by_node[sup_node == sid].tolist())
                pref[sid] = [c for c, _ in cnt.most_common()]
        color = {}
        order = sorted(sids, key=lambda x: -len(nb[x]))
        for sid in order:
            used = {color[o] for o in nb[sid] if o in color}
            choice = next((c for c in pref.get(sid, []) if c not in used and c < PALN), None)
            if choice is None:
                choice = next((c for c in range(PALN) if c not in used), PALN)
            color[sid] = choice
        prev_super_color_by_node = np.array([color[x] for x in sup_node])
        rec["co"] = {str(k): v for k, v in color.items()}
    # summary stats for this step
    sb = np.bincount(sup_node, weights=demand); db = np.bincount(dist_of, weights=demand)
    sup_dem = {k: sb[k] for k in np.unique(sup_node)}; dis_dem = {k: db[k] for k in np.unique(dist_of)}
    cen = {d: idx[c] for d, c in centers_of_d.items()}
    dd = dkm(cx, cy, cx[[cen[d] for d in dist_of]], cy[[cen[d] for d in dist_of]])
    sv = np.array(list(sup_dem.values()))
    per_team = np.array([dis_dem[d] / teams_of_d[d] for d in dis_dem])
    stats.append(dict(nS=len(sup_dem), nD=len(dis_dem), nT=int(sum(teams_of_d.values())),
                      cvS=round(float(sv.std() / sv.mean()), 4), rS=round(float(sv.max() / sv.min()), 3),
                      cvT=round(float(per_team.std() / per_team.mean()), 4),
                      dist=round(float((dd * demand).sum() / demand.sum()), 3)))
    chain_steps.append(rec)

# ---------- LAS stats ----------
gd = collections.Counter(); sd = collections.Counter(); std = collections.Counter()
for n in range(N):
    gd[group[n]] += demand[n]; sd[sector[n]] += demand[n]; std[nearest[n]] += demand[n]
gv = np.array(list(gd.values())); stv = np.array([std.get(j, 0) for j in range(len(stations))])
las_stats = dict(nSec=len(sd), nG=len(gd), nSt=len(stations),
                 cvG=round(float(gv.std() / gv.mean()), 4), rG=round(float(gv.max() / gv.min()), 3),
                 cvSt=round(float(stv.std() / stv.mean()), 4),
                 dist=round(float((las_dist * demand).sum() / demand.sum()), 3),
                 groups=sorted([[g, int(v)] for g, v in gd.items()], key=lambda x: -x[1]),
                 sectors=sorted([[g, int(v)] for g, v in sd.items()], key=lambda x: -x[1]))

# ---------- ensemble ----------
bl = np.array(border_len)
fr = np.array([bf["properties"]["f"] for bf in border_feats])
lv = np.array([bf["properties"]["l"] for bf in border_feats])
robust = fr >= 0.9
ens_stats = dict(n=ens["n_samples"], observed=int((fr > 0).sum()), robust=int(robust.sum()),
                 robustKm=round(float(bl[robust].sum()), 1),
                 robustOnLasGroup=round(float(bl[robust & (lv >= 2)].sum() / max(bl[robust].sum(), 1e-9)), 3),
                 lasGroupKm=round(float(bl[lv >= 2].sum()), 1),
                 lasGroupMeanFreq=round(float((fr[lv >= 2] * bl[lv >= 2]).sum() / bl[lv >= 2].sum()), 3),
                 otherMeanFreq=round(float((fr[lv < 2] * bl[lv < 2]).sum() / bl[lv < 2].sum()), 3),
                 facUsed=len(ens["facility_frequencies"]),
                 facEssential=ens["facility_essential_count"], facSub=ens["facility_substitutable_count"],
                 capacity=ens["capacity"])
real = {int(k) for k, v in man["node_candidates"].items() if v}
ffreq = {int(k): v for k, v in ens["facility_frequencies"].items()}
facfreq = []
for k, v in ffreq.items():
    if k in idx:
        i = idx[k]; facfreq.append([round(cx[i], 5), round(cy[i], 5), round(v, 3), 1 if k in real else 0])
ens_stats.update(realUsed=sum(1 for k in real if k in ffreq), realTotal=len(real),
                 realShare=round(sum(v for k, v in ffreq.items() if k in real) / sum(ffreq.values()), 3),
                 avgFac=round(sum(ffreq.values()), 1), topFreq=round(max(ffreq.values()), 3))

# ---------- write ----------
lfe = []
for i in range(N):
    gm = mapping(simp[i]); gm["coordinates"] = rnd(gm["coordinates"])
    lfe.append(dict(type="Feature", id=i, geometry=gm,
                    properties=dict(n=names[i], d=int(demand[i]), g=group[i], s=sector[i],
                                    st=int(nearest[i]))))
json.dump(dict(type="FeatureCollection", features=lfe), open(f"{OUT}/lsoa.json", "w"), separators=(",", ":"), ensure_ascii=False)
json.dump(dict(type="FeatureCollection", features=border_feats), open(f"{OUT}/borders.json", "w"), separators=(",", ":"))
ob = mapping(outline_b); ob["coordinates"] = rnd(ob["coordinates"])
json.dump(dict(type="Feature", geometry=ob, properties={}), open(f"{OUT}/outline.json", "w"), separators=(",", ":"))
bc = collections.defaultdict(list)
for i in range(N):
    bc[borough[i]].append(i)
bor = []
for b, ii in bc.items():
    u = shapely.union_all([simp[i] for i in ii])
    p = u.point_on_surface()
    bor.append([b, round(p.x, 4), round(p.y, 4)])
json.dump(dict(steps=chain_steps, pairs=[list(p) for p in border_pairs],
               cx=[round(v, 5) for v in cx], cy=[round(v, 5) for v in cy]),
          open(f"{OUT}/chain.json", "w"), separators=(",", ":"))
meta = dict(N=N, totalDemand=int(demand.sum()), las=las_stats, chainStats=stats, ens=ens_stats,
            stations=stations, hqs=hqs, eocs=eocs, boroughs=bor, facfreq=facfreq,
            energy=man["energy_series"], params=man["parameters"],
            realCandidates=int(sum(man["node_candidates"].values())),
            repairedCandidates=int(sum(man["node_candidates_repaired"].values())),
            bounds=[round(v, 4) for v in shapely.bounds(outline).tolist()])
json.dump(meta, open(f"{OUT}/meta.json", "w"), separators=(",", ":"), ensure_ascii=False)
print("lsoa", N, "borders", len(border_feats), "of pairs", len(pairs))
print("LAS", {k: v for k, v in las_stats.items() if k not in ("groups", "sectors")})
print("chain first/last", stats[0], stats[-1])
print("ens", {k: v for k, v in ens_stats.items() if k != "capacity"})
print("max colour index", max(max(r["co"].values()) for r in chain_steps if "co" in r))
