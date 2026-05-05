<script>
  import { onMount, onDestroy, tick } from 'svelte';

  // dataPath is the URL prefix where blocks.json, manifest.json,
  // step_NNNN.json, ensemble.json live. Required.
  export let dataPath;
  // showEnsembleSelect — render the ensemble-overlay dropdown. Default true.
  export let showEnsembleSelect = true;
  // showStatusLog — render the rolling status log inside the sidebar. Default false (less visual noise).
  export let showStatusLog = false;

  let canvas;
  let controlsEl;
  let sidebarEl;
  let statusEl;
  let treeMetaEl;
  let tooltipEl;

  let cleanup = () => {};
  let mounted = false;
  let mountErr = null;

  async function remount() {
    cleanup();
    cleanup = () => {};
    if (!dataPath) return;
    if (!canvas) await tick();
    try {
      const { mountFalcomPlot } = await import('./mountFalcomPlot.js');
      cleanup = await mountFalcomPlot({
        canvas,
        controlsEl,
        sidebarEl,
        statusEl,
        treeMetaEl,
        tooltipEl,
        dataPath,
      });
      mounted = true;
      mountErr = null;
    } catch (err) {
      mountErr = err.message || String(err);
      console.error('FalcomPlot mount failed:', err);
    }
  }

  onMount(remount);
  onDestroy(() => cleanup());

  // Re-mount whenever dataPath changes
  $: if (mounted && dataPath) {
    // tick() makes sure DOM is ready; remount tears down + re-inits
    remount();
  }
</script>

