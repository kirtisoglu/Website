<script>
  // The control buttons for a FalcomPlot. Designed to be hosted by the
  // page (e.g., embedded in a sidebar) so the canvas stays unobstructed.
  // Element IDs use the `fp-` prefix expected by mountFalcomPlot.
  export let showEnsembleSelect = true;
</script>

<div class="fpc">
  <div class="fpc-row fpc-buttons">
    <button id="fp-prevBtn" title="Previous frame">◀</button>
    <button id="fp-playBtn" title="Play">▶</button>
    <button id="fp-pauseBtn" title="Pause">⏸</button>
    <button id="fp-stopBtn" title="Stop / reset">⏹</button>
    <button id="fp-finalBtn" title="Jump to last step">⏭</button>
    <button id="fp-nextBtn" title="Next frame">▶|</button>
  </div>
  <div class="fpc-row">
    <button id="fp-toggleDetailBtn" class="fpc-wide-btn">Overview</button>
  </div>
  <div class="fpc-row fpc-row-inline">
    <label for="fp-speedSlider">Speed</label>
    <input type="range" id="fp-speedSlider" min="1" max="10" step="1" value="2" />
    <span id="fp-speedLabel">2x</span>
  </div>
  <div class="fpc-row fpc-row-inline">
    <label for="fp-iterationInput">Step</label>
    <input type="number" id="fp-iterationInput" min="0" value="0" />
    <button id="fp-goBtn">Go</button>
  </div>
  {#if showEnsembleSelect}
    <div class="fpc-row fpc-row-inline">
      <label for="fp-ensembleSelect">Overlay</label>
      <select id="fp-ensembleSelect">
        <option value="none">None</option>
        <option value="boundary">Boundary frequency</option>
        <option value="facility">Facility frequency</option>
        <option value="capacity">Capacity utilisation</option>
      </select>
    </div>
  {/if}
  <div class="fpc-mode">
    <div class="fpc-mode-label">Mode</div>
    <div class="fpc-mode-value"><span id="fp-currentViewMode">DETAILED</span></div>
    <div class="fpc-mode-aux"><span id="fp-currentColoringMode"></span></div>
  </div>
</div>

<style>
  .fpc {
    font-size: 12px;
    color: #fff;
  }

  .fpc :global(label) {
    color: #90caf9;
    font-size: 11px;
    font-weight: 500;
    margin-right: 6px;
  }

  .fpc :global(button) {
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
  .fpc :global(button:hover) { background: rgba(33, 150, 243, 0.55); }
  .fpc :global(button:active) { background: rgba(33, 150, 243, 0.85); }

  .fpc :global(input[type='number']),
  .fpc :global(select) {
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
    border: 1px solid rgba(33, 150, 243, 0.55);
    border-radius: 4px;
    padding: 3px 6px;
    font-size: 11px;
    flex: 1;
    min-width: 0;
  }
  .fpc :global(select option) {
    background: #0c1018;
    color: #fff;
  }

  .fpc :global(input[type='range']) {
    accent-color: #2196f3;
    flex: 1;
    min-width: 0;
  }

  .fpc-row { margin: 6px 0; display: flex; gap: 4px; flex-wrap: wrap; }
  .fpc-buttons :global(button) { padding: 4px 6px; flex: 0 0 auto; }
  .fpc-row-inline { align-items: center; }
  .fpc-wide-btn { width: 100%; }

  .fpc-mode {
    margin-top: 12px;
    padding: 8px 10px;
    background: rgba(33, 150, 243, 0.1);
    border-radius: 4px;
    border-left: 3px solid #2196f3;
  }
  .fpc-mode-label { font-size: 10px; font-weight: 600; color: #90caf9; }
  .fpc-mode-value { font-size: 12px; font-weight: 700; color: #fff; margin-top: 2px; }
  .fpc-mode-aux { font-size: 10px; color: #bbdefb; margin-top: 2px; }
</style>
