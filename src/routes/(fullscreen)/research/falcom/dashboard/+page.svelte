<script>
  /**
   * FalCom Visualizer Dashboard
   * ---------------------------
   * Fullscreen, embedded animation of recorded MCMC trajectories produced
   * by FalcomChain (Recorder + EnsembleStats). Datasets are pre-recorded
   * and shipped under /static/falcomplot/<id>/. The dashboard reads
   * /falcomplot/datasets.json to populate the picker.
   */
  import { onMount } from 'svelte';
  import FalcomPlot from '$lib/falcomplot/FalcomPlot.svelte';
  import FalcomPlotControls from '$lib/falcomplot/FalcomPlotControls.svelte';

  let datasets = [];
  let selectedId = null;
  let loadErr = null;
  // Host element for the playback controls — bound to the sidebar
  // wrapper so FalcomPlot wires its buttons there instead of floating
  // them over the canvas.
  let controlsEl;

  // Per-dataset capacity table (currently only LAS ships one).
  let fleetCapacity = null;
  let fleetExpanded = false;

  // First-visit explainer card. Dismissal is remembered per browser.
  let showIntro = false;
  const INTRO_KEY = 'falcom-dashboard-intro-dismissed';
  function dismissIntro() {
    showIntro = false;
    try { localStorage.setItem(INTRO_KEY, '1'); } catch {}
  }

  $: dataPath = selectedId ? `/falcomplot/${selectedId}` : null;
  $: selected = datasets.find((d) => d.id === selectedId) || null;

  onMount(async () => {
    try {
      showIntro = !localStorage.getItem(INTRO_KEY);
    } catch {
      showIntro = true;
    }
    try {
      const r = await fetch('/falcomplot/datasets.json', { cache: 'no-cache' });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      datasets = data.datasets || [];
      if (datasets.length > 0) selectedId = datasets[0].id;
    } catch (err) {
      loadErr = err.message || String(err);
    }
  });

  // Reload the per-dataset capacity table whenever the selection changes.
  // Silent failure: only LAS currently ships a fleet_capacity.json.
  $: if (dataPath) loadFleet(dataPath);
  async function loadFleet(p) {
    try {
      const r = await fetch(`${p}/fleet_capacity.json`, { cache: 'no-cache' });
      if (!r.ok) { fleetCapacity = null; return; }
      fleetCapacity = await r.json();
    } catch {
      fleetCapacity = null;
    }
  }
</script>

<svelte:head>
  <title>FalCom Visualizer — Alaittin Kirtisoglu</title>
  <meta
    name="description"
    content="Animated FalCom Markov chain Monte Carlo for hierarchical capacitated facility location and redistricting."
  />
</svelte:head>

