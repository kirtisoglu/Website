<script>
  import { fly, fade } from "svelte/transition";
  import Head from "../../../../components/Head.svelte";
</script>

<svelte:head>
  <title>UAV Routing — Alaittin Kirtisoglu</title>
  <meta name="description" content="UAV routing for maximum information collection under time windows and energy consumption, with an interactive replay of the search." />
</svelte:head>

<div class="page" in:fade={{ duration: 500, delay: 100 }}>

  <nav class="breadcrumb">
    <a href="/research/">Research</a>
    <span>›</span>
    <span>UAV Routing</span>
  </nav>

  <section class="intro" in:fly={{ y: 30, duration: 500, delay: 150 }}>
    <p class="eyebrow">Project</p>
    <h1>UAV Routing</h1>
    <p class="subtitle">Maximum Information Collection under Time Windows and Energy Consumption</p>
    <div class="meta-row">
      <span class="status-badge preparing">Preprint</span>
      <span class="coauthors">with Melis Boran &amp; Mustafa Tural</span>
    </div>
  </section>

  <div class="divider"></div>

  <section class="section" in:fly={{ y: 30, duration: 500, delay: 250 }}>
    <h2 class="section-title">Overview</h2>
    <p class="body-text">
      A fixed-wing UAV visits surveillance targets whose information value changes with
      the time of arrival, under hard time windows and a nonlinear propulsion-energy
      budget. The model chooses which targets to visit, in what order, the flight speed
      on every leg, and how long to loiter. The resulting mixed-integer nonlinear program
      is reformulated exactly as a mixed-integer second-order cone program through a chain
      of three rotated cones, and solved at scale by an iterated local search whose
      evaluation oracle is a small SOCP over a fixed route.
    </p>
  </section>

  <div class="divider"></div>

  <section class="section" in:fly={{ y: 30, duration: 500, delay: 350 }}>
    <h2 class="section-title">Search Replay</h2>
    <p class="body-text">
      An interactive replay of the matheuristic on the benchmark instances. It steps
      through every route the search accepts, showing the flown tour, the targets it has
      not scheduled, the candidate moves it weighed at each step with their selection
      probabilities, and the shake steps that pull it out of a local optimum. Pick an
      instance from the menu to replay it.
    </p>
    <a class="dashboard-btn" href="/research/uav-routing/animation/">Open Search Replay</a>
  </section>

  <div class="divider"></div>

  <section class="section" in:fly={{ y: 30, duration: 500, delay: 380 }}>
    <h2 class="section-title">Code</h2>
    <p class="body-text">
      The model, the matheuristic and the experiments are open source.
    </p>
    <a class="dashboard-btn" href="https://github.com/kirtisoglu/UAV-Routing" target="_blank" rel="noopener">View on GitHub</a>
  </section>

</div>

<Head/>

<style>
  .page {
    max-width: 780px;
    margin: 0 auto;
    padding: 2.5rem 2rem 5rem;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .breadcrumb {
    font-size: 0.8rem;
    color: #9ca3af;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 2rem;
  }

  .breadcrumb a {
    color: #4f46e5;
    text-decoration: none;
  }

  .breadcrumb a:hover { text-decoration: underline; }
  :global(.dark) .breadcrumb a { color: #818cf8; }
  :global(.dark) .breadcrumb { color: rgba(255,255,255,0.3); }

  .eyebrow {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #4f46e5;
    margin: 0 0 0.75rem;
  }

  :global(.dark) .eyebrow { color: #818cf8; }

  .intro h1 {
    font-size: clamp(1.8rem, 5vw, 2.6rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #111827;
    margin: 0 0 0.4rem;
    line-height: 1.15;
  }

  :global(.dark) .intro h1 { color: #f9fafb; }

  .subtitle {
    font-size: 1rem;
    color: #6b7280;
    margin: 0 0 1.25rem;
  }

  :global(.dark) .subtitle { color: rgba(255,255,255,0.45); }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .status-badge {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 0.18rem 0.55rem;
    border-radius: 99px;
  }

  .status-badge.preparing { background: #e0e7ff; color: #4338ca; }
  :global(.dark) .status-badge.preparing { background: rgba(67,56,202,0.15); color: #a5b4fc; }

  .coauthors {
    font-size: 0.85rem;
    color: #9ca3af;
  }

  :global(.dark) .coauthors { color: rgba(255,255,255,0.38); }

  .divider {
    height: 1px;
    background: rgba(0,0,0,0.07);
    margin: 2.5rem 0;
  }

  :global(.dark) .divider { background: rgba(255,255,255,0.07); }

  .section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .section-title {
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #4f46e5;
    margin: 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e0e7ff;
  }

  :global(.dark) .section-title {
    color: #818cf8;
    border-bottom-color: rgba(129,140,248,0.2);
  }

  .body-text {
    font-size: 0.95rem;
    line-height: 1.75;
    color: #374151;
    margin: 0;
  }

  :global(.dark) .body-text { color: rgba(255,255,255,0.7); }

  .dashboard-btn {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.6rem 1.25rem;
    background: #4f46e5;
    color: #fff;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.15s;
    align-self: flex-start;
  }

  .dashboard-btn:hover { background: #4338ca; }
  .dashboard-btn.coming { background: #e5e7eb; color: #9ca3af; cursor: default; }
  :global(.dark) .dashboard-btn.coming { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.3); }
  :global(.dark) .dashboard-btn { background: #6366f1; }
  :global(.dark) .dashboard-btn:hover { background: #818cf8; }

  .software-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .software-item {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .software-header {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    flex-wrap: wrap;
  }

  .software-name {
    font-family: monospace;
    font-size: 0.95rem;
    font-weight: 700;
    color: #111827;
  }

  :global(.dark) .software-name { color: #f9fafb; }

  .sw-badge {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.1rem 0.45rem;
    border-radius: 99px;
  }

  .sw-badge.pre { background: #fef9c3; color: #854d0e; }
  :global(.dark) .sw-badge.pre { background: rgba(133,77,14,0.15); color: #fde68a; }

  .software-desc {
    font-size: 0.92rem;
    line-height: 1.7;
    color: #374151;
    margin: 0;
  }

  :global(.dark) .software-desc { color: rgba(255,255,255,0.7); }

  /* ── Figures ── */
  .figure-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.7rem;
    align-items: start;
    max-width: 600px;
    margin: 0.25rem auto 0;
  }

  .gif-fig {
    margin: 0;
  }

  .gif-fig video {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: contain;
    display: block;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 6px;
    background: #fff;
  }

  :global(.dark) .gif-fig video { border-color: rgba(255,255,255,0.1); }

  @media (max-width: 640px) {
    .page { padding: 2rem 1.25rem 4rem; }
    .figure-row { grid-template-columns: 1fr; }
  }
</style>
