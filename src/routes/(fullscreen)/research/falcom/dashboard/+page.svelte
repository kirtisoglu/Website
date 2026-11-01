<script>
  /**
   * FalCom explorer (London Ambulance Service).
   * Chain animation of one FalcomChain run, plus a separate ensemble
   * analysis compared with today's LAS structure. The rendering logic is
   * in $lib/falcomexplorer/explorer.js; data in /static/falcomplot/las/explorer/.
   */
  import { onMount, onDestroy } from 'svelte';
  import { replaceState } from '$app/navigation';
  import '$lib/falcomexplorer/explorer.css';

  let root;
  let explorer = null;
  let dark = false;
  let themeClass = '';

  function systemDark() {
    try { return matchMedia('(prefers-color-scheme: dark)').matches; } catch { return false; }
  }

  function toggleTheme() {
    dark = !dark;
    themeClass = dark ? 'dark' : 'light';
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
  }

  onMount(async () => {
    let stored = null;
    try { stored = localStorage.getItem('theme'); } catch {}
    if (stored === 'dark' || stored === 'light') { themeClass = stored; dark = stored === 'dark'; }
    else dark = systemDark();

    // CSP build + separate worker file: the default build creates its worker
    // from inlined source, which Vite's production minifier breaks.
    const [mlMod, { default: workerUrl }, { createExplorer }] = await Promise.all([
      import('maplibre-gl/dist/maplibre-gl-csp.js'),
      import('maplibre-gl/dist/maplibre-gl-csp-worker.js?url'),
      import('$lib/falcomexplorer/explorer.js'),
      import('maplibre-gl/dist/maplibre-gl.css')
    ]);
    const maplibregl = mlMod.default || mlMod;
    maplibregl.setWorkerUrl(workerUrl);
    if (!root) return;
    explorer = createExplorer(root, {
      base: '/falcomplot/las/explorer',
      maplibregl,
      initialTab: location.hash === '#ensemble' ? 'ensemble' : 'chain',
      onTab: (t) => { try { replaceState(t === 'ensemble' ? '#ensemble' : '#chain', {}); } catch {} }
    });
  });

  onDestroy(() => { if (explorer) explorer.destroy(); });
</script>

<svelte:head>
  <title>FalCom Visualizer — Alaittin Kirtisoglu</title>
  <meta name="description" content="FalCom on London ambulance demand: one Markov chain animated step by step, and an ensemble analysis of 450 plans compared with today's London Ambulance Service structure." />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Spectral:wght@500;600&display=swap" />
</svelte:head>

