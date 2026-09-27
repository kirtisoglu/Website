/**
 * Interactive replay of a meeting-order search for EEMPR, the energy efficient
 * multi-place robot rendezvous problem.
 *
 * One module serves both the standalone page (animation/index.html, where
 * build_html.py inlines it) and the website (export_site.py copies it to
 * src/lib/rendezvous/viewer.js).  Every DOM lookup is scoped to ``root``.
 *
 *   const v = createViewer(rootElement);
 *   v.load(run);            // one run, as written by animation/record.py
 *   v.setFrame(k); v.setMode("schedule"); v.setTime(seconds);
 *   v.redraw();             // after a theme change
 *   v.destroy();
 */
export function createViewer(root) {
  const $ = (id) => root.querySelector("#" + id);
  const css = (n) => getComputedStyle(root).getPropertyValue(n).trim();
  const offs = [];                        // listeners to remove on destroy
  const on = (t, e, f, o) => { t.addEventListener(e, f, o); offs.push(() => t.removeEventListener(e, f, o)); };
  let destroyed = false;

  let R = null, fi = 0, mode = "search", tau = 0, playing = false, acc = 0, last = 0;
  let bounds = null, firstFeasible = -1, phase3x = null, schedCache = new Map();

  // ---------- formatting ----------
  const num = (v, d = 0) => v == null ? "—" : v.toLocaleString("en-US", {maximumFractionDigits: d, minimumFractionDigits: d});
  function big(v) {                       // energies and penalised objectives
    if (v == null) return "—";
    const a = Math.abs(v);
    if (a >= 1e9) return (v / 1e9).toFixed(2) + " G";
    if (a >= 1e6) return (v / 1e6).toFixed(3) + " M";
    return num(v);
  }
  function axisLabel(v) {                // axis labels: 100 G, 1.5 M, 20,000
    const a = Math.abs(v), trim = (x) => String(+x.toPrecision(3));
    if (a >= 1e9) return trim(v / 1e9) + " G";
    if (a >= 1e6) return trim(v / 1e6) + " M";
    return num(v);
  }
  function hms(s) {
    if (s == null) return "—";
    s = Math.max(0, Math.round(s));
    const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(x).padStart(2, "0")}`;
  }
  const objUnit = () => R.objective === "energy" ? "J" : "s";
  const objName = () => R.objective === "energy" ? "Energy objective" : "Campaign time objective";
  const fmtObj = (v) => big(v) + " " + objUnit();
  const repaired = (F) => (F.e || 0) > 1e-3 || (F.ec || 0) > 1e-3;
  const lerp = (a, b, u) => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
  const phaseName = (p) => p === "2opt" ? "2-opt" : p === "3opt" ? "3-opt" : "";
  function tourColour(F) {
    if (repaired(F)) return css("--repair");
    return F.ph === "3opt" ? css("--p3") : F.ph === "2opt" ? css("--p2") : css("--p0");
  }

  // ---------- canvas helpers ----------
  function fit(c) {
    const b = c.getBoundingClientRect(), d = window.devicePixelRatio || 1;
    const w = b.width || 640, h = b.height || 400;
    c.width = Math.max(1, w * d); c.height = Math.max(1, h * d);
    c.getContext("2d").setTransform(d, 0, 0, d, 0, 0);
    return {width: w, height: h};
  }
  function projector(r) {
    const [x0, y0, x1, y1] = bounds, pad = 30, padB = 58;   // bottom clear of the legend
    const w = r.width - 2 * pad, h = r.height - pad - padB;
    const s = Math.min(w / Math.max(1e-9, x1 - x0), h / Math.max(1e-9, y1 - y0));
    const ox = pad + (w - (x1 - x0) * s) / 2, oy = padB + (h - (y1 - y0) * s) / 2;
    const P = (p) => [ox + (p[0] - x0) * s, r.height - (oy + (p[1] - y0) * s)];
    P.scale = s;
    return P;
  }
  function polyline(ctx, pts) {
    ctx.beginPath();
    pts.forEach((q, k) => k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]));
  }

  // ---------- loading ----------
  function load(run) {
    R = run; fi = 0; tau = 0; schedCache = new Map(); stop();
    const pts = [R.tanker, ...R.workers, ...R.planted];
    for (const F of R.frames) {
      pts.push(...F.sol.x);
      for (const g of F.g || []) pts.push(...g.x);
    }
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    bounds = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
    firstFeasible = R.frames.findIndex((F) => !repaired(F));
    const f3 = R.frames.find((F) => F.ph === "3opt");
    phase3x = f3 ? f3.x - (f3.ne || 0) : null;

    $("title").textContent = `${R.name} · ${R.algorithm}`;
    $("subtitle").textContent = `${objName()}, ${R.start}, instance seed ${R.seed}`;
    const res = R.result, st = [
      ["workers", R.n], ["final objective", fmtObj(res.value)],
      ["SOCP solves", num(res.solves)], ["evaluations", num(res.evaluations)],
      ["run time", num(res.seconds, 1) + " s"],
    ];
    if (R.objective === "energy") st.push(["t_camp", hms(R.tcamp)]);
    $("stats").innerHTML = st.map(([k, v]) => `<div class="stat"><dt>${k}</dt><dd>${v}</dd></div>`).join("");
    legend();
    render();
  }

  function legend() {
    const k = (c, t, cls = "") => `<span class="key"><i class="${cls}" style="background:${c};color:${c}"></i>${t}</span>`;
    let h;
    if (mode === "search") {
      h = k(css("--p0"), "start") + k(css("--p2"), "2-opt") + k(css("--p3"), "3-opt")
        + k(css("--repair"), "needs repair (e > 0)") + k(css("--ghost"), "rejected candidate")
        + k(css("--muted"), "previous tour", "dash") + k(css("--worker"), "worker leg", "dash");
      if (R.speedup) h += k(css("--ball"), "fixed radius ball", "dash") + k(css("--asleep"), "don't-look bit on", "dot");
    } else {
      h = k(css("--ink"), "tanker") + k(css("--worker"), "worker travelling")
        + k(css("--charge"), "recharging");
      if (R.objective === "energy") h += k(css("--repair"), "t_camp", "dash");
    }
    $("legend").innerHTML = h;
  }

  // ---------- schedule of one frame's solution ----------
  function sched(F) {
    if (schedCache.has(F)) return schedCache.get(F);
    const S = F.sol, n = R.n;
    const W = F.o.map((rid, k) => {
      const s = S.s[k], t = S.t[k], c = S.c[k], te = S.te[k];
      return {rid, k, a: R.workers[rid], x: S.x[k], dep: s - t, arr: s, cend: s + c,
              back: s + c + te, E0: R.E0[rid], em: S.em[k], ex: S.ex[k], ef: S.ef[k],
              d: S.d[k], t, te, c, s};
    });
    const P = [R.tanker, ...S.x, R.tanker], legs = [];
    for (let i = 1; i <= n + 1; i++) {
      const tb = S.tb[i - 1];
      let dep, arr;
      if (i <= n) { arr = S.s[i - 1]; dep = arr - tb; }
      else { dep = S.s[n - 1] + S.c[n - 1]; arr = dep + tb; }
      legs.push({i, from: P[i - 1], to: P[i], dep, arr, T0: S.T[i - 1], T1: S.T[i], d: S.db[i - 1]});
    }
    const end = Math.max(F.S || 0, ...W.map((w) => w.back), legs[n].arr);
    const H = Math.max(end, R.objective === "energy" ? R.tcamp : 0) * 1.03;
    const out = {W, legs, end, H, Ttop: S.T[0]};
    schedCache.set(F, out);
    return out;
  }
  function workerAt(w, t) {
    if (t < w.dep) return {p: w.a, E: w.E0, st: "waiting at start"};
    if (t < w.arr) { const u = (t - w.dep) / Math.max(1e-9, w.arr - w.dep);
      return {p: lerp(w.a, w.x, u), E: w.E0 + (w.em - w.E0) * u, st: "to rendezvous"}; }
    if (t < w.cend) { const u = (t - w.arr) / Math.max(1e-9, w.cend - w.arr);
      return {p: w.x, E: w.em + (w.ex - w.em) * u, st: "recharging", on: true}; }
    if (t < w.back) { const u = (t - w.cend) / Math.max(1e-9, w.back - w.cend);
      return {p: lerp(w.x, w.a, u), E: w.ex + (w.ef - w.ex) * u, st: "returning"}; }
    return {p: w.a, E: w.ef, st: "done"};
  }
  function tankerAt(sc, t) {
    for (let j = 0; j < sc.legs.length; j++) {
      const g = sc.legs[j], pw = j > 0 ? sc.W[j - 1] : null;
      if (t < g.dep) {
        if (pw && t >= pw.arr && t < pw.cend) return {p: g.from, T: g.T0, st: `recharging r${pw.rid}`, busy: pw};
        return {p: g.from, T: g.T0, st: pw ? `waiting at r${pw.rid}'s place` : "waiting at base"};
      }
      if (t < g.arr) {
        const u = (t - g.dep) / Math.max(1e-9, g.arr - g.dep);
        return {p: lerp(g.from, g.to, u), T: g.T0 + (g.T1 - g.T0) * u,
                st: j < sc.W.length ? `to r${sc.W[j].rid}` : "returning to base"};
      }
    }
    return {p: R.tanker, T: sc.legs[sc.legs.length - 1].T1, st: "back at base"};
  }

  // ---------- map ----------
  function drawMap() {
    const c = $("map"), ctx = c.getContext("2d"), r = fit(c), P = projector(r), F = R.frames[fi];
    ctx.clearRect(0, 0, r.width, r.height);
    ctx.lineJoin = ctx.lineCap = "round";
    // planted rendezvous places from the generator, for orientation
    ctx.strokeStyle = css("--grid"); ctx.lineWidth = 1.2;
    for (const p of R.planted) { const q = P(p);
      ctx.beginPath(); ctx.moveTo(q[0] - 4, q[1]); ctx.lineTo(q[0] + 4, q[1]);
      ctx.moveTo(q[0], q[1] - 4); ctx.lineTo(q[0], q[1] + 4); ctx.stroke(); }
    if (mode === "search") drawSearch(ctx, r, P, F); else drawSchedule(ctx, r, P, F);
    // tanker base
    const b = P(R.tanker);
    ctx.fillStyle = css("--ink"); ctx.fillRect(b[0] - 5.5, b[1] - 5.5, 11, 11);
    $("hint").textContent = mode === "search" ? `frame ${fi + 1} / ${R.frames.length}` : `t = ${hms(tau)}`;
  }

  function labels(ctx, P, F) {
    const how = $("tLab").value;
    if (how === "off") return;
    ctx.font = `600 10.5px ${css("--mono")}`; ctx.fillStyle = css("--muted");
    ctx.textAlign = "left"; ctx.textBaseline = "middle";
    F.o.forEach((rid, k) => {
      if (how === "robot") { const q = P(R.workers[rid]); ctx.fillText(rid, q[0] + 6, q[1] - 7); }
      else { const q = P(F.sol.x[k]); ctx.fillText(k + 1, q[0] + 6, q[1] - 7); }
    });
  }

  function drawSearch(ctx, r, P, F) {
    const tour = (xs) => [R.tanker, ...xs, R.tanker].map(P);
    if ($("tGhost").checked && F.g) {
      ctx.strokeStyle = css("--ghost"); ctx.globalAlpha = .38; ctx.lineWidth = 1;
      for (const g of F.g) { polyline(ctx, tour(g.x)); ctx.stroke(); }
      ctx.globalAlpha = 1;
    }
    if ($("tPrev").checked && fi > 0 && F.k === "accept") {
      const Q = R.frames[fi - 1];
      ctx.setLineDash([5, 5]); ctx.strokeStyle = css("--muted"); ctx.globalAlpha = .55; ctx.lineWidth = 1.3;
      polyline(ctx, tour(Q.sol.x)); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    }
    // worker legs, start -> rendezvous (and back: final location = start)
    ctx.setLineDash([3, 4]); ctx.strokeStyle = css("--worker"); ctx.lineWidth = 1.1; ctx.globalAlpha = .75;
    F.o.forEach((rid, k) => { polyline(ctx, [P(R.workers[rid]), P(F.sol.x[k])]); ctx.stroke(); });
    ctx.setLineDash([]); ctx.globalAlpha = 1;
    // the fixed radius balls of the accepted speed-up move, on the incumbent's geometry
    if (F.ball) {
      ctx.strokeStyle = css("--ball"); ctx.setLineDash([6, 4]); ctx.lineWidth = 1.5;
      const a = P(F.ball.pa);
      ctx.beginPath(); ctx.arc(a[0], a[1], F.ball.r * P.scale, 0, 7); ctx.stroke();
      if (F.ball.pc && F.ball.r2 > 0) { const q = P(F.ball.pc);
        ctx.beginPath(); ctx.arc(q[0], q[1], F.ball.r2 * P.scale, 0, 7); ctx.stroke(); }
      ctx.setLineDash([]);
      ctx.font = `600 11px ${css("--mono")}`; ctx.fillStyle = css("--ball");
      ctx.textAlign = "right"; ctx.textBaseline = "middle";
      const mark = (q, t) => { ctx.beginPath(); ctx.arc(q[0], q[1], 8, 0, 7);
        ctx.lineWidth = 1.5; ctx.stroke(); ctx.fillText(t, q[0] - 11, q[1] + 9); };
      mark(a, "v_a");
      if (F.ball.pc && F.ball.r2 > 0) mark(P(F.ball.pc), "v_c");
    }
    // the tanker's tour through the rendezvous places
    const col = tourColour(F);
    ctx.strokeStyle = col; ctx.lineWidth = 2.3;
    polyline(ctx, tour(F.sol.x)); ctx.stroke();
    // worker starts
    const asleep = new Set(F.z || []);
    for (const rid of F.o) { const q = P(R.workers[rid]);
      ctx.beginPath(); ctx.arc(q[0], q[1], 4, 0, 7);
      ctx.fillStyle = css("--panel"); ctx.fill();
      ctx.strokeStyle = css("--worker"); ctx.lineWidth = 1.6; ctx.stroke(); }
    // rendezvous places; hollow grey where the don't-look bit is on
    F.o.forEach((rid, k) => { const q = P(F.sol.x[k]);
      ctx.beginPath(); ctx.arc(q[0], q[1], 4.3, 0, 7);
      if (asleep.has(rid)) { ctx.fillStyle = css("--panel"); ctx.fill();
        ctx.strokeStyle = css("--asleep"); ctx.lineWidth = 2; ctx.stroke(); }
      else { ctx.fillStyle = col; ctx.fill(); } });
    if (asleep.has(-1)) { const b = P(R.tanker);
      ctx.strokeStyle = css("--asleep"); ctx.lineWidth = 2; ctx.strokeRect(b[0] - 9, b[1] - 9, 18, 18); }
    labels(ctx, P, F);
  }

  function drawSchedule(ctx, r, P, F) {
    const sc = sched(F);
    // the plan, faint
    ctx.strokeStyle = css("--line"); ctx.lineWidth = 2;
    polyline(ctx, [R.tanker, ...F.sol.x, R.tanker].map(P)); ctx.stroke();
    ctx.setLineDash([3, 4]); ctx.strokeStyle = css("--line");
    for (const w of sc.W) { polyline(ctx, [P(w.a), P(w.x)]); ctx.stroke(); }
    ctx.setLineDash([]);
    for (const w of sc.W) { const q = P(w.x); ctx.beginPath(); ctx.arc(q[0], q[1], 3, 0, 7);
      ctx.fillStyle = css("--line"); ctx.fill(); }
    // the tanker now
    const T = tankerAt(sc, tau), tq = P(T.p);
    // workers now
    const D = R.D, th = R.theta;
    for (const w of sc.W) {
      const s = workerAt(w, tau), q = P(s.p);
      if (s.on) { ctx.strokeStyle = css("--charge"); ctx.lineWidth = 3; ctx.globalAlpha = .5;
        polyline(ctx, [q, tq]); ctx.stroke(); ctx.globalAlpha = 1; }
      ctx.beginPath(); ctx.arc(q[0], q[1], 5, 0, 7);
      ctx.fillStyle = s.st === "done" ? css("--panel") : s.on ? css("--charge") : css("--worker");
      ctx.fill(); ctx.strokeStyle = s.on ? css("--charge") : css("--worker"); ctx.lineWidth = 1.6; ctx.stroke();
      // battery
      const bw = 22, bx = q[0] - bw / 2, by = q[1] - 14;
      ctx.fillStyle = css("--line-soft"); ctx.fillRect(bx, by, bw, 4);
      ctx.fillStyle = s.on ? css("--charge") : css("--worker");
      ctx.fillRect(bx, by, bw * Math.max(0, Math.min(1, s.E / D)), 4);
      ctx.fillStyle = css("--ink"); ctx.fillRect(bx + bw * th, by - 1, 1, 6);
      const how = $("tLab").value;
      if (how !== "off") {
        ctx.font = `600 10.5px ${css("--mono")}`; ctx.fillStyle = css("--muted");
        ctx.textAlign = "left"; ctx.textBaseline = "middle";
        ctx.fillText(how === "robot" ? w.rid : w.k + 1, q[0] + 8, q[1] + 3);
      }
    }
    ctx.fillStyle = css("--ink"); ctx.fillRect(tq[0] - 6, tq[1] - 6, 12, 12);
    ctx.strokeStyle = css("--panel"); ctx.lineWidth = 1.5; ctx.strokeRect(tq[0] - 6, tq[1] - 6, 12, 12);
  }

  // ---------- timeline ----------
  function niceTicks(lo, hi, k = 4) {
    const span = hi - lo, raw = span / k, mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => span / s <= k) || raw;
    const out = [];
    for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(v);
    return out;
  }

  function drawSearchTL() {
    const c = $("tl"); c.style.height = "150px";
    const ctx = c.getContext("2d"), r = fit(c);
    ctx.clearRect(0, 0, r.width, r.height);
    const L = 62, Rr = 12, T = 12, B = 22, w = r.width - L - Rr, h = r.height - T - B;
    const X1 = Math.max(1, R.frames[R.frames.length - 1].x, ...(R.cloud.length ? [R.cloud[R.cloud.length - 1][0]] : []));
    const feas = $("tRange").value === "feasible" && firstFeasible >= 0;
    const vals = (feas ? R.cloud.filter((p) => !p[2]).map((p) => p[1])
                       .concat(R.frames.filter((F) => !repaired(F)).map((F) => F.f))
                       : R.cloud.map((p) => p[1]).concat(R.frames.map((F) => F.f))).filter((v) => v > 0);
    const lo = Math.min(...vals), hi = Math.max(...vals), log = hi / lo > 20;
    const tr = (v) => log ? Math.log10(v) : v;
    const span = tr(hi) - tr(lo) || Math.abs(tr(hi)) * .01 || 1;
    const y0 = tr(lo) - (hi === lo ? span / 2 : 0), y1 = tr(hi) + span * .04;
    const X = (x) => L + w * x / X1;
    // values above the range (repaired candidates, in the feasible view) sit on the top edge
    const Y = (v) => Math.max(T, T + h * (1 - (tr(v) - y0) / Math.max(1e-12, y1 - y0)));
    c._x = (px) => (px - L) / w * X1;

    ctx.font = `10.5px ${css("--mono")}`; ctx.fillStyle = css("--muted");
    ctx.strokeStyle = css("--line-soft"); ctx.lineWidth = 1;
    const ys = log ? (() => { const out = []; for (let e = Math.ceil(y0); e <= y1; e++) out.push(Math.pow(10, e)); return out; })()
                   : niceTicks(lo, hi);
    ctx.textAlign = "right"; ctx.textBaseline = "middle";
    for (const v of ys) { const y = Y(v); ctx.beginPath(); ctx.moveTo(L, y); ctx.lineTo(L + w, y); ctx.stroke();
      ctx.fillText(axisLabel(v), L - 6, y); }
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    for (const x of niceTicks(0, X1, 6)) ctx.fillText(num(x), X(x), T + h + 5);
    ctx.textAlign = "right"; ctx.fillText("evaluated", L - 6, T + h + 5);

    // phase boundary and first feasible order
    const vline = (x, colour, text, dash) => {
      ctx.strokeStyle = colour; ctx.setLineDash(dash ? [4, 4] : []); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(X(x), T); ctx.lineTo(X(x), T + h); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = colour; ctx.textAlign = "left"; ctx.textBaseline = "top";
      ctx.fillText(text, X(x) + 4, T + 1);
    };
    if (phase3x != null) vline(phase3x, css("--p3"), "3-opt phase", true);
    if (firstFeasible > 0) vline(R.frames[firstFeasible].x, css("--ok"), "first feasible", true);

    // every candidate evaluated
    ctx.fillStyle = css("--ghost"); ctx.globalAlpha = .45;
    for (const [x, v, rep] of R.cloud) if (v > 0 && !(feas && rep)) ctx.fillRect(X(x) - 1, Y(v) - 1, 2, 2);
    ctx.globalAlpha = 1;
    // the incumbent
    ctx.strokeStyle = css("--ink"); ctx.lineWidth = 1.8; ctx.beginPath();
    R.frames.forEach((F, k) => { const x = X(F.x), y = Y(F.f);
      if (!k) ctx.moveTo(x, y); else { ctx.lineTo(x, Y(R.frames[k - 1].f)); ctx.lineTo(x, y); } });
    ctx.stroke();
    // restart steps of Modifications 2 and 3
    ctx.fillStyle = css("--ball");
    R.frames.forEach((F) => { if (F.rs) { ctx.beginPath(); const x = X(F.x);
      ctx.moveTo(x, T + h); ctx.lineTo(x - 4, T + h + 6); ctx.lineTo(x + 4, T + h + 6); ctx.fill(); } });
    // cursor
    const F = R.frames[fi], cx = X(F.x), cy = Y(F.f);
    ctx.strokeStyle = css("--p2"); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx, T); ctx.lineTo(cx, T + h); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, 4.5, 0, 7); ctx.fillStyle = tourColour(F); ctx.fill();
    ctx.strokeStyle = css("--panel"); ctx.lineWidth = 1.5; ctx.stroke();
  }

  function drawGantt() {
    const F = R.frames[fi], sc = sched(F), rows = R.n + 1;
    const rowH = Math.max(9, Math.min(16, 360 / rows)), c = $("tl");
    c.style.height = Math.round(rows * rowH + 48) + "px";
    const ctx = c.getContext("2d"), r = fit(c);
    ctx.clearRect(0, 0, r.width, r.height);
    const L = 62, Rr = 12, T = 18, B = 24, w = r.width - L - Rr;
    const X = (t) => L + w * t / sc.H;
    c._x = (px) => (px - L) / w * sc.H;
    // hour grid
    ctx.font = `10.5px ${css("--mono")}`; ctx.fillStyle = css("--muted"); ctx.strokeStyle = css("--line-soft");
    const steps = [300, 600, 900, 1800, 3600, 7200, 10800, 21600];
    const step = steps.find((s) => sc.H / s <= 8) || 43200;
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    for (let t = 0; t <= sc.H; t += step) { const x = X(t);
      ctx.beginPath(); ctx.moveTo(x, T); ctx.lineTo(x, T + rows * rowH); ctx.stroke();
      ctx.fillText(hms(t).replace(/:00$/, ""), x, T + rows * rowH + 6); }
    const bar = (row, t0, t1, colour, frac, alpha = 1) => {
      if (t1 <= t0) return;
      const y = T + row * rowH + rowH * (1 - frac) / 2;
      ctx.globalAlpha = alpha; ctx.fillStyle = colour;
      ctx.fillRect(X(t0), y, Math.max(1, X(t1) - X(t0)), rowH * frac); ctx.globalAlpha = 1;
    };
    // row labels
    ctx.textAlign = "right"; ctx.textBaseline = "middle"; ctx.fillStyle = css("--muted");
    ctx.fillText("tanker", L - 8, T + rowH / 2);
    sc.W.forEach((wk, k) => ctx.fillText(`${k + 1} · r${wk.rid}`, L - 8, T + (k + 1.5) * rowH));
    // tanker
    ctx.strokeStyle = css("--line"); ctx.beginPath(); ctx.moveTo(X(0), T + rowH / 2); ctx.lineTo(X(sc.end), T + rowH / 2); ctx.stroke();
    for (const g of sc.legs) bar(0, g.dep, g.arr, css("--ink"), .38, .55);
    for (const wk of sc.W) bar(0, wk.arr, wk.cend, css("--charge"), .66);
    // workers
    sc.W.forEach((wk, k) => {
      bar(k + 1, wk.dep, wk.arr, css("--worker"), .38, .8);
      bar(k + 1, wk.arr, wk.cend, css("--charge"), .66);
      bar(k + 1, wk.cend, wk.back, css("--worker"), .38, .8);
    });
    // t_camp, s_end, cursor
    const vline = (t, colour, text, dash) => { const x = X(t);
      ctx.strokeStyle = colour; ctx.setLineDash(dash ? [4, 4] : []); ctx.lineWidth = 1.3;
      ctx.beginPath(); ctx.moveTo(x, T); ctx.lineTo(x, T + rows * rowH); ctx.stroke(); ctx.setLineDash([]);
      if (text) { ctx.fillStyle = colour; ctx.textAlign = "right"; ctx.textBaseline = "bottom"; ctx.fillText(text, x - 4, T - 3); } };
    const same = R.objective === "energy" && Math.abs(sc.end - R.tcamp) < sc.H * .01;
    vline(sc.end, css("--muted"), same ? "" : "s_end", false);
    if (R.objective === "energy") vline(R.tcamp, css("--repair"), same ? "s_end = t_camp" : "t_camp", true);
    vline(tau, css("--p2"), "", false);
  }

  // ---------- rail ----------
  function renderRail() {
    const F = R.frames[fi], prev = fi > 0 ? R.frames[fi - 1] : null;
    if (mode === "search") {
      const ph = phaseName(F.ph);
      let text = F.k === "start" ? "Starting order"
        : F.k === "accept" ? `Accepted ${ph} move` : `No improving ${ph} move`;
      if (F.rs) text += " (restart step)";
      if (F.end) text += " · search ends";
      $("vtext").textContent = text;
      $("vdot").style.background = tourColour(F);
      const rows = [["objective", fmtObj(F.f)]];
      if (prev) { const d = (F.f - prev.f) / Math.abs(prev.f) * 100;
        rows.push(["change", d ? `<span class="${d < 0 ? "good" : "bad"}">${d.toFixed(d > -0.01 ? 4 : 2)} %</span>` : "0"]); }
      rows.push(["repair e", F.e > 1e-3 ? `<span class="bad">${big(F.e)} J</span>` : `<span class="good">none</span>`]);
      if (R.objective === "energy")
        rows.push(["repair e_camp", F.ec > 1e-3 ? `<span class="bad">${num(F.ec)} s</span>` : `<span class="good">none</span>`]);
      rows.push(["energy used", big(F.E) + " J"], ["campaign time", hms(F.S)]);
      if (R.objective === "energy") rows.push(["t_camp", hms(R.tcamp)]);
      if (F.ne != null) rows.push(["evaluated this pass", num(F.ne)]);
      rows.push(["SOCP solves so far", num(F.sv)], ["elapsed", num(F.t, 1) + " s"]);
      if (F.ncl != null) rows.push(["candidate list n_cl", F.ncl],
        ["don't-look bits on", `${(F.z || []).length} of ${R.n + 1}`]);
      $("ev").innerHTML = rows.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join("");

      const before = prev && F.k === "accept" ? prev.o : F.o;
      $("seq").innerHTML = "T → " + F.o.map((rid, k) => rid !== before[k] ? `<b>r${rid}</b>` : `r${rid}`).join(" → ") + " → T";
      $("seqNote").textContent = F.k === "accept" ? "changed in bold" : "";

      const C = F.c || [];
      $("candNote").textContent = F.ne ? `${C.length} of ${num(F.ne)}` : "";
      if (!C.length) { $("cands").innerHTML = `<div class="empty">The starting order; no pass yet.</div>`; }
      else {
        const vs = C.map((x) => x[1]).filter((v) => v > 0), lo = Math.log(Math.min(...vs)), hi = Math.log(Math.max(...vs));
        $("cands").innerHTML = C.map(([lab, v, ch, rep]) => {
          const u = hi > lo ? 1 - (Math.log(v) - lo) / (hi - lo) : 1;
          const col = ch ? tourColour(F) : rep ? css("--repair") : css("--ghost");
          return `<div class="cand ${ch ? "chosen" : ""} ${rep ? "rep" : ""}" title="${ch ? "accepted" : rep ? "needs repair" : "rejected"}">
            <span class="id">${ch ? "▸ " : ""}pos ${lab}</span><span class="bar"><i style="width:${(8 + 92 * u).toFixed(1)}%;background:${col}"></i></span>
            <span class="w">${big(v)}</span></div>`; }).join("");
      }
    } else {
      const sc = sched(F), T = tankerAt(sc, tau);
      $("clock").textContent = `t = ${hms(tau)}`;
      const trows = [["doing", T.st], ["energy left", `${big(T.T)} J`],
        ["of T₀ (with repair)", `${(100 * T.T / sc.Ttop).toFixed(1)} %`],
        ["campaign ends", hms(sc.end)]];
      if (R.objective === "energy") trows.push(["t_camp", hms(R.tcamp)]);
      $("tank").innerHTML = trows.map(([k, v]) => `<span>${k}</span><span>${v}</span>`).join("");
      $("robots").innerHTML = sc.W.map((w) => {
        const s = workerAt(w, tau), fr = Math.max(0, Math.min(1, s.E / R.D));
        const col = s.on ? css("--charge") : css("--worker");
        return `<div class="rob ${s.on ? "on" : ""}"><span>${w.k + 1} · r${w.rid}</span>
          <span class="batt" title="${s.st}"><i style="width:${(100 * fr).toFixed(1)}%;background:${col}"></i><b style="left:${100 * R.theta}%"></b></span>
          <span class="val">${(100 * fr).toFixed(0)}% <span class="st">${s.st === "recharging" ? "⚡" : ""}</span></span></div>`;
      }).join("");
    }
  }

  function render() {
    if (!R) return;
    const F = R.frames[fi];
    drawMap();
    if (mode === "search") drawSearchTL(); else drawGantt();
    renderRail();
    $("pos").textContent = mode === "search"
      ? `frame ${fi + 1}/${R.frames.length} · ${num(F.x)} evaluated`
      : `t = ${hms(tau)} of ${hms(sched(F).end)} · frame ${fi + 1}`;
  }

  // ---------- interaction ----------
  function setFrame(k) { fi = Math.max(0, Math.min(R.frames.length - 1, k)); render(); }
  function setMode(m) {
    mode = m; root.dataset.mode = m; stop();
    $("mSearch").classList.toggle("on", m === "search"); $("mSched").classList.toggle("on", m === "schedule");
    if (m === "schedule") tau = Math.min(tau, sched(R.frames[fi]).end);
    legend(); render();
  }
  function stop() { playing = false; $("play").textContent = "Play"; }
  function tick(now) {
    if (!playing || destroyed) return;
    const dt = Math.min(100, now - last); last = now;
    const sp = +$("speed").value;
    if (mode === "search") {
      acc += dt * sp;
      if (acc > 750) { acc = 0;
        if (fi >= R.frames.length - 1) { stop(); render(); return; }
        setFrame(fi + 1); }
    } else {
      const sc = sched(R.frames[fi]);
      tau += dt / 1000 * sc.end / 20 * sp;
      if (tau >= sc.end) { tau = sc.end; stop(); }
      render();
    }
    requestAnimationFrame(tick);
  }
  $("play").onclick = () => {
    if (playing) { stop(); return; }
    if (mode === "search" && fi >= R.frames.length - 1) fi = 0;
    if (mode === "schedule" && tau >= sched(R.frames[fi]).end - 1e-6) tau = 0;
    playing = true; $("play").textContent = "Pause"; last = performance.now(); acc = 0;
    requestAnimationFrame(tick);
  };
  $("prev").onclick = () => { stop(); setFrame(fi - 1); };
  $("next").onclick = () => { stop(); setFrame(fi + 1); };
  $("toend").onclick = () => { stop(); setFrame(R.frames.length - 1); };
  $("mSearch").onclick = () => setMode("search");
  $("mSched").onclick = () => setMode("schedule");
  for (const id of ["tGhost", "tPrev", "tLab", "tRange"]) $(id).onchange = render;

  const tl = $("tl");
  function scrub(ev) {
    const b = tl.getBoundingClientRect(), x = tl._x ? tl._x(ev.clientX - b.left) : 0;
    if (mode === "search") {
      let best = 0, bd = Infinity;
      R.frames.forEach((F, k) => { const d = Math.abs(F.x - x); if (d < bd) { bd = d; best = k; } });
      setFrame(best);
    } else { tau = Math.max(0, Math.min(sched(R.frames[fi]).end, x)); render(); }
  }
  let dragging = false;
  tl.addEventListener("pointerdown", (e) => { dragging = true; stop(); tl.setPointerCapture(e.pointerId); scrub(e); });
  tl.addEventListener("pointermove", (e) => { if (dragging) scrub(e); });
  tl.addEventListener("pointerup", () => { dragging = false; });

  on(document, "keydown", (e) => {
    if (!R || !root.isConnected) return;
    if (e.target.tagName === "SELECT" || e.target.tagName === "INPUT") return;
    if (e.key === " ") { e.preventDefault(); $("play").click(); }
    else if (e.key === "ArrowRight") { stop(); setFrame(fi + 1); }
    else if (e.key === "ArrowLeft") { stop(); setFrame(fi - 1); }
    else if (e.key === "v") setMode(mode === "search" ? "schedule" : "search");
  });

  // hover a robot: its leg of the current solution
  const map = $("map"), tip = $("tip");
  map.addEventListener("mousemove", (e) => {
    if (!R) return;
    const b = map.getBoundingClientRect(), mx = e.clientX - b.left, my = e.clientY - b.top;
    const P = projector({width: b.width, height: b.height}), F = R.frames[fi];
    let hit = -1, bd = 10;
    F.o.forEach((rid, k) => { for (const p of [R.workers[rid], F.sol.x[k]]) {
      const q = P(p), d = Math.hypot(q[0] - mx, q[1] - my); if (d < bd) { bd = d; hit = k; } } });
    if (hit < 0) { tip.hidden = true; return; }
    const S = F.sol, rid = F.o[hit], v = S.t[hit] > 1e-6 ? S.d[hit] / S.t[hit] : null;
    const ve = S.te[hit] > 1e-6 ? S.d[hit] / S.te[hit] : null;
    const rows = [["initial energy", big(R.E0[rid]) + " J"], ["on arrival", big(S.em[hit]) + " J"],
      ["after recharge", big(S.ex[hit]) + " J"], ["at the end", big(S.ef[hit]) + " J"],
      ["must keep θD", big(R.theta * R.D) + " J"], ["leg length", num(S.d[hit]) + " m"],
      ["speed out / back", `${v == null ? "—" : v.toFixed(2)} / ${ve == null ? "—" : ve.toFixed(2)} m/s`],
      ["v_opt", R.vopt.toFixed(3) + " m/s"], ["recharge", `${hms(S.s[hit])} + ${num(S.c[hit])} s`]];
    tip.innerHTML = `<h3>Robot ${rid} · meets the tanker ${hit + 1}${["st","nd","rd"][hit] || "th"}</h3><dl>`
      + rows.map(([k, x]) => `<dt>${k}</dt><dd>${x}</dd>`).join("") + "</dl>";
    tip.hidden = false;
    const tx = Math.min(mx + 14, b.width - tip.offsetWidth - 8), ty = Math.min(my + 12, b.height - tip.offsetHeight - 8);
    tip.style.left = tx + "px"; tip.style.top = ty + "px";
  });
  map.addEventListener("mouseleave", () => { tip.hidden = true; });

  const ro = new ResizeObserver(() => render());
  ro.observe(root.querySelector("main"));
  on(matchMedia("(prefers-color-scheme: dark)"), "change", () => { if (R) { legend(); render(); } });

  root.dataset.mode = "search";
  return {
    load,
    setFrame: (k) => { if (R) setFrame(k); },
    setMode: (m) => { if (R) setMode(m); },
    setTime: (t) => { tau = Math.max(0, +t || 0); if (R) render(); },
    redraw: () => { if (R) { legend(); render(); } },
    destroy: () => { destroyed = true; playing = false; ro.disconnect(); offs.forEach((f) => f()); },
  };
}