<div class="fp-root">
  <canvas bind:this={canvas} class="fp-canvas"></canvas>

  <!-- Control panel: bottom-right -->
  <div class="fp-controls" bind:this={controlsEl}>
    <div class="fp-row fp-buttons">
      <button id="fp-prevBtn" title="Previous frame">◀</button>
      <button id="fp-playBtn" title="Play">▶</button>
      <button id="fp-pauseBtn" title="Pause">⏸</button>
      <button id="fp-stopBtn" title="Stop / reset">⏹</button>
      <button id="fp-finalBtn" title="Jump to last step">⏭</button>
      <button id="fp-nextBtn" title="Next frame">▶|</button>
    </div>
    <div class="fp-row">
      <button id="fp-toggleDetailBtn" class="fp-wide-btn">Overview</button>
    </div>
    <div class="fp-row fp-row-inline">
      <label for="fp-speedSlider">Speed</label>
      <input type="range" id="fp-speedSlider" min="0.5" max="3" step="0.5" value="1" />
      <span id="fp-speedLabel">1x</span>
    </div>
    <div class="fp-row fp-row-inline">
      <label for="fp-iterationInput">Step</label>
      <input type="number" id="fp-iterationInput" min="0" value="0" />
      <button id="fp-goBtn">Go</button>
    </div>
    {#if showEnsembleSelect}
      <div class="fp-row fp-row-inline">
        <label for="fp-ensembleSelect">Overlay</label>
        <select id="fp-ensembleSelect">
          <option value="none">None</option>
          <option value="boundary">Boundary frequency</option>
          <option value="facility">Facility frequency</option>
          <option value="capacity">Capacity utilisation</option>
        </select>
      </div>
    {/if}
    <div class="fp-mode">
      <div class="fp-mode-label">Mode</div>
      <div class="fp-mode-value"><span id="fp-currentViewMode">DETAILED</span></div>
      <div class="fp-mode-aux"><span id="fp-currentColoringMode"></span></div>
    </div>
  </div>

  <!-- Sidebar: top-right -->
  <aside class="fp-sidebar" bind:this={sidebarEl}>
    <h2>Animation</h2>
    <div class="fp-section">
      <h3>Tree metadata</h3>
      <div bind:this={treeMetaEl} id="treeMetadata" class="fp-meta"></div>
    </div>
    {#if showStatusLog}
      <div class="fp-section">
        <h3>Log</h3>
        <div bind:this={statusEl} id="statusPanel" class="fp-status"></div>
      </div>
    {/if}
  </aside>

  <div class="fp-tooltip" bind:this={tooltipEl}></div>

  {#if mountErr}
    <div class="fp-error">Failed to load: {mountErr}</div>
  {/if}
</div>

<style>
  .fp-root {
    position: relative;
    width: 100%;
    height: 100%;
    background: #000;
    overflow: hidden;
    border-radius: 8px;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  }

  .fp-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    background: #000;
  }

  .fp-controls {
    position: absolute;
    bottom: 16px;
    right: 16px;
    width: 260px;
    background: rgba(10, 14, 23, 0.85);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(33, 150, 243, 0.55);
    padding: 12px 14px;
    border-radius: 8px;
    z-index: 1000;
    font-size: 12px;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.45);
  }

  .fp-controls :global(label) {
    color: #90caf9;
    font-size: 11px;
    font-weight: 500;
    margin-right: 6px;
  }

  .fp-controls :global(button) {
    padding: 5px 10px;
    background: rgba(33, 150, 243, 0.22);
    color: #fff;
    border: 1px solid rgba(33, 150, 243, 0.65);
    border-radius: 4px;
    cursor: pointer;
    font-size: 11px;
    font-weight: 500;
    transition: background 120ms;
  }
  .fp-controls :global(button:hover) { background: rgba(33, 150, 243, 0.55); }
  .fp-controls :global(button:active) { background: rgba(33, 150, 243, 0.85); }

  .fp-controls :global(input[type='number']),
  .fp-controls :global(select) {
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
    border: 1px solid rgba(33, 150, 243, 0.55);
    border-radius: 4px;
    padding: 3px 6px;
    font-size: 11px;
    flex: 1;
  }

  .fp-controls :global(input[type='range']) {
    accent-color: #2196f3;
    flex: 1;
  }

  .fp-row { margin: 6px 0; display: flex; gap: 4px; flex-wrap: wrap; }
  .fp-buttons :global(button) { padding: 4px 6px; flex: 0 0 auto; }
  .fp-row-inline { align-items: center; }
  .fp-wide-btn { width: 100%; }

  .fp-mode {
    margin-top: 12px;
    padding: 8px 10px;
    background: rgba(33, 150, 243, 0.1);
    border-radius: 4px;
    border-left: 3px solid #2196f3;
  }
  .fp-mode-label { font-size: 10px; font-weight: 600; color: #90caf9; }
  .fp-mode-value { font-size: 12px; font-weight: 700; color: #fff; margin-top: 2px; }
  .fp-mode-aux { font-size: 10px; color: #bbdefb; margin-top: 2px; }

  .fp-sidebar {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 240px;
    max-height: calc(100% - 32px);
    background: rgba(10, 14, 23, 0.85);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(33, 150, 243, 0.55);
    border-radius: 8px;
    padding: 12px 14px;
    z-index: 999;
    overflow-y: auto;
    color: #fff;
    font-size: 12px;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.45);
  }

  .fp-sidebar h2 {
    margin: 0 0 8px 0;
    font-size: 13px;
    font-weight: 700;
    border-bottom: 1px solid rgba(33, 150, 243, 0.55);
    padding-bottom: 4px;
    color: #fff;
  }

  .fp-section { margin-top: 10px; }
  .fp-section h3 {
    font-size: 10px;
    font-weight: 600;
    color: #90caf9;
    margin: 0 0 6px 0;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .fp-meta :global(.fp-kv) {
    margin: 3px 0;
    font-size: 11px;
    word-break: break-word;
  }
  .fp-meta :global(.fp-kv b) { color: #90caf9; font-weight: 600; }
  .fp-meta :global(.fp-kv span) { color: #fff; }
  .fp-meta :global(hr) { border: none; border-top: 1px solid rgba(255,255,255,0.12); margin: 6px 0; }
  .fp-meta :global(.fp-phase-label) {
    font-size: 13px;
    font-weight: 700;
    color: #2196f3;
    margin-bottom: 6px;
  }
  .fp-meta :global(.fp-section-label) { font-size: 10px; color: #90caf9; margin-top: 4px; }
  .fp-meta :global(.fp-accept) { margin: 6px 0; font-size: 12px; font-weight: 700; }
  .fp-meta :global(.fp-accepted) { color: #66bb6a; }
  .fp-meta :global(.fp-rejected) { color: #ef5350; }
  .fp-meta :global(.fp-no-data) {
    color: #888;
    font-style: italic;
    font-size: 11px;
  }

  .fp-status {
    font-size: 10px;
    line-height: 1.4;
    max-height: 140px;
    overflow-y: auto;
    color: #ccc;
  }
  .fp-status :global(.log-info) { color: #ccc; }
  .fp-status :global(.log-warn) { color: #fc0; }
  .fp-status :global(.log-error) { color: #f33; font-weight: 700; }
  .fp-status :global(.log-success) { color: #6f6; }

  .fp-tooltip {
    position: absolute;
    background: rgba(255, 255, 255, 0.97);
    color: #111;
    border: 1px solid rgba(0,0,0,0.2);
    padding: 6px 8px;
    font-size: 11px;
    pointer-events: none;
    display: none;
    z-index: 1100;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  }

  .fp-error {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff7676;
    font-size: 14px;
    background: rgba(0,0,0,0.85);
    padding: 24px;
    text-align: center;
  }

  /* Scrollbar styling */
  .fp-sidebar::-webkit-scrollbar,
  .fp-controls::-webkit-scrollbar { width: 6px; }
  .fp-sidebar::-webkit-scrollbar-thumb,
  .fp-controls::-webkit-scrollbar-thumb {
    background: rgba(33, 150, 243, 0.55);
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    .fp-controls { width: 200px; bottom: 8px; right: 8px; padding: 8px 10px; }
    .fp-sidebar { width: 200px; top: 8px; left: 8px; padding: 8px 10px; }
  }
</style>
