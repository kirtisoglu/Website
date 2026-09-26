<script>
  /**
   * ILS search replay for the UAV routing paper.
   *
   * One viewer, many instances: the dataset list comes from
   * /data/uav-routing/index.json and each instance's frames are fetched on
   * demand from /data/uav-routing/<id>/data.json, so switching costs one file
   * rather than shipping all fourteen up front.
   */
  import { onMount, onDestroy } from 'svelte';
  import { createViewer } from '$lib/uav/viewer.js';

  let root;            // the element the viewer draws into
  let viewer = null;
  let list = [];       // [{ id, name }]
  let selected = '';
  let error = '';
  let loading = true;
  let tab = 'event';   // which rail card is shown on a narrow screen

  const BASE = '/data/uav-routing';

  async function choose() {
    if (!selected || !viewer) return;
    loading = true; error = '';
    try {
      const r = await fetch(`${BASE}/${selected}/data.json`);
      if (!r.ok) throw new Error(`${selected}: ${r.status}`);
      viewer.load(await r.json());
      const u = new URL(location.href);
      u.searchParams.set('instance', selected);
      history.replaceState(null, '', u);        // deep-linkable
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    viewer = createViewer(root);
    try {
      const r = await fetch(`${BASE}/index.json`);
      if (!r.ok) throw new Error(`index: ${r.status}`);
      list = await r.json();
      const want = new URLSearchParams(location.search).get('instance');
      selected = list.some((d) => d.id === want) ? want : list[0]?.id;
      await choose();
    } catch (e) {
      error = e.message; loading = false;
    }
  });

  onDestroy(() => viewer?.destroy());
</script>