<div class="dash">
  <header class="topbar">
    <a class="back" href="/research/falcom/" aria-label="Back to FalCom">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
      <span>FalCom</span>
    </a>
    <div class="title">FalCom Visualizer</div>
    <div class="picker">
      {#if datasets.length > 0}
        <label for="ds">Dataset</label>
        <select id="ds" bind:value={selectedId}>
          {#each datasets as d}
            <option value={d.id}>{d.label}</option>
          {/each}
        </select>
      {:else if loadErr}
        <span class="err">load error: {loadErr}</span>
      {:else}
        <span class="muted">loading datasets…</span>
      {/if}
    </div>
  </header>

  <main class="stage">
    <FalcomPlot
      {dataPath}
      showEnsembleSelect={false}
      showStatusLog={false}
      inlineControls={false}
      externalControlsEl={controlsEl}
    />
    {#if !dataPath}
      <div class="empty muted">
        {#if loadErr}
          <span class="err">Could not load <code>/falcomplot/datasets.json</code>: {loadErr}</span>
        {:else}
          Initialising…
        {/if}
      </div>
    {/if}

    {#if showIntro}
      <div class="intro-card" role="note">
        <button class="intro-close" on:click={dismissIntro} aria-label="Dismiss">×</button>
        <h4>What you're watching</h4>
        <p>
          A Markov chain sampling <strong>service-district plans</strong>: each
          colored region is a district served by one facility (gold stars are
          candidate sites), and thick dark lines group districts into
          super-districts — the two-level hierarchy. Every step proposes a new
          feasible plan by merging districts and re-splitting them along a
          random spanning tree.
        </p>
        <p>
          Press <strong>▶</strong> to run the chain, scrub with the energy
          trace below, and switch the <strong>Overlay</strong> to
          <em>boundary frequency</em> to see which borders the ensemble
          considers non-negotiable.
        </p>
        <button class="intro-ok" on:click={dismissIntro}>Got it</button>
      </div>
    {/if}
  </main>

  <aside class="meta">
    <section class="meta-section">
      <h3 class="meta-title">Playback</h3>
      <div class="controls-host" bind:this={controlsEl}>
        <FalcomPlotControls showEnsembleSelect={true} />
      </div>
    </section>

    {#if selected}
      <!--
        Tooltip drop-zone for FalcomPlot's inputHandler.  When the cursor
        hovers an active district on the canvas, inputHandler.attachMouseListeners
        looks up `document.getElementById("districtMetadata")` and writes a
        formatted block into it (district id, colour, blocks count, iteration,
        root, population, hired teams, debt).  Without this element the
        tooltip silently drops; with it the sidebar updates on hover.
      -->
      <section class="meta-section">
        <h3 class="meta-title">Hover info</h3>
        <div id="districtMetadata" class="district-metadata">
          <span class="dm-placeholder">Hover over a district…</span>
        </div>
      </section>
    {/if}

    {#if fleetCapacity}
      <section class="meta-section fleet">
        <h3 class="meta-title">Fleet capacity</h3>
        <p class="fleet-source">
          Inventory: <strong>{Math.round(fleetCapacity.totals.n_dca_mean_inventory)}</strong>
          DCAs · on-shift: <strong>{fleetCapacity.totals.n_dca_operational}</strong>
          (×{fleetCapacity.source.on_shift_ratio})
        </p>

        <details class="fleet-block">
          <summary>L2 — by sector ({fleetCapacity.sectors.length})</summary>
          <table class="fleet-tbl">
            <thead><tr><th>Sector</th><th class="num">Groups</th><th class="num">On-shift DCAs</th><th class="num">Inventory</th></tr></thead>
            <tbody>
              {#each fleetCapacity.sectors as s}
                <tr>
                  <td>{s.sector}</td>
                  <td class="num">{s.n_groups}</td>
                  <td class="num">{s.n_dca_op}</td>
                  <td class="num">{s.n_dca_mean.toFixed(0)}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </details>

        <details class="fleet-block" bind:open={fleetExpanded}>
          <summary>L1 — by Group HQ ({fleetCapacity.groups.length})</summary>
          <table class="fleet-tbl">
            <thead><tr><th>Group HQ</th><th>Sector</th><th class="num">On-shift</th><th class="num">Mean</th></tr></thead>
            <tbody>
              {#each fleetCapacity.groups as g}
                <tr>
                  <td>{g.station_name}</td>
                  <td class="sector-cell">{g.sector}</td>
                  <td class="num">{g.n_dca_op}</td>
                  <td class="num">{g.n_dca_mean.toFixed(0)}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </details>
      </section>
    {/if}

    <section class="meta-section">
      <h3 class="meta-title">Run it on your data</h3>
      <p class="desc">
        These trajectories are pre-recorded with
        <a href="https://falcomchain.readthedocs.io" target="_blank" rel="noopener">FalcomChain</a>.
        To record and replay your own chains locally, see the
        <a
          href="https://falcomchain.readthedocs.io/en/latest/visualization.html"
          target="_blank"
          rel="noopener">visualization guide</a
        >.
      </p>
    </section>
  </aside>
</div>

<style>
  .dash {
    position: fixed;
    inset: 0;
    display: grid;
    grid-template-rows: 44px 1fr;
    grid-template-columns: 1fr 300px;
    background: #07090e;
    color: #e7eaf0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    overflow: hidden;
  }

  .topbar {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 16px;
    background: #0c1018;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    z-index: 10;
  }

  .back {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #90caf9;
    text-decoration: none;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
    transition: background 120ms;
  }
  .back:hover { background: rgba(33, 150, 243, 0.12); }

  .title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #fff;
    flex: 1;
  }

  .picker {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
  }
  .picker label { color: #90caf9; }
  .picker select {
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
    border: 1px solid rgba(33, 150, 243, 0.55);
    border-radius: 4px;
    padding: 3px 8px;
    font-size: 12px;
    min-width: 180px;
  }
  .picker select option {
    background: #0c1018;
    color: #fff;
  }
  .err { color: #ef5350; font-size: 11px; }
  .muted { color: rgba(255,255,255,0.5); font-size: 11px; }

  .stage {
    position: relative;
    overflow: hidden;
    background: #000;
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    /* Prevent the canvas column from being pushed by long sidebar
       content — grid items default to min-width:auto. */
    min-width: 0;
    min-height: 0;
  }

  .meta {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    background: #0c1018;
    border-left: 1px solid rgba(255,255,255,0.08);
    padding: 14px 16px;
    overflow: hidden auto;        /* clip overlong words horizontally */
    font-size: 12px;
    color: #cbd2dc;
    display: flex;
    flex-direction: column;
    gap: 18px;
    /* Lock the column to its 300 px slot regardless of content. */
    min-width: 0;
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  .meta-section { display: flex; flex-direction: column; gap: 6px; }
  .meta-title {
    margin: 0 0 6px 0;
    font-size: 10px;
    font-weight: 700;
    color: #90caf9;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .controls-host { width: 100%; }

  .meta-row {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    border-bottom: 1px dashed rgba(255,255,255,0.06);
  }
  .meta-row:last-of-type { border-bottom: none; }
  .meta-row .k { color: #90caf9; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; }
  .meta-row .v { color: #fff; font-weight: 600; }

  .desc {
    margin-top: 12px;
    line-height: 1.55;
    font-size: 12px;
    color: rgba(255,255,255,0.65);
  }

  .desc a {
    color: #7db3e8;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .desc a:hover {
    color: #a8ccf0;
  }

  /* First-visit explainer card */
  .intro-card {
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    width: min(460px, calc(100% - 32px));
    background: rgba(13, 17, 26, 0.94);
    border: 1px solid rgba(90, 140, 200, 0.5);
    border-radius: 8px;
    padding: 14px 18px 12px;
    z-index: 1200;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45);
  }

  .intro-card h4 {
    margin: 0 0 8px;
    font-size: 13px;
    letter-spacing: 0.02em;
    color: #cfe1f5;
  }

  .intro-card p {
    margin: 0 0 8px;
    font-size: 12px;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.78);
  }

  .intro-card strong {
    color: #fff;
  }

  .intro-close {
    position: absolute;
    top: 6px;
    right: 8px;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.55);
    font-size: 16px;
    cursor: pointer;
    line-height: 1;
  }

  .intro-close:hover {
    color: #fff;
  }

  .intro-ok {
    background: rgba(90, 140, 200, 0.25);
    border: 1px solid rgba(90, 140, 200, 0.6);
    color: #dbe9f8;
    border-radius: 5px;
    padding: 4px 14px;
    font-size: 12px;
    cursor: pointer;
  }

  .intro-ok:hover {
    background: rgba(90, 140, 200, 0.45);
  }

  .district-metadata {
    font-size: 11.5px;
    line-height: 1.5;
    color: rgba(255,255,255,0.85);
    /* inputHandler.renderDistrictMetadata generates inline-styled HTML.
       We just need a readable container with a sane default state. */
  }
  .district-metadata :global(b) { color: #fff; font-weight: 600; }
  .district-metadata :global(div) { padding: 1px 0; }
  .dm-placeholder {
    color: rgba(255,255,255,0.4);
    font-style: italic;
    font-size: 11px;
  }

  .fleet { font-size: 11.5px; }
  .fleet-source {
    margin: 0 0 10px;
    color: rgba(255,255,255,0.65);
    line-height: 1.5;
  }
  .fleet-source strong { color: #fff; }
  .fleet-block { margin-top: 8px; }
  .fleet-block > summary {
    cursor: pointer;
    padding: 4px 0;
    color: #90caf9;
    text-transform: uppercase;
    font-size: 10.5px;
    letter-spacing: 0.05em;
    list-style: none;
  }
  .fleet-block > summary::-webkit-details-marker { display: none; }
  .fleet-block > summary::before { content: '▸ '; font-size: 10px; }
  .fleet-block[open] > summary::before { content: '▾ '; }
  .fleet-tbl {
    width: 100%;
    border-collapse: collapse;
    margin-top: 6px;
    font-size: 11px;
  }
  .fleet-tbl th {
    text-align: left;
    color: rgba(255,255,255,0.5);
    font-weight: 500;
    padding: 4px 6px 4px 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .fleet-tbl td {
    padding: 3px 6px 3px 0;
    color: rgba(255,255,255,0.85);
    border-bottom: 1px dashed rgba(255,255,255,0.04);
  }
  .fleet-tbl td.sector-cell {
    color: rgba(255,255,255,0.55);
    font-size: 10px;
  }
  .fleet-tbl th.num, .fleet-tbl td.num {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  .empty {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px;
    font-size: 14px;
  }
  .empty code {
    color: #90caf9;
    background: rgba(33, 150, 243, 0.08);
    padding: 2px 6px;
    border-radius: 3px;
  }

  @media (max-width: 900px) {
    .dash {
      grid-template-columns: 1fr;
      grid-template-rows: 44px 1fr 120px;
    }
    .stage { grid-column: 1 / -1; grid-row: 2 / 3; }
    .meta {
      grid-column: 1 / -1;
      grid-row: 3 / 4;
      border-left: none;
      border-top: 1px solid rgba(255,255,255,0.08);
    }
  }
</style>