<div class="fx {themeClass}" bind:this={root}>
<div class="wrap">
  <div class="topbar">
    <a class="back" href="/research/falcom/"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>FalCom research</a>
    <button type="button" class="themebtn" on:click={toggleTheme} aria-label="Switch colour theme">{dark ? 'Light theme' : 'Dark theme'}</button>
  </div>
  <header>
    <p class="eyebrow">FalCom · London Ambulance Service</p>
    <h1>FalCom on London's ambulance demand</h1>
    <p class="lede">4,994 LSOAs carry annual attended incidents as demand. FalCom draws two-level service plans: districts served by one facility with 1–3 teams, grouped into super-districts. Watch one chain move, or read what an ensemble of plans says about the current LAS structure.</p>
  </header>

  <div class="tabs" role="tablist" aria-label="Analysis">
    <button type="button" role="tab" id="t-chain" aria-selected="true" aria-controls="map-card"><strong>Chain animation</strong><span>one run · 1,000 steps</span></button>
    <button type="button" role="tab" id="t-ens" aria-selected="false" aria-controls="map-card"><strong>Ensemble analysis</strong><span>450 plans · many chains</span></button>
  </div>
  <p class="scope" id="scope"></p>

  <div class="row">
    <section class="card mapcard" id="map-card" aria-label="Map">
      <div class="mapwrap">
        <div id="map" role="img" aria-label="Map of London LSOAs"></div>
        <div class="loading" id="loading">Loading 4,994 LSOAs…</div>
        <div class="mapleft" id="ensctl" hidden>
          <div class="seg" role="group" aria-label="Ensemble map view">
            <button type="button" id="v-rob" aria-pressed="true">Border robustness</button>
            <button type="button" id="v-las" aria-pressed="false">LAS today</button>
          </div>
          <div class="thresh" id="thresh">
            <label for="th"><span>Show borders kept in at least</span><strong id="th-v">50%</strong></label>
            <input type="range" id="th" min="5" max="95" step="5" value="50">
            <div class="note" id="th-n"></div>
          </div>
        </div>
        <div class="mapctl">
          <div class="zb">
            <button type="button" id="z-in" aria-label="Zoom in">+</button>
            <button type="button" id="z-out" aria-label="Zoom out">−</button>
            <button type="button" id="z-fit" aria-label="Show all of London"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 5V1h4M15 5V1h-4M1 11v4h4M15 11v4h-4"/></svg></button>
          </div>
          <label class="chip"><input type="checkbox" id="facs"> Facilities</label>
          <label class="chip" id="lasov-wrap"><input type="checkbox" id="lasov"> LAS group borders</label>
          <label class="chip"><input type="checkbox" id="bnames"> Borough names</label>
        </div>
        <div class="tip" id="tip" hidden></div>
      </div>
      <div class="legend" id="legend"></div>
      <div class="transport" id="transport" aria-label="Chain playback">
        <button type="button" class="play" id="play" aria-label="Play the chain">
          <svg id="ic-play" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" fill="currentColor"/></svg>
          <svg id="ic-pause" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" hidden><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor"/></svg>
        </button>
        <div class="stepinfo" id="stepinfo" aria-live="polite"></div>
        <label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--muted)">Speed
          <select id="speed"><option value="4">4 steps/s</option><option value="12" selected>12 steps/s</option><option value="40">40 steps/s</option></select>
        </label>
        <div class="trace">
          <svg id="trace" viewBox="0 0 800 96" aria-hidden="true"></svg>
          <input type="range" id="scrub" min="1" max="1000" value="1" aria-label="Chain step">
          <div class="focusring"></div>
        </div>
      </div>
    </section>

    <aside class="card side" id="side-chain" aria-labelledby="cur-h">
      <div>
        <p class="eyebrow" id="cur-eyebrow">Current plan</p>
        <h2 id="cur-h">This plan, step 1</h2>
      </div>
      <p class="steptext" id="steptext"></p>
      <table class="kv"><tbody id="cur-b"></tbody></table>
      <div class="chart" id="series"></div>
      <p class="note">These figures describe one state of one chain. For conclusions about FalCom plans in general, use the ensemble tab.</p>
    </aside>

    <aside class="card side" id="side-ens" aria-labelledby="ens-h" hidden>
      <div>
        <p class="eyebrow">Ensemble vs today</p>
        <h2 id="ens-h">What 450 FalCom plans say about the LAS structure</h2>
      </div>
      <table class="cmp">
        <thead><tr><th scope="col">Measure</th><th scope="col">LAS today</th><th scope="col">Ensemble</th></tr></thead>
        <tbody id="cmp-b"></tbody>
      </table>
      <p class="takeaway" id="take"></p>
    </aside>
  </div>

  <div class="row" id="below-chain">
    <section class="card panel" aria-labelledby="bal-h">
      <div>
        <p class="eyebrow" id="bal-eyebrow">Workload in the current plan</p>
        <h2 id="bal-h">Annual incidents per unit, one dot each</h2>
      </div>
      <div class="chart" id="strip"></div>
      <p class="note">FalCom sizes each district to 1–3 teams of about 10,887 incidents (±15%), so load per team stays tight at every step. Super-districts group 2–6 districts and are not balanced on demand directly.</p>
    </section>
  </div>

  <div class="row" id="below-ens" hidden>
    <section class="card panel" aria-labelledby="rob-h">
      <div>
        <p class="eyebrow">Borders</p>
        <h2 id="rob-h">Few borders are fixed across plans</h2>
      </div>
      <p style="margin:0" id="rob-text"></p>
      <div class="chart" id="robhist"></div>
    </section>
    <section class="card panel" aria-labelledby="fac-h">
      <div>
        <p class="eyebrow">Facility sites</p>
        <h2 id="fac-h">Where the ensemble places facilities</h2>
      </div>
      <p style="margin:0" id="fac-text"></p>
      <div class="chart" id="facrank"></div>
    </section>
  </div>

  <details class="card params">
    <summary>Parameters and data notes</summary>
    <div class="pgrid">
      <dl id="pdl"></dl>
      <div>
        <p>Chain animation replays one FalcomChain run from the FalComPlot LAS dataset. Ensemble statistics come from that dataset's ensemble file, which pools 450 plans from many chains.</p>
        <p>LSOA polygons are the 2021 boundaries, simplified with shared edges kept intact. LAS sector and group membership comes from the hierarchy map on akirtisoglu.me: most LSOAs follow their borough, 425 are assigned by station proximity inside a borough, and 83 are manual overrides. LAS station areas are taken as nearest station.</p>
      </div>
    </div>
  </details>
</div>
</div>