<div class="uav-viewer" bind:this={root}>
  <div class="wrap">
    <header class="bar">
      <div>
        <span class="eyebrow">Iterated local search replay</span>
        <h1 id="title">&nbsp;<span class="sub" id="subtitle"></span></h1>
      </div>
      <div class="pick">
          <label for="instance">Instance</label>
          <select id="instance" bind:value={selected} on:change={choose} disabled={!list.length}>
            {#each list as d}<option value={d.id}>{d.name}</option>{/each}
          </select>
        </div>
        <dl class="stats" id="stats"></dl>
    </header>

    <main>
      <section class="stage">
        <canvas id="map"></canvas>
        <div class="hint" id="hint">frame 1</div>
        <div class="tip" id="tip" hidden></div>
        <div class="legend">
          <span class="key"><i style="background:var(--insert)"></i>Insert</span>
          <span class="key"><i style="background:var(--replace)"></i>Replace</span>
          <span class="key"><i style="background:var(--swap)"></i>Swap</span>
          <span class="key"><i style="background:var(--twoopt)"></i>2-opt</span>
          <span class="key"><i style="background:var(--shake)"></i>Shake</span>
          <span class="key"><i style="background:var(--ghost)"></i>Rejected proposal</span>
          <span class="scale" id="winScale" style="visibility:hidden"><i></i>window opens early &rarr; late</span>
        </div>
      </section>

      <aside class="rail" data-tab={tab}>
        <div class="tabs" role="tablist">
          <button role="tab" class:on={tab === 'event'} aria-selected={tab === 'event'}
                  on:click={() => (tab = 'event')}>Event</button>
          <button role="tab" class:on={tab === 'route'} aria-selected={tab === 'route'}
                  on:click={() => (tab = 'route')}>Route</button>
          <button role="tab" class:on={tab === 'cands'} aria-selected={tab === 'cands'}
                  on:click={() => (tab = 'cands')}>Candidates</button>
        </div>
        <div class="card" data-pane="event">
          <h2>Event</h2>
          <div class="verdict" id="verdict"><span class="dot"></span><span id="vtext">—</span></div>
          <div class="kv" id="ev"></div>
        </div>
        <div class="card" data-pane="route">
          <h2>Route in visit order</h2>
          <div class="seq" id="seq"></div>
        </div>
        <div class="card grow" data-pane="cands">
          <h2>Candidate set at this step <em id="candsNote"></em></h2>
          <div class="cands" id="cands"></div>
        </div>
      </aside>

  <div class="sotabs">
    <button class="sotab" id="tabStats" aria-expanded="false" on:click={() => viewer?.openPanel("stats")}>&#9664; Statistics</button>
    <button class="sotab" id="tabWins"  aria-expanded="false" on:click={() => viewer?.openPanel("windows")}>&#9664; Windows</button>
  </div>
  <section class="slideover" id="soStats" aria-hidden="true">
    <button class="soclose" data-close="soStats" on:click={() => viewer?.closePanel("soStats")}>&times;</button>
    <h3>Run statistics</h3>
    <p class="sub" id="statsSub"></p>
    <div id="statsBody"></div>
  </section>
  <section class="slideover wide" id="soWins" aria-hidden="true">
    <button class="soclose" data-close="soWins" on:click={() => viewer?.closePanel("soWins")}>&times;</button>
    <h3>Realized windows</h3>
    <p class="sub">Grey, the time window [eᵢ, ℓᵢ]; colour, the realized window [aᵢ<sup>min</sup>, aᵢ<sup>max</sup>], blue where the slope is positive and orange where it is negative; the red dot is the arrival. The number at the right is the least and the most information the target can give over its <strong>time window</strong>, not over its realized window. The left figure follows the route in the search display; the right is the best route of the run.</p>
    <div class="wins">
      <figure><figcaption id="capNow"></figcaption><canvas id="cvNow"></canvas>
        <div class="winnav"><button id="winNext">Next local optimum</button><span id="winPos"></span></div></figure>
      <figure><figcaption id="capBest"></figcaption><canvas id="cvBest"></canvas></figure>
    </div>
  </section>
  
      <section class="timeline">
      <canvas id="tl" tabindex="0" aria-label="Objective over wall-clock time; click or drag to scrub"></canvas>
      <div class="transport">
        <button class="primary" id="play">Play</button>
        <button id="prev">Back</button>
        <button id="next">Forward</button>
        <button id="tobest">Jump to best</button>
        <select id="speed" aria-label="Playback speed">
          <option value="1">1&times;</option>
          <option value="3" selected>3&times;</option>
          <option value="8">8&times;</option>
          <option value="20">20&times;</option>
        </select>
        <span class="pos" id="pos">—</span>
        <div class="toggles">
          <label><input type="checkbox" id="tProp" checked> rejected proposals</label>
          <label><input type="checkbox" id="tWin"> time windows</label>
          <label>labels
            <select id="tIds">
              <option value="off" selected>none</option>
              <option value="order">visit order</option>
              <option value="id">target id</option>
            </select></label>
        </div>
      </div>
      </section>
    </main>

  </div>
  {#if loading}<div class="overlay">loading…</div>{/if}
  {#if error}<div class="overlay err">could not load — {error}</div>{/if}
</div>

<style>

/* ---- slide-over panels, opened by the arrows on the right edge ---- */
.sotabs{position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:30;
        display:flex;flex-direction:column;gap:6px}
.sotab{writing-mode:vertical-rl;padding:20px 11px;font-size:12.5px;letter-spacing:.12em;
       text-transform:uppercase;font-weight:600;color:var(--muted);cursor:pointer;
       background:var(--panel);border:1px solid var(--line);border-right:0;
       border-radius:10px 0 0 10px;box-shadow:-4px 0 14px rgba(0,0,0,.10)}
.sotab:hover{color:var(--ink)}
.sotab:global([aria-expanded="true"]){color:var(--ink);background:var(--panel-2)}
.slideover{position:fixed;top:0;right:0;height:100%;z-index:31;overflow:auto;
           background:var(--panel);border-left:1px solid var(--line);
           box-shadow:-18px 0 40px rgba(0,0,0,.18);padding:18px 20px;
           transform:translateX(100%);transition:transform .22s ease;
           width:min(560px,94vw)}
.slideover.wide{width:min(1100px,96vw)}
.slideover:global(.open){transform:translateX(0)}
.slideover h3{margin:0 0 2px;font-size:14px}
.slideover .sub{margin:0 0 14px;font-size:11.5px;color:var(--muted)}
.soclose{position:absolute;top:12px;right:14px;border:0;background:none;
         font-size:18px;line-height:1;color:var(--muted);cursor:pointer}
:global(.sgrid){display:grid;grid-template-columns:1fr 1fr;gap:10px 18px;margin-bottom:16px}
:global(.sgrid .k){font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
:global(.sgrid .v){font-family:var(--mono);font-size:14px}
:global(.stab){width:100%;border-collapse:collapse;font-size:12px;margin-bottom:14px}
:global(.stab th),:global(.stab td){padding:4px 6px;text-align:right;border-bottom:1px solid var(--line)}
:global(.stab th:first-child),:global(.stab td:first-child){text-align:left}
:global(.stab th){font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:600}
:global(.stab td){font-family:var(--mono)}
.wins{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.wins figure{margin:0}
.winnav{display:flex;align-items:center;gap:10px;margin-top:8px}
#winPos{font-family:var(--mono);font-size:11px;color:var(--muted)}
.wins figcaption{font-size:11.5px;color:var(--muted);margin-bottom:6px}
.wins canvas{width:100%;border:1px solid var(--line);border-radius:8px;background:var(--panel-2)}
@media(max-width:900px){.wins{grid-template-columns:1fr}}


.uav-viewer{
  --bg:#EEF1F5; --panel:#FFFFFF; --panel-2:#F7F9FB; --ink:#0F151C; --muted:#5E6A78;
  --line:#D5DCE5; --line-soft:#E6EBF1; --grid:#DCE3EA;
  --insert:#1F8F5F; --replace:#C4760F; --swap:#7A4FD0; --twoopt:#1E6FBE; --shake:#C93B2C;
  --ghost:#96A3B2; --best:#0F151C; --unsched:#B9C4D0;
  --radius:9px;
  --mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
  --sans:"Archivo","Helvetica Neue",Arial,sans-serif;
}
@media (prefers-color-scheme:dark){
  .uav-viewer:not([data-theme="light"]){
    --bg:#0C1116; --panel:#141B23; --panel-2:#1A222B; --ink:#E4EAF1; --muted:#8B98A8;
    --line:#26313C; --line-soft:#1E2831; --grid:#202A34;
    --insert:#3BBE85; --replace:#E39B36; --swap:#A985F0; --twoopt:#4E9DE8; --shake:#E4604F;
    --ghost:#5A6775; --best:#E4EAF1; --unsched:#404C58;
  }
}
:global([data-theme="dark"]) .uav-viewer{
  --bg:#0C1116; --panel:#141B23; --panel-2:#1A222B; --ink:#E4EAF1; --muted:#8B98A8;
  --line:#26313C; --line-soft:#1E2831; --grid:#202A34;
  --insert:#3BBE85; --replace:#E39B36; --swap:#A985F0; --twoopt:#4E9DE8; --shake:#E4604F;
  --ghost:#5A6775; --best:#E4EAF1; --unsched:#404C58;
}
.uav-viewer :global(*){box-sizing:border-box}
.uav-viewer{background:var(--bg);color:var(--ink);font-family:var(--sans);
     font-size:14px;line-height:1.45;-webkit-font-smoothing:antialiased;
     height:100dvh;display:flex;flex-direction:column;overflow:hidden}
.wrap{padding-inline:20px;padding-block:14px 16px;max-width:1440px;margin:0 auto;
      display:flex;flex-direction:column;gap:12px;
      flex:1 1 auto;min-height:0;width:100%}

header.bar{display:flex;flex-wrap:wrap;align-items:flex-end;gap:18px 28px;
           border-bottom:1px solid var(--line);padding-bottom:14px}
.eyebrow{display:block;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;
         color:var(--muted);font-weight:600}
h1{margin:2px 0 0;font-size:25px;font-weight:700;letter-spacing:-.015em;text-wrap:balance}
h1 .sub{font-weight:400;color:var(--muted);font-size:15px;margin-left:8px}
.stats{display:flex;gap:6px 22px;margin:0 0 0 auto;flex-wrap:nowrap}
:global(.stat){display:flex;flex-direction:column;gap:1px}
:global(.stat dt){font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:600}
:global(.stat){min-width:74px}
:global(.stat dd){margin:0;font-family:var(--mono);font-size:15px;font-weight:500;
         font-variant-numeric:tabular-nums;white-space:nowrap}

main{display:grid;grid-template-columns:minmax(0,1fr) 316px;gap:14px;align-items:stretch;
     grid-template-rows:minmax(0,1fr) auto;flex:1 1 auto;min-height:0}
.rail{grid-column:2;grid-row:1 / span 2;align-self:stretch;min-height:0;overflow-y:auto}
.stage{position:relative;background:var(--panel);border:1px solid var(--line);
       border-radius:var(--radius);overflow:hidden;min-height:0;height:100%}
#map{position:absolute;inset:0;width:100%;height:100%;display:block}
.legend{position:absolute;left:12px;bottom:11px;display:flex;flex-wrap:wrap;gap:5px 13px;
        max-width:calc(100% - 24px);
        font-size:11px;color:var(--muted);background:color-mix(in srgb,var(--panel) 86%,transparent);
        padding:6px 9px;border-radius:6px;border:1px solid var(--line-soft)}
.key{display:inline-flex;align-items:center;gap:5px}
.key i{width:13px;height:3px;border-radius:2px;display:inline-block}
.hint{position:absolute;right:12px;top:11px;font-size:11px;color:var(--muted);
      font-family:var(--mono)}
.tip{position:absolute;pointer-events:none;z-index:5;background:var(--panel);
     border:1px solid var(--line);border-radius:7px;padding:8px 10px;
     box-shadow:0 6px 18px rgb(0 0 0 / .16);min-width:172px;max-width:232px}
:global(.tip h3){margin:0 0 5px;font-size:12.5px;font-weight:600;display:flex;
        justify-content:space-between;gap:10px;align-items:baseline}
:global(.tip h3 em){font-style:normal;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;
           color:var(--muted);font-weight:600}
:global(.tip dl){display:grid;grid-template-columns:auto 1fr;gap:2px 10px;margin:0;
        font-family:var(--mono);font-size:11.5px;font-variant-numeric:tabular-nums}
:global(.tip dt){color:var(--muted)} :global(.tip dd){margin:0;text-align:right}
:global(.tip .warn){color:var(--shake)}
.scale{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--muted)}
.scale i{width:56px;height:8px;border-radius:4px;display:inline-block;
  background:linear-gradient(90deg,hsl(210 62% 48%),hsl(135 62% 48%),hsl(60 62% 48%))}

.rail{display:flex;flex-direction:column;gap:12px;min-width:0;min-height:0;
      height:100%}
.rail .card{flex:0 0 auto}
.rail .card.grow{flex:1 1 auto;min-height:190px;display:flex;flex-direction:column}
.card{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);padding:13px 14px}
.card h2{margin:0 0 9px;display:flex;align-items:baseline;justify-content:space-between;
         gap:8px;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;
         color:var(--muted);font-weight:600}
.verdict{display:flex;align-items:center;gap:6px;font-weight:600;font-size:15px;
         white-space:nowrap;overflow:hidden}
.verdict #vtext{overflow:hidden;text-overflow:ellipsis}
.verdict .dot{width:9px;height:9px;border-radius:50%}
.kv{display:grid;grid-template-columns:auto 1fr;gap:3px 12px;margin-top:9px;
    font-family:var(--mono);font-size:12.5px;font-variant-numeric:tabular-nums;
    white-space:nowrap}
:global(.kv span:nth-child(odd)){color:var(--muted)}
:global(.kv span:nth-child(even)){text-align:right}
:global(.delta.up){color:var(--insert)} :global(.delta.down){color:var(--shake)}

.cands{flex:1 1 auto;min-height:0;overflow-y:auto;overflow-x:hidden;margin:0 -4px;padding:0 4px;
       scrollbar-gutter:stable}
.seq{font-family:var(--mono);font-size:11.5px;line-height:1.7;height:clamp(54px,11vh,96px);overflow-y:auto;
     color:var(--muted);word-break:break-word}
:global(.seq b){color:var(--ink);font-weight:600}
h2 em{font-style:normal;font-weight:400;font-size:11px;color:var(--muted);
      text-transform:none;letter-spacing:0;white-space:nowrap;flex:0 0 auto}
:global(.cand){display:grid;grid-template-columns:52px 1fr 60px;align-items:center;gap:8px;
      height:19px;font-family:var(--mono);font-size:12px;font-variant-numeric:tabular-nums;
      white-space:nowrap;overflow:hidden}
:global(.cand .id){color:var(--muted)}
:global(.cand .bar){height:6px;border-radius:3px;background:var(--line-soft);overflow:hidden}
:global(.cand .bar i){display:block;height:100%;border-radius:3px}
:global(.cand .w){text-align:right}
:global(.cand.chosen){font-weight:600}
:global(.cand.chosen .id){color:var(--ink)}
:global(.empty){color:var(--muted);font-family:var(--mono);font-size:12px}

.timeline{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);
          padding:11px 14px 12px;grid-column:1;min-width:0}
#tl{display:block;width:100%;height:112px;cursor:crosshair}
.transport{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;margin-top:10px;min-height:33px;
           padding-top:10px;border-top:1px solid var(--line-soft)}
button,select{font-family:var(--sans);font-size:13px;color:var(--ink);background:var(--panel-2);
       border:1px solid var(--line);border-radius:6px;padding:5px 11px;cursor:pointer}
button:hover,select:hover{border-color:var(--muted)}
button:focus-visible,select:focus-visible,#tl:focus-visible{outline:2px solid var(--twoopt);outline-offset:2px}
button.primary{background:var(--ink);color:var(--panel);border-color:var(--ink);min-width:78px;font-weight:600}
.toggles{display:flex;flex-wrap:wrap;gap:6px 14px;margin-left:auto;font-size:12.5px;color:var(--muted)}
.toggles label{display:inline-flex;align-items:center;gap:6px;cursor:pointer}
.pos{font-family:var(--mono);font-size:12.5px;color:var(--muted);font-variant-numeric:tabular-nums;
     min-width:188px;white-space:nowrap}
.tabs{display:none}

@media (max-width:900px){
  /* One column, and the page scrolls: fitting a stacked stage, timeline and
     rail into one viewport would clip them, so the desktop height lock is
     released here and 100dvh becomes a floor rather than a cap. */
  .uav-viewer{height:auto;min-height:100dvh;overflow:visible}
  .wrap{min-height:0;flex:0 0 auto;padding-block:12px 20px}
  main{grid-template-columns:minmax(0,1fr);grid-template-rows:auto;
       flex:0 0 auto;min-height:0}
  .timeline,.rail{grid-column:1}
  .rail{grid-row:auto;height:auto;min-height:0;overflow:visible}
  .rail .card.grow{min-height:0}
  .cands{max-height:300px}
  .stage{min-height:340px;height:auto;aspect-ratio:1/1}
  .stats{margin-left:0}
  /* The three rail cards become one tabbed pane: stacking them makes the page
     three screens long and buries the controls. */
  .tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:2px}
  .tabs button{font:inherit;font-size:12px;padding:9px 6px;border-radius:8px;
    border:1px solid var(--line);background:var(--panel);color:var(--muted);min-height:40px}
  .tabs button.on{background:var(--panel-2);color:var(--ink);border-color:var(--ghost);font-weight:600}
  .rail[data-tab="event"] .card[data-pane]:not([data-pane="event"]),
  .rail[data-tab="route"] .card[data-pane]:not([data-pane="route"]),
  .rail[data-tab="cands"] .card[data-pane]:not([data-pane="cands"]){display:none}
  .seq{height:auto;max-height:42vh}
  .cands{max-height:52vh}
  /* the run summary is seven figures: let it scroll rather than stack */
  .stats{display:flex;flex-wrap:nowrap;overflow-x:auto;gap:14px;
    scrollbar-width:none;padding-bottom:2px;width:100%}
  .stats::-webkit-scrollbar{display:none}
  :global(.stat){flex:0 0 auto}
  /* touch targets: the transport row is the one thing a thumb must hit */
  .transport{flex-wrap:wrap;row-gap:8px}
  .transport button,.transport select{min-height:40px}
  .toggles{width:100%;flex-wrap:wrap;row-gap:6px}
  .bar{flex-wrap:wrap;row-gap:8px}
  .pick{padding-left:0;margin-right:0;width:100%}
  .pick select{flex:1 1 auto;min-width:0}
}
@media (prefers-reduced-motion:reduce){.uav-viewer :global(*){animation:none!important;transition:none!important}}

/* the dropdown, and a cover while a dataset is in flight */
.pick{display:flex;align-items:center;gap:8px;margin-right:auto;padding-left:18px}
.pick label{font-size:11px;letter-spacing:.09em;text-transform:uppercase;color:var(--muted)}
.pick select{font:inherit;font-size:12.5px;padding:4px 8px;border-radius:7px;
  border:1px solid var(--line);background:var(--panel);color:var(--ink)}
.overlay{position:absolute;inset:0;display:grid;place-items:center;z-index:9;
  background:color-mix(in srgb, var(--bg) 78%, transparent);
  font-family:var(--mono);font-size:13px;color:var(--muted)}
.overlay.err{color:var(--shake)}
.uav-viewer{position:relative}
</style>
