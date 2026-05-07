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

  $: dataPath = selectedId ? `/falcomplot/${selectedId}` : null;
  $: selected = datasets.find((d) => d.id === selectedId) || null;

  onMount(async () => {
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
    {#if dataPath}
      {#key dataPath}
        <FalcomPlot
          {dataPath}
          showEnsembleSelect={false}
          showStatusLog={false}
          externalControlsEl={controlsEl}
        />
      {/key}
    {:else if loadErr}
      <div class="empty err">
        Could not load datasets index.<br/>
        <code>/falcomplot/datasets.json</code> is missing or unreadable.
      </div>
    {:else}
      <div class="empty muted">Initialising…</div>
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
      <section class="meta-section">
        <h3 class="meta-title">Dataset</h3>
        <div class="meta-row">
          <span class="k">Steps</span>
          <span class="v">{selected.total_steps}</span>
        </div>
        <div class="meta-row">
          <span class="k">Nodes</span>
          <span class="v">{selected.graph_nodes}</span>
        </div>
        <p class="desc">{selected.description}</p>
      </section>
    {/if}
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
