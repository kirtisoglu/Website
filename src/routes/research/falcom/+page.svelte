<script>
  import { fly, fade } from "svelte/transition";
  import Head from "../../../components/Head.svelte";
</script>

<svelte:head>
  <title>FalCom — Alaittin Kirtisoglu</title>
  <meta name="description" content="FalCom — a sampling method for districting and hierarchical facility location, with an interactive visualizer." />
</svelte:head>

<div class="page" in:fade={{ duration: 500, delay: 100 }}>

  <nav class="breadcrumb">
    <a href="/research/">Research</a>
    <span>›</span>
    <span>FalCom</span>
  </nav>

  <section class="intro" in:fly={{ y: 30, duration: 500, delay: 150 }}>
    <p class="eyebrow">Project</p>
    <h1>FalCom</h1>
    <p class="subtitle">A Sampling Method for Districting and Hierarchical Facility Location</p>
    <div class="meta-row">
      <span class="status-badge preparing">In Preparation</span>
      <span class="coauthors">with Hemanshu Kaul</span>
    </div>
  </section>

  <div class="divider"></div>

  <section class="section" in:fly={{ y: 30, duration: 500, delay: 250 }}>
    <h2 class="section-title">About</h2>
    <p class="body-text">
      <!-- Replace this with your real abstract/description -->
      FalCom introduces a Markov chain Monte Carlo sampling method for solving districting
      and hierarchical facility location problems. The algorithm generates diverse,
      near-optimal solutions by exploring the combinatorial space of feasible districting
      plans, enabling rigorous statistical analysis of solution quality and fairness properties.
    </p>

    <div class="figure-pair">
      <figure class="gif-fig">
        <img src="/falcom-gif/falcom_grid400.gif" loading="lazy"
             alt="FalCom Markov chain animating district boundaries on the grid_400 benchmark — coloured cell-map view with facility 1-medians shown as stars." />
        <figcaption>
          The FalCom chain on the grid_400 benchmark — cell-map view. Colours are
          level-1 districts; stars mark each district's demand-weighted 1-median.
        </figcaption>
      </figure>
      <figure class="gif-fig">
        <img src="/falcom-gif/falcom_grid400_graph.gif" loading="lazy"
             alt="The same FalCom chain shown as the dual graph — nodes coloured by district with bold district boundaries." />
        <figcaption>
          The same chain on the dual graph G¹ — nodes coloured by district, with the
          single recut region ringed at each step.
        </figcaption>
      </figure>
    </div>

    <figure class="gif-fig">
      <img src="/falcom-gif/falcom_tree_cut.gif" loading="lazy"
           alt="Capacitated recursive tree-cut — a spanning tree peeled into balanced districts one subtree at a time." />
      <figcaption>
        Capacitated recursive tree-cut — the seeding step. A spanning tree is peeled
        into districts whose demand lands within the capacity band (red dashed = the
        removed edge).
      </figcaption>
    </figure>
  </section>

  <div class="divider"></div>

  <section class="section" in:fly={{ y: 30, duration: 500, delay: 320 }}>
    <h2 class="section-title">Software</h2>
    <div class="software-list">

      <div class="software-item">
        <div class="software-header">
          <span class="software-name">falcomchain</span>
          <span class="sw-badge pre">Pre-publication</span>
        </div>
        <p class="software-desc">
          A Python library implementing a hierarchical and capacitated ReCom algorithm that simultaneously partitions a dual graph into hierarchical service districts, locates facilities within districts, and allocates expert teams to facilities — while satisfying capacity-demand balance and user-choice constraints such as budget.
        </p>
      </div>

      <div class="software-item">
        <div class="software-header">
          <span class="software-name">falcomplot</span>
          <span class="sw-badge pre">Pre-publication</span>
        </div>
        <p class="software-desc">
          A Python library providing a wide range of plotting functions to analyze <em>falcomchain</em> inputs and outputs.
        </p>
      </div>

    </div>
  </section>

  <div class="divider"></div>

  <section class="section" in:fly={{ y: 30, duration: 500, delay: 350 }}>
    <h2 class="section-title">Interactive Visualizer</h2>
    <p class="body-text">
      The FalCom Visualizer animates the Markov chain sampling process, showing how the
      algorithm traverses the solution space, the evolution of district boundaries, and
      convergence behavior in real time.
    </p>
    <a class="dashboard-btn" href="/research/falcom/dashboard/">Open Visualizer</a>
  </section>

  <div class="divider"></div>

  <section class="section" in:fly={{ y: 30, duration: 500, delay: 380 }}>
    <h2 class="section-title">Case Study — London Ambulance Service</h2>
    <p class="body-text">
      An interactive map of the LAS three-level operational hierarchy on which we run
      FalCom: 5 sectors (per-sector colour palettes), 19 groups (light-to-dark tones
      within each sector), 63 ambulance-station candidates, and 7 super-facility
      candidates (sector HQs and emergency operations centres). The base graph is
      Greater London at the LSOA scale (5,042 polygons). Both sector and group
      boundaries are derived by Voronoi-by-station and repaired to contiguity.
    </p>
    <a class="dashboard-btn" href="/falcomplot/las_hierarchy.html">View LAS Map</a>
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
  .figure-pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    align-items: start;
  }

  .gif-fig {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .gif-fig img {
    width: 100%;
    height: auto;
    display: block;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 8px;
    background: #fff;
  }

  :global(.dark) .gif-fig img { border-color: rgba(255,255,255,0.1); }

  .gif-fig figcaption {
    font-size: 0.82rem;
    line-height: 1.55;
    color: #6b7280;
    text-align: center;
  }

  :global(.dark) .gif-fig figcaption { color: rgba(255,255,255,0.5); }

  @media (max-width: 640px) {
    .page { padding: 2rem 1.25rem 4rem; }
    .figure-pair { grid-template-columns: 1fr; }
  }
</style>
