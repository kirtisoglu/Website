/**
 * FalCom explorer for the London Ambulance Service case study.
 *
 * Two views over the same 4,994 LSOAs:
 *   - Chain animation: replays one FalcomChain run (deltas in chain.json),
 *     with checkpoints every 25 steps so seeking is instant.
 *   - Ensemble analysis: border keep-rates and facility-site frequencies
 *     pooled from many chains (meta.json, borders.json), compared with the
 *     current LAS structure.
 *
 * Data lives in /static/falcomplot/las/explorer/ and is rebuilt by
 * scripts/falcom-explorer/build_data.py.
 *
 *   const ex = createExplorer(rootEl, { base, maplibregl, initialTab, onTab });
 *   ex.destroy();
 */
export function createExplorer(root, opts) {
  opts = opts || {};
  var base = opts.base || '/falcomplot/las/explorer';
  var maplibregl = opts.maplibregl;

  var NF = new Intl.NumberFormat('en-GB');
  var css = function (v) { return getComputedStyle(root).getPropertyValue(v).trim(); };
  var f1 = function (x, d) { return Number(x).toLocaleString('en-GB', { minimumFractionDigits: d, maximumFractionDigits: d }); };
  var pct = function (x, d) { return f1(x * 100, d || 0) + '%'; };
  var $ = function (id) { return root.querySelector('#' + id); };
  var PAL = function () { var a = []; for (var i = 0; i < 6; i++) a.push(css('--c' + i)); return a; };

  var tab = 'chain', ensView = 'rob', map = null, LSOA, BORD, CH, META, OUTL;
  var N, demand, lasGroupColor, cx, cy, pairs, minutes;
  var distOf, supOfD = {}, cenOfD = {}, teamsOfD = {}, coOfS = {}, cur = 1, painted = null, paintedLv = null;
  var checkpoints = {}, playing = false, lastT = 0, acc = 0, chgOn = [], lastMove = null, axisMax = { sup: 80000, team: 20000 };

  // ---------- tabs ----------
  function setTab(t) {
    tab = t;
    $('t-chain').setAttribute('aria-selected', String(t === 'chain'));
    $('t-ens').setAttribute('aria-selected', String(t === 'ens'));
    $('side-chain').hidden = t !== 'chain'; $('side-ens').hidden = t !== 'ens';
    $('below-chain').hidden = t !== 'chain'; $('below-ens').hidden = t !== 'ens';
    $('transport').hidden = t !== 'chain'; $('ensctl').hidden = t !== 'ens';
    $('lasov').checked = t === 'ens';
    $('scope').innerHTML = t === 'chain'
      ? '<strong>One chain, step by step.</strong> Each step proposes merging two neighbouring districts and re-splitting them along a random spanning tree. Accepted steps change the plan; LSOAs that moved are outlined. Nothing here is averaged over runs.'
      : '<strong>An ensemble of 450 plans pooled from many chains.</strong> These statistics describe FalCom plans in general, not any single run, so this is where the comparison with today\'s LAS structure belongs.';
    if (t !== 'chain' && playing) togglePlay();
    if (opts.onTab) opts.onTab(t === 'chain' ? 'chain' : 'ensemble');
    applyView(); renderLegend();
    if (t === 'ens') { renderEnsTable(); renderRobHist(); renderFacRank(); }
    else if (CH) { renderTrace(); renderSeries(); renderStrip(); }
  }
  function setEnsView(v) {
    ensView = v;
    $('v-rob').setAttribute('aria-pressed', String(v === 'rob')); $('v-las').setAttribute('aria-pressed', String(v === 'las'));
    $('thresh').hidden = v !== 'rob'; $('lasov-wrap').hidden = v === 'las';
    applyView(); renderLegend();
  }

  // ---------- chain replay ----------
  function snapshot() { return { d: distOf.slice(), s: Object.assign({}, supOfD), c: Object.assign({}, cenOfD), t: Object.assign({}, teamsOfD), co: Object.assign({}, coOfS) }; }
  function restore(cp) { distOf = cp.d.slice(); supOfD = Object.assign({}, cp.s); cenOfD = Object.assign({}, cp.c); teamsOfD = Object.assign({}, cp.t); coOfS = Object.assign({}, cp.co); }
  function applyStep(k, record) {
    var s = CH.steps[k - 1], from = {};
    if (s.cn) for (var i = 0; i < s.cn.length; i++) { if (record) from[distOf[s.cn[i]]] = 1; distOf[s.cn[i]] = s.cd[i]; }
    if (s.dd) { supOfD = {}; cenOfD = {}; teamsOfD = {}; for (var j = 0; j < s.dd.length; j++) { supOfD[s.dd[j]] = s.sp[j]; cenOfD[s.dd[j]] = s.ce[j]; teamsOfD[s.dd[j]] = s.tm[j]; } }
    if (s.co) coOfS = s.co;
    if (record) {
      var to = {}; if (s.cn) s.cd.forEach(function (d) { to[d] = 1; });
      lastMove = { k: k, n: s.cn ? s.cn.length : 0, from: Object.keys(from).map(Number), to: Object.keys(to).map(Number), hier: !!s.dd };
    }
  }
  function buildCheckpoints() {
    distOf = new Int32Array(N);
    for (var k = 1; k <= CH.steps.length; k++) { applyStep(k, false); if (k % 25 === 1) checkpoints[k] = snapshot(); }
    restore(checkpoints[1]); cur = 1; applyStepRecordOnly(1);
  }
  function applyStepRecordOnly(k) { var s = CH.steps[k - 1]; lastMove = { k: k, n: s.cn ? s.cn.length : 0, from: [], to: [], hier: !!s.dd }; }
  function seek(k) {
    k = Math.max(1, Math.min(CH.steps.length, k | 0));
    if (k === cur) return;
    if (k > cur && k - cur <= 25) { for (var i = cur + 1; i <= k; i++) applyStep(i, i === k); }
    else { var base = Math.floor((k - 1) / 25) * 25 + 1; restore(checkpoints[base]); if (base === k) applyStepRecordOnly(k); for (var j = base + 1; j <= k; j++) applyStep(j, j === k); }
    cur = k;
    if (tab === 'chain') paintChain();
    updateStepUI();
  }

  // ---------- painting ----------
  function paintFills(col) {
    if (!painted) painted = new Int16Array(N).fill(-1);
    for (var n = 0; n < N; n++) if (painted[n] !== col[n]) { map.setFeatureState({ source: 'lsoa', id: n }, { c: col[n] }); painted[n] = col[n]; }
  }
  function paintChanged() {
    chgOn.forEach(function (n) { map.setFeatureState({ source: 'lsoa', id: n }, { chg: false }); });
    chgOn = [];
    var s = CH.steps[cur - 1];
    if (tab === 'chain' && s.cn && s.cn.length < N && lastMove && lastMove.k === cur) { chgOn = s.cn.slice(); chgOn.forEach(function (n) { map.setFeatureState({ source: 'lsoa', id: n }, { chg: true }); }); }
  }
  function paintChain() {
    if (!map || !map.getLayer('fill')) return;
    var col = new Int16Array(N);
    for (var n = 0; n < N; n++) { var c = coOfS[supOfD[distOf[n]]]; col[n] = c == null ? 6 : c; }
    paintFills(col);
    if (!paintedLv) paintedLv = new Int8Array(pairs.length).fill(-1);
    for (var e = 0; e < pairs.length; e++) {
      var da = distOf[pairs[e][0]], db = distOf[pairs[e][1]];
      var lv = supOfD[da] !== supOfD[db] ? 2 : (da !== db ? 1 : 0);
      if (paintedLv[e] !== lv) { map.setFeatureState({ source: 'bord', id: e }, { lv: lv }); paintedLv[e] = lv; }
    }
    var pts = [];
    for (var d in cenOfD) { var i = cenOfD[d]; pts.push({ type: 'Feature', geometry: { type: 'Point', coordinates: [cx[i], cy[i]] }, properties: { t: teamsOfD[d] } }); }
    map.getSource('fcfac').setData({ type: 'FeatureCollection', features: pts });
    paintChanged();
  }

  function applyView() {
    if (!map || !map.getLayer('fill')) return;
    var vis = function (id, on) { map.setLayoutProperty(id, 'visibility', on ? 'visible' : 'none'); };
    var fac = $('facs').checked, chain = tab === 'chain', rob = tab === 'ens' && ensView === 'rob', las = tab === 'ens' && ensView === 'las';
    vis('las-b', las); vis('fc-b', chain); vis('chg', chain); vis('rob-b', rob);
    vis('lasov', $('lasov').checked && !las);
    vis('las-st', fac && (las || rob)); vis('las-hq', fac && las); vis('las-eoc', fac && las);
    vis('fc-fac', fac && chain); vis('rob-fac', fac && rob);
    map.setPaintProperty('fill', 'fill-opacity', rob ? 1 : 0.8);
    if (chain) paintChain();
    else if (las) paintFills(lasGroupColor);
    else { var g = new Int16Array(N).fill(7); paintFills(g); paintChanged(); }
    updateRobust();
  }

  function recolor() {
    if (!map || !map.getLayer('fill')) return;
    var P = PAL(), expr = ['match', ['feature-state', 'c']];
    for (var i = 0; i < 6; i++) expr.push(i, P[i]);
    expr.push(7, css('--land'), css('--faint'));
    map.setPaintProperty('fill', 'fill-color', expr);
    map.setPaintProperty('bg', 'background-color', css('--map-bg'));
    var ink = css('--ink'), edge = css('--edge'), acc = css('--accent');
    map.setPaintProperty('las-b', 'line-color', ['match', ['get', 'l'], 1, edge, ink]);
    map.setPaintProperty('fc-b', 'line-color', ['match', ['feature-state', 'lv'], 1, edge, ink]);
    map.setPaintProperty('chg', 'line-color', acc);
    map.setPaintProperty('outline', 'line-color', ink);
    map.setPaintProperty('hover', 'line-color', ink);
    map.setPaintProperty('lasov', 'line-color', ink);
    map.setPaintProperty('rob-b', 'line-color', ['interpolate', ['linear'], ['get', 'f'], 0, css('--r1'), 0.25, css('--r2'), 0.5, css('--r3'), 0.75, css('--r4'), 1, css('--r5')]);
    ['las-st', 'fc-fac'].forEach(function (id) { map.setPaintProperty(id, 'circle-color', ink); map.setPaintProperty(id, 'circle-stroke-color', edge); });
    map.setPaintProperty('las-hq', 'circle-color', edge); map.setPaintProperty('las-hq', 'circle-stroke-color', ink);
    map.setPaintProperty('las-eoc', 'circle-color', acc); map.setPaintProperty('las-eoc', 'circle-stroke-color', edge);
    map.setPaintProperty('rob-fac', 'circle-color', acc); map.setPaintProperty('rob-fac', 'circle-stroke-color', edge);
    renderLegend(); renderTrace(); renderStrip(); renderSeries(); renderRobHist(); renderFacRank();
  }

  function updateRobust() {
    var t = +$('th').value / 100;
    $('th-v').textContent = Math.round(t * 100) + '%';
    if (!BORD) return;
    var n = 0; BORD.features.forEach(function (f) { if (f.properties.f >= t) n++; });
    $('th-n').textContent = NF.format(n) + ' of ' + NF.format(BORD.features.length) + ' LSOA borders. A border counts when it separates two districts in a plan.';
    if (map && map.getLayer('rob-b')) map.setFilter('rob-b', ['>=', ['get', 'f'], t]);
  }

  // ---------- chain panel ----------
  function chainLoads() {
    var dd = {}, sd = {};
    for (var n = 0; n < N; n++) { var d = distOf[n]; dd[d] = (dd[d] || 0) + demand[n]; var s = supOfD[d]; sd[s] = (sd[s] || 0) + demand[n]; }
    var perTeam = []; for (var k in dd) perTeam.push(dd[k] / teamsOfD[k]);
    return { sup: Object.keys(sd).map(function (k) { return sd[k]; }), perTeam: perTeam };
  }
  function cv(a) { var m = a.reduce(function (s, x) { return s + x; }, 0) / a.length; var v = a.reduce(function (s, x) { return s + (x - m) * (x - m); }, 0) / a.length; return Math.sqrt(v) / m; }

  function updateStepUI() {
    var s = CH.steps[cur - 1], C = META.chainStats[cur - 1];
    $('stepinfo').innerHTML = 'Step ' + NF.format(cur) + ' of ' + NF.format(CH.steps.length) + '<span class="badge' + (s.a ? ' ok' : '') + '">' + (s.a ? 'accepted' : 'rejected') + '</span>';
    $('scrub').value = cur;
    var cursor = $('cursor'); if (cursor) { var x = traceX(cur); cursor.setAttribute('x1', x); cursor.setAttribute('x2', x); }
    $('cur-h').textContent = 'This plan, step ' + NF.format(cur);
    var txt;
    if (cur === 1) txt = 'The starting plan: 54 districts, each its own super-district. The chain forms super-districts from step 2.';
    else if (!s.a) txt = 'Proposal rejected. The plan is unchanged from step ' + NF.format(cur - 1) + '.';
    else if (lastMove && lastMove.k === cur && lastMove.n) {
      var ds = lastMove.from.concat(lastMove.to.filter(function (d) { return lastMove.from.indexOf(d) < 0; }));
      txt = 'Accepted. ' + NF.format(lastMove.n) + ' LSOAs changed district' + (ds.length ? ' among districts ' + ds.sort(function (a, b) { return a - b; }).join(', ') : '') + '. They are outlined on the map.';
    } else if (s.cn && s.cn.length) txt = 'Accepted. ' + NF.format(s.cn.length) + ' LSOAs changed district.';
    else txt = 'Accepted. The super-district grouping changed; no LSOA moved.';
    $('steptext').textContent = txt;
    var rows = [
      ['Mean travel time', f1(minutes[cur - 1], 2) + ' min<span class="sub">per incident, demand-weighted</span>'],
      ['Super-districts', C.nS],
      ['Districts', C.nD + '<span class="sub">' + C.nT + ' teams</span>'],
      ['Load per team, spread', pct(C.cvT, 1) + '<span class="sub">coefficient of variation</span>'],
      ['Super-district demand, spread', pct(C.cvS) + '<span class="sub">CV · max/min ' + f1(C.rS, 1) + '×</span>'],
      ['Distance to facility', f1(C.dist, 2) + ' km<span class="sub">straight line, demand-weighted</span>']
    ];
    $('cur-b').innerHTML = rows.map(function (r) { return '<tr><th scope="row">' + r[0] + '</th><td>' + r[1] + '</td></tr>'; }).join('');
    var sc = $('scursor'); if (sc) { var x2 = seriesX(cur); sc.setAttribute('x1', x2); sc.setAttribute('x2', x2); }
    renderStrip();
  }

  function renderLegend() {
    var h = '', fac = $('facs').checked, ov = $('lasov').checked;
    var ovl = '<span><span class="dash"></span>LAS group border</span>';
    if (tab === 'chain') {
      h = '<span>Colour: super-district</span><span><span class="ln" style="height:1.8px"></span>Super-district border</span><span><span class="ln" style="height:1px;background:var(--faint)"></span>District border</span><span><span class="ln" style="height:2px;background:var(--accent)"></span>Moved this step</span>' +
        (fac ? '<span><span class="dot" style="width:5px;height:5px;background:var(--ink)"></span><span class="dot" style="width:7px;height:7px;background:var(--ink)"></span><span class="dot" style="width:9px;height:9px;background:var(--ink)"></span>Facility, 1–3 teams</span>' : '') + (ov ? ovl : '');
    } else if (ensView === 'rob') {
      h = '<span>Share of plans in which the border separates two districts</span><span>0%<span class="ramp" aria-hidden="true"></span>100%</span>' + (ov ? ovl : '') +
        (fac ? '<span><span class="dot" style="width:10px;height:10px;background:var(--accent);opacity:.65"></span>Facility site, sized by share of plans</span><span><span class="dot" style="width:6px;height:6px;background:var(--ink)"></span>LAS station</span>' : '');
    } else {
      h = '<span>Colour: LAS group</span><span><span class="ln" style="height:3px"></span>Sector border</span><span><span class="ln" style="height:1.6px"></span>Group border</span><span><span class="ln" style="height:1px;background:var(--faint)"></span>Station area</span>' +
        (fac ? '<span><span class="dot" style="width:6px;height:6px;background:var(--ink)"></span>Station</span><span><span class="dot" style="width:9px;height:9px;background:var(--edge);box-shadow:inset 0 0 0 2px var(--ink)"></span>Group HQ</span><span><span class="dot" style="width:9px;height:9px;background:var(--accent)"></span>EOC</span>' : '');
    }
    $('legend').innerHTML = h;
  }

  // ---------- trace (minutes) ----------
  var TW = 800, TH = 96, tl = 44, tr = 8, tt = 8, tb = 22, ymin, ymax;
  function traceX(k) { return tl + (k - 1) / (CH.steps.length - 1) * (TW - tl - tr); }
  function renderTrace() {
    if (!META) return;
    TW = Math.max(240, root.querySelector('.trace').clientWidth || 800);
    $('trace').setAttribute('viewBox', '0 0 ' + TW + ' ' + TH);
    ymin = Math.floor(Math.min.apply(null, minutes)); ymax = Math.ceil(Math.max.apply(null, minutes));
    var Y = function (v) { return tt + (1 - (v - ymin) / (ymax - ymin)) * (TH - tt - tb); };
    var s = '';
    for (var g = ymin; g <= ymax; g++) s += '<line x1="' + tl + '" x2="' + (TW - tr) + '" y1="' + Y(g) + '" y2="' + Y(g) + '" stroke="var(--line)"></line>';
    var d = minutes.map(function (v, i) { return (i ? 'L' : 'M') + traceX(i + 1).toFixed(1) + ' ' + Y(v).toFixed(1); }).join('');
    s += '<path d="' + d + ' L' + traceX(minutes.length) + ' ' + Y(ymin) + ' L' + traceX(1) + ' ' + Y(ymin) + 'Z" fill="var(--r3)" fill-opacity="0.12"></path>';
    s += '<path d="' + d + '" fill="none" stroke="var(--r3)" stroke-width="1.5"></path>';
    var rug = ''; CH.steps.forEach(function (st, i) { if (st.a) rug += 'M' + traceX(i + 1).toFixed(1) + ' ' + (TH - tb + 4) + 'v5'; });
    s += '<path d="' + rug + '" stroke="var(--faint)" stroke-width="1" opacity="0.6"></path>';
    s += '<line id="cursor" x1="' + traceX(cur) + '" x2="' + traceX(cur) + '" y1="' + tt + '" y2="' + (TH - tb + 10) + '" stroke="var(--accent)" stroke-width="2"></line>';
    $('trace').innerHTML = s;
    var lab = $('tracelab');
    if (!lab) { lab = document.createElement('div'); lab.id = 'tracelab'; lab.style.cssText = 'position:absolute;inset:0;pointer-events:none;font:11px var(--f-mono);color:var(--muted)'; root.querySelector('.trace').appendChild(lab); }
    var yl = ''; for (var g2 = ymin; g2 <= ymax; g2++) yl += '<span style="position:absolute;left:0;width:36px;text-align:right;top:' + (Y(g2) - 7) + 'px">' + g2 + '</span>';
    lab.innerHTML = yl + '<span style="position:absolute;left:44px;bottom:0">Mean travel time per incident, min · ticks mark accepted steps</span><span style="position:absolute;right:8px;bottom:0">step 1,000</span>';
    $('scrub').style.left = tl + 'px'; $('scrub').style.width = (TW - tl - tr) + 'px';
  }

  // series: districts and super-districts over the run
  var SW = 600, SH = 130, sl = 34, sr = 10, st0 = 14, sb = 22;
  function seriesX(k) { return sl + (k - 1) / (CH.steps.length - 1) * (SW - sl - sr); }
  function renderSeries() {
    if (!META) return;
    var el = $('series'); SW = Math.max(260, el.clientWidth || 600);
    var nd = META.chainStats.map(function (c) { return c.nD; }), ns = META.chainStats.map(function (c) { return c.nS; });
    var lo = 0, hi = Math.ceil(Math.max.apply(null, nd) / 20) * 20;
    var Y = function (v) { return st0 + (1 - (v - lo) / (hi - lo)) * (SH - st0 - sb); };
    var line = function (a) { return a.map(function (v, i) { return (i ? 'L' : 'M') + seriesX(i + 1).toFixed(1) + ' ' + Y(v).toFixed(1); }).join(''); };
    var s = '<svg viewBox="0 0 ' + SW + ' ' + SH + '" role="img" aria-label="Number of districts and super-districts over the run">';
    for (var g = lo; g <= hi; g += 20) s += '<line x1="' + sl + '" x2="' + (SW - sr) + '" y1="' + Y(g) + '" y2="' + Y(g) + '" stroke="var(--line)"></line><text x="' + (sl - 6) + '" y="' + (Y(g) + 4) + '" text-anchor="end" font-size="11" fill="var(--muted)">' + g + '</text>';
    s += '<path d="' + line(nd) + '" fill="none" stroke="var(--c0)" stroke-width="2"></path><path d="' + line(ns) + '" fill="none" stroke="var(--c1)" stroke-width="2"></path>';
    s += '<text x="' + (SW - sr) + '" y="' + (Y(nd[nd.length - 1]) - 6) + '" text-anchor="end" font-size="11" fill="var(--ink)">districts</text>';
    s += '<text x="' + (SW - sr) + '" y="' + (Y(ns[ns.length - 1]) - 6) + '" text-anchor="end" font-size="11" fill="var(--ink)">super-districts</text>';
    s += '<line id="scursor" x1="' + seriesX(cur) + '" x2="' + seriesX(cur) + '" y1="' + st0 + '" y2="' + (SH - sb) + '" stroke="var(--accent)" stroke-width="2"></line>';
    s += '<text x="' + sl + '" y="' + (SH - 4) + '" font-size="11" fill="var(--muted)">step 1</text><text x="' + (SW - sr) + '" y="' + (SH - 4) + '" text-anchor="end" font-size="11" fill="var(--muted)">step 1,000</text></svg>';
    el.innerHTML = s;
  }

  // dot strips
  function strip(el, rows, axes) {
    var W = Math.max(320, el.clientWidth || 640), rowH = 44, ml = Math.min(170, W * 0.3), mr = 16, gap = 30, top = 6;
    var H = top + rows.length * (rowH + gap);
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + rows.map(function (r) { return r.label + ': ' + r.vals.length + ' units, CV ' + pct(cv(r.vals)); }).join('; ') + '">';
    rows.forEach(function (r, i) {
      var y0 = top + i * (rowH + gap), y = y0 + rowH / 2, max = axes[i];
      var X = function (v) { return ml + v / max * (W - ml - mr); };
      for (var t = 0; t <= max + 1e-6; t += max / 4) {
        s += '<line x1="' + X(t) + '" x2="' + X(t) + '" y1="' + y0 + '" y2="' + (y0 + rowH) + '" stroke="var(--line)"></line>';
        s += '<text x="' + X(t) + '" y="' + (y0 + rowH + 14) + '" text-anchor="middle" font-size="11" fill="var(--muted)">' + NF.format(Math.round(t / 1000)) + 'k</text>';
      }
      s += '<text x="0" y="' + (y - 4) + '" font-size="12.5" fill="var(--ink)" font-family="var(--f-body)">' + r.label + '</text>';
      s += '<text x="0" y="' + (y + 12) + '" font-size="11" fill="var(--muted)">' + r.vals.length + ' units · CV ' + pct(cv(r.vals)) + '</text>';
      r.vals.forEach(function (v) { s += '<circle cx="' + X(Math.min(v, max)).toFixed(1) + '" cy="' + y + '" r="5" fill="' + r.color + '" fill-opacity="0.7" stroke="var(--surface)" stroke-width="1"><title>' + NF.format(Math.round(v)) + ' incidents</title></circle>'; });
      if (r.target) { s += '<rect x="' + X(r.target[0]) + '" y="' + (y0 + 2) + '" width="' + (X(r.target[1]) - X(r.target[0])) + '" height="' + (rowH - 4) + '" fill="var(--ink)" fill-opacity="0.06"></rect>'; }
    });
    el.innerHTML = s + '</svg>';
  }
  function renderStrip() {
    if (!META || !distOf || tab !== 'chain') return;
    var cl = chainLoads(), w = META.params.w_unit, e = META.params.epsilon;
    axisMax.sup = Math.max(axisMax.sup, Math.ceil(Math.max.apply(null, cl.sup) / 20000) * 20000);
    strip($('strip'), [
      { label: 'Super-districts', vals: cl.sup, color: 'var(--c1)' },
      { label: 'Per team', vals: cl.perTeam, color: 'var(--c0)', target: [w * (1 - e), w * (1 + e)] }], [axisMax.sup, axisMax.team]);
    $('bal-eyebrow').textContent = 'Workload in the plan at step ' + NF.format(cur);
  }

  // ---------- ensemble panel ----------
  function renderEnsTable() {
    if (!META) return;
    var L = META.las, E = META.ens, cvE = E.capacity.demand_cv;
    var rows = [
      ['Load spread per facility', pct(L.cvSt) + '<span class="sub">CV across 66 station areas</span>', pct(cvE.mean, 1) + '<span class="sub">per team; ' + pct(cvE.min, 1) + '–' + pct(cvE.max, 1) + ' across plans</span>'],
      ['Facilities', L.nSt + ' stations', f1(E.avgFac, 0) + '<span class="sub">per plan, on average</span>'],
      ['Sites in use', L.nSt + ' fixed', NF.format(E.facUsed) + '<span class="sub">none used in every plan</span>'],
      ['Real station sites used', '66 of 66', E.realUsed + ' of ' + E.realTotal + '<span class="sub">' + pct(E.realShare, 1) + ' of all placements</span>'],
      ['Borders kept in ≥ 90% of plans', '—', E.robust + '<span class="sub">' + f1(E.robustKm, 1) + ' km; ' + pct(E.robustOnLasGroup) + ' on LAS group borders</span>'],
      ['How often LAS group borders are kept', '—', pct(E.lasGroupMeanFreq) + '<span class="sub">vs ' + pct(E.otherMeanFreq) + ' for other borders</span>']
    ];
    $('cmp-b').innerHTML = rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>'; }).join('');
    $('take').textContent = 'Across ' + E.n + ' plans, FalCom holds load per team to a ' + pct(cvE.min, 0) + '–' + pct(cvE.max, 0) + ' spread, against ' + pct(L.cvSt) + ' across today\'s station areas. It gets there with facility sites that rarely match existing stations, and it agrees on very few borders: today\'s group borders are kept only slightly more often than any other border.';
  }
  function renderRobHist() {
    if (!BORD || tab !== 'ens') return;
    var E = META.ens, bins = new Array(10).fill(0), binsL = new Array(10).fill(0);
    BORD.features.forEach(function (f) { var p = f.properties; if (p.f <= 0) return; var b = Math.min(9, Math.floor(p.f * 10)); bins[b]++; if (p.l >= 2) binsL[b]++; });
    $('rob-text').textContent = NF.format(E.observed) + ' of the 14,550 LSOA borders separate two districts in at least one plan. Only ' + E.robust + ' do so in 90% or more of plans (' + f1(E.robustKm, 1) + ' km), and ' + pct(E.robustOnLasGroup) + ' of that length lies on an LAS group border.';
    var el = $('robhist'), W = Math.max(320, el.clientWidth || 640), H = 180, ml = 44, mr = 12, mt = 12, mb = 40, max = Math.ceil(Math.max.apply(null, bins) / 1000) * 1000;
    var bw = (W - ml - mr) / 10, Y = function (v) { return mt + (1 - v / max) * (H - mt - mb); };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Histogram of how often each border is kept across plans">';
    for (var g = 0; g <= max; g += max / 4) s += '<line x1="' + ml + '" x2="' + (W - mr) + '" y1="' + Y(g) + '" y2="' + Y(g) + '" stroke="var(--line)"></line><text x="' + (ml - 6) + '" y="' + (Y(g) + 4) + '" text-anchor="end" font-size="11" fill="var(--muted)">' + NF.format(g) + '</text>';
    bins.forEach(function (v, i) {
      var x = ml + i * bw + 2, w = bw - 4;
      s += '<rect x="' + x + '" y="' + Y(v) + '" width="' + w + '" height="' + (Y(0) - Y(v)) + '" fill="var(--r3)" rx="3"><title>' + (i * 10) + '–' + (i * 10 + 10) + '%: ' + NF.format(v) + ' borders, ' + NF.format(binsL[i]) + ' on LAS group borders</title></rect>';
      if (binsL[i]) s += '<rect x="' + x + '" y="' + Y(binsL[i]) + '" width="' + w + '" height="' + (Y(0) - Y(binsL[i])) + '" fill="var(--accent)" rx="3"></rect>';
      s += '<text x="' + (x + w / 2) + '" y="' + (H - mb + 15) + '" text-anchor="middle" font-size="11" fill="var(--muted)">' + (i * 10) + '%</text>';
    });
    s += '<rect x="' + ml + '" y="' + (H - 12) + '" width="10" height="10" fill="var(--r3)" rx="2"></rect><text x="' + (ml + 14) + '" y="' + (H - 3) + '" font-size="11" fill="var(--muted)">all borders</text>';
    s += '<rect x="' + (ml + 104) + '" y="' + (H - 12) + '" width="10" height="10" fill="var(--accent)" rx="2"></rect><text x="' + (ml + 118) + '" y="' + (H - 3) + '" font-size="11" fill="var(--muted)">on an LAS group border</text>';
    s += '<text x="' + (W - mr) + '" y="' + (H - 3) + '" text-anchor="end" font-size="11" fill="var(--muted)">share of plans keeping it</text>';
    el.innerHTML = s + '</svg>';
  }
  function renderFacRank() {
    if (!META || tab !== 'ens') return;
    var E = META.ens, ff = META.facfreq.slice().sort(function (a, b) { return b[2] - a[2]; });
    $('fac-text').textContent = 'Plans use about ' + f1(E.avgFac, 0) + ' facilities each, drawn from ' + NF.format(E.facUsed) + ' candidate sites. The most popular site appears in ' + pct(E.topFreq) + ' of plans and none in all of them. ' + E.realUsed + ' of the 66 real station sites are ever chosen, accounting for ' + pct(E.realShare, 1) + ' of placements.';
    var el = $('facrank'), W = Math.max(320, el.clientWidth || 640), H = 170, ml = 44, mr = 12, mt = 12, mb = 40;
    var bw = (W - ml - mr) / ff.length, Y = function (v) { return mt + (1 - v) * (H - mt - mb); };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Candidate sites ranked by the share of plans using them; real station sites highlighted">';
    [0, 0.25, 0.5, 0.75, 1].forEach(function (g) { s += '<line x1="' + ml + '" x2="' + (W - mr) + '" y1="' + Y(g) + '" y2="' + Y(g) + '" stroke="var(--line)"></line><text x="' + (ml - 6) + '" y="' + (Y(g) + 4) + '" text-anchor="end" font-size="11" fill="var(--muted)">' + (g * 100) + '%</text>'; });
    var other = '', real = '';
    ff.forEach(function (f, i) { var x = ml + i * bw, seg = 'M' + x.toFixed(2) + ' ' + Y(0) + 'V' + Y(f[2]).toFixed(1); if (f[3]) real += seg; else other += seg; });
    s += '<path d="' + other + '" stroke="var(--r3)" stroke-width="' + Math.max(0.8, bw * 0.8).toFixed(2) + '"></path>';
    s += '<path d="' + real + '" stroke="var(--accent)" stroke-width="' + Math.max(1.6, bw).toFixed(2) + '"></path>';
    s += '<text x="' + ml + '" y="' + (H - mb + 15) + '" font-size="11" fill="var(--muted)">most used</text><text x="' + (W - mr) + '" y="' + (H - mb + 15) + '" text-anchor="end" font-size="11" fill="var(--muted)">' + NF.format(ff.length) + ' sites ranked</text>';
    s += '<rect x="' + ml + '" y="' + (H - 12) + '" width="10" height="10" fill="var(--r3)" rx="2"></rect><text x="' + (ml + 14) + '" y="' + (H - 3) + '" font-size="11" fill="var(--muted)">candidate site</text>';
    s += '<rect x="' + (ml + 124) + '" y="' + (H - 12) + '" width="10" height="10" fill="var(--accent)" rx="2"></rect><text x="' + (ml + 138) + '" y="' + (H - 3) + '" font-size="11" fill="var(--muted)">real LAS station site</text>';
    el.innerHTML = s + '</svg>';
  }

  function renderParams() {
    var p = META.params;
    var rows = [['Demand per team, w', NF.format(p.w_unit) + ' incidents'], ['Balance tolerance, ε', '±' + pct(p.epsilon)], ['Teams per district, c¹', p.c_min + '–' + p.capacity_level], ['Districts per super-district, c²', p.c_min_super + '–' + p.c_max_super], ['Candidate sites', NF.format(META.repairedCandidates) + ' (' + META.realCandidates + ' real stations)'], ['Animated chain', '1,000 steps, seed ' + p.seed], ['Ensemble', META.ens.n + ' plans from many chains'], ['Calibration', p.calibration]];
    $('pdl').innerHTML = rows.map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + r[1] + '</dd>'; }).join('');
  }

  // ---------- playback ----------
  function togglePlay() {
    if (tab !== 'chain') return;
    playing = !playing;
    $('ic-play').hidden = playing; $('ic-pause').hidden = !playing;
    $('play').setAttribute('aria-label', playing ? 'Pause the chain' : 'Play the chain');
    if (playing) { if (cur >= CH.steps.length) seek(1); lastT = performance.now(); acc = 0; requestAnimationFrame(tick); }
  }
  function tick(t) {
    if (!playing || destroyed) return;
    acc += (t - lastT) / 1000 * +$('speed').value; lastT = t;
    if (acc >= 1) { var n = Math.floor(acc); acc -= n; seek(Math.min(CH.steps.length, cur + n)); if (cur >= CH.steps.length) { togglePlay(); return; } }
    requestAnimationFrame(tick);
  }

  // ---------- map ----------
  var blabels = [], mapRO = null, destroyed = false;
  function initMap() {
    if (!maplibregl) { $('loading').textContent = 'The map library could not load.'; return; }
    var b = META.bounds;
    map = new maplibregl.Map({ container: 'map', attributionControl: false, dragRotate: false, pitchWithRotate: false,
      bounds: [[b[0], b[1]], [b[2], b[3]]], fitBoundsOptions: { padding: 20 },
      style: { version: 8, sources: {}, layers: [{ id: 'bg', type: 'background', paint: { 'background-color': css('--map-bg') } }] } });
    map.touchZoomRotate.disableRotation();
    mapRO = new ResizeObserver(function () { map.resize(); }); mapRO.observe($('map'));
    map.on('load', function () {
      var ptsFC = function (arr, props) { return { type: 'FeatureCollection', features: arr.map(function (s) { return { type: 'Feature', geometry: { type: 'Point', coordinates: [s.lon, s.lat] }, properties: props(s) }; }) }; };
      map.addSource('lsoa', { type: 'geojson', data: LSOA });
      map.addSource('bord', { type: 'geojson', data: BORD });
      map.addSource('outl', { type: 'geojson', data: OUTL });
      map.addSource('fcfac', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      map.addSource('st', { type: 'geojson', data: ptsFC(META.stations, function (s) { return { n: s.code + ' ' + s.name }; }) });
      map.addSource('hq', { type: 'geojson', data: ptsFC(META.hqs, function (s) { return { n: s.name }; }) });
      map.addSource('eoc', { type: 'geojson', data: ptsFC(META.eocs, function (s) { return { n: s.name }; }) });
      map.addSource('ff', { type: 'geojson', data: { type: 'FeatureCollection', features: META.facfreq.map(function (f) { return { type: 'Feature', geometry: { type: 'Point', coordinates: [f[0], f[1]] }, properties: { f: f[2] } }; }) } });
      map.addLayer({ id: 'fill', type: 'fill', source: 'lsoa', paint: { 'fill-color': '#999', 'fill-opacity': 0.8 } });
      map.addLayer({ id: 'las-b', type: 'line', source: 'bord', filter: ['>=', ['get', 'l'], 1], layout: { 'line-join': 'round', visibility: 'none' }, paint: { 'line-width': ['match', ['get', 'l'], 1, 0.6, 2, 1.6, 3, 3, 0], 'line-opacity': ['match', ['get', 'l'], 1, 0.85, 1] } });
      map.addLayer({ id: 'fc-b', type: 'line', source: 'bord', layout: { 'line-join': 'round' }, paint: { 'line-width': ['match', ['feature-state', 'lv'], 1, 0.6, 2, 1.8, 0], 'line-opacity': ['match', ['feature-state', 'lv'], 1, 0.85, 2, 1, 0] } });
      map.addLayer({ id: 'rob-b', type: 'line', source: 'bord', layout: { 'line-join': 'round', 'line-cap': 'round', visibility: 'none' }, paint: { 'line-width': ['interpolate', ['linear'], ['get', 'f'], 0, 0.4, 0.5, 1.4, 1, 3.4] } });
      map.addLayer({ id: 'chg', type: 'line', source: 'lsoa', paint: { 'line-width': ['case', ['boolean', ['feature-state', 'chg'], false], 1.6, 0] } });
      map.addLayer({ id: 'lasov', type: 'line', source: 'bord', filter: ['>=', ['get', 'l'], 2], layout: { visibility: 'none' }, paint: { 'line-width': 1.4, 'line-dasharray': [2, 2], 'line-opacity': 0.9 } });
      map.addLayer({ id: 'outline', type: 'line', source: 'outl', paint: { 'line-width': 1.2, 'line-opacity': 0.7 } });
      map.addLayer({ id: 'hover', type: 'line', source: 'lsoa', paint: { 'line-width': ['case', ['boolean', ['feature-state', 'hover'], false], 2.2, 0] } });
      map.addLayer({ id: 'rob-fac', type: 'circle', source: 'ff', layout: { visibility: 'none' }, paint: { 'circle-radius': ['interpolate', ['linear'], ['sqrt', ['get', 'f']], 0, 1.5, 1, 9], 'circle-opacity': 0.6, 'circle-stroke-width': 0.6 } });
      map.addLayer({ id: 'las-st', type: 'circle', source: 'st', layout: { visibility: 'none' }, paint: { 'circle-radius': 2.8, 'circle-stroke-width': 1 } });
      map.addLayer({ id: 'las-hq', type: 'circle', source: 'hq', layout: { visibility: 'none' }, paint: { 'circle-radius': 4.2, 'circle-stroke-width': 1.8 } });
      map.addLayer({ id: 'las-eoc', type: 'circle', source: 'eoc', layout: { visibility: 'none' }, paint: { 'circle-radius': 4.8, 'circle-stroke-width': 1.2 } });
      map.addLayer({ id: 'fc-fac', type: 'circle', source: 'fcfac', layout: { visibility: 'none' }, paint: { 'circle-radius': ['match', ['get', 't'], 1, 2.4, 2, 3.4, 4.4], 'circle-stroke-width': 1 } });
      recolor(); applyView();
      $('loading').hidden = true;
    });
    var tip = $('tip'), hov = null;
    map.on('mousemove', 'fill', function (e) {
      var f = e.features[0]; if (!f) return;
      if (hov !== null) map.setFeatureState({ source: 'lsoa', id: hov }, { hover: false });
      hov = f.id; map.setFeatureState({ source: 'lsoa', id: hov }, { hover: true });
      var p = f.properties, st = META.stations[p.st];
      var h = '<b>' + p.n + '</b><br><span class="k">Incidents per year</span> ' + NF.format(p.d);
      if (tab === 'chain') {
        var d = distOf[f.id];
        h += '<div class="sec"><span class="k">Step ' + NF.format(cur) + '</span><br>District ' + d + ' · ' + teamsOfD[d] + (teamsOfD[d] === 1 ? ' team' : ' teams') + '<br>Super-district ' + supOfD[d] + (chgOn.indexOf(f.id) >= 0 ? '<br><span class="k">Moved at this step</span>' : '') + '</div>';
      }
      h += '<div class="sec"><span class="k">LAS today</span> ' + p.s + ' sector · ' + p.g + ' group<br><span class="k">Nearest station</span> ' + st.code + ' ' + st.name + '</div>';
      tip.innerHTML = h; tip.hidden = false;
      var r = $('map').getBoundingClientRect(), x = e.point.x + 16, y = e.point.y + 16;
      if (x + 260 > r.width) x = e.point.x - 266; if (y + 180 > r.height) y = Math.max(8, e.point.y - 180);
      tip.style.left = x + 'px'; tip.style.top = y + 'px';
      map.getCanvas().style.cursor = 'crosshair';
    });
    map.on('mouseleave', 'fill', function () { if (hov !== null) map.setFeatureState({ source: 'lsoa', id: hov }, { hover: false }); hov = null; tip.hidden = true; map.getCanvas().style.cursor = ''; });
    $('z-in').onclick = function () { map.zoomIn(); };
    $('z-out').onclick = function () { map.zoomOut(); };
    $('z-fit').onclick = function () { map.fitBounds([[b[0], b[1]], [b[2], b[3]]], { padding: 20 }); };
    $('bnames').onchange = function (ev) {
      blabels.forEach(function (m) { m.remove(); }); blabels = [];
      if (ev.target.checked) META.boroughs.forEach(function (bo) { var el = document.createElement('div'); el.className = 'blabel'; el.textContent = bo[0]; blabels.push(new maplibregl.Marker({ element: el }).setLngLat([bo[1], bo[2]]).addTo(map)); });
    };
    $('lasov').onchange = function () { applyView(); renderLegend(); };
    $('facs').onchange = function () { applyView(); renderLegend(); };
  }

  function lasColoring() {
    var groups = {}, names = [];
    LSOA.features.forEach(function (f) { if (!(f.properties.g in groups)) { groups[f.properties.g] = names.length; names.push(f.properties.g); } });
    var nb = names.map(function () { return {}; });
    BORD.features.forEach(function (f, e) { if (f.properties.l >= 2) { var a = groups[LSOA.features[pairs[e][0]].properties.g], c = groups[LSOA.features[pairs[e][1]].properties.g]; nb[a][c] = 1; nb[c][a] = 1; } });
    var order = names.map(function (_, i) { return i; }).sort(function (a, c) { return Object.keys(nb[c]).length - Object.keys(nb[a]).length; });
    var col = {};
    order.forEach(function (g) { var used = {}; Object.keys(nb[g]).forEach(function (o) { if (o in col) used[col[o]] = 1; }); var c = 0; while (used[c]) c++; col[g] = c; });
    lasGroupColor = new Int16Array(N);
    LSOA.features.forEach(function (f, i) { lasGroupColor[i] = col[groups[f.properties.g]]; });
  }

  function retheme() { recolor(); }
  var mq = null; try { mq = matchMedia('(prefers-color-scheme: dark)'); mq.addEventListener('change', retheme); } catch (e) {}
  var mo = new MutationObserver(retheme); mo.observe(root, { attributes: true, attributeFilter: ['class'] });
  var ro = null; try { ro = new ResizeObserver(function () { if (META) { renderTrace(); renderSeries(); renderStrip(); renderRobHist(); renderFacRank(); } }); ro.observe(root.querySelector('.wrap')); } catch (e) {}

  $('t-chain').addEventListener('click', function () { setTab('chain'); });
  $('t-ens').addEventListener('click', function () { setTab('ens'); });
  $('v-rob').addEventListener('click', function () { setEnsView('rob'); });
  $('v-las').addEventListener('click', function () { setEnsView('las'); });
  $('play').addEventListener('click', togglePlay);
  $('scrub').addEventListener('input', function (e) { seek(+e.target.value); });
  $('th').addEventListener('input', updateRobust);

  var J = function (u) { return fetch(base + '/' + u).then(function (r) { if (!r.ok) throw new Error(u); return r.json(); }); };
  Promise.all([J('meta.json'), J('chain.json'), J('lsoa.json'), J('borders.json'), J('outline.json')]).then(function (r) {
    META = r[0]; CH = r[1]; LSOA = r[2]; BORD = r[3]; OUTL = r[4];
    N = META.N; cx = CH.cx; cy = CH.cy; pairs = CH.pairs;
    minutes = META.energy.map(function (v) { return v / META.totalDemand; });
    demand = new Float64Array(N); LSOA.features.forEach(function (f, i) { demand[i] = f.properties.d; });
    buildCheckpoints(); lasColoring(); renderParams();
    var start = opts.initialTab === 'ensemble' ? 'ens' : 'chain';
    setTab(start); renderTrace(); renderSeries(); updateStepUI();
    initMap();
  }).catch(function () { $('loading').textContent = 'The map data could not load. Reload the page to try again.'; });

  return {
    destroy: function () {
      destroyed = true; playing = false;
      try { if (mq) mq.removeEventListener('change', retheme); } catch (e) {}
      try { mo.disconnect(); } catch (e) {}
      try { if (ro) ro.disconnect(); if (mapRO) mapRO.disconnect(); } catch (e) {}
      try { blabels.forEach(function (m) { m.remove(); }); if (map) map.remove(); } catch (e) {}
    }
  };
}
