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

  <section class="section" in:fly={{ y: 30, duration: 500, delay: 410 }}>
    <h2 class="section-title">Ensemble Comparison — Chains vs Voronoi Benchmark</h2>
    <p class="body-text">
      Three 10,000-step chains on the LAS instance (ε = 0.30, c_max = 4, w = 8,450,
      OSMnx driving network with a 1.6× ambulance-response multiplier):
    </p>
    <ul class="body-text" style="margin: 0.5rem 0 1rem 1.4rem;">
      <li><b>Sampling</b> — always_accept, a random walk over feasible plans.</li>
      <li><b>Boltzmann</b> — fixed β ≈ 5/E₀, a heuristic optimizer.</li>
      <li><b>Simulated Annealing</b> — β ramps 0 → 25/E₀ over the chain.</li>
    </ul>
    <p class="body-text">
      Energy is the squared-eccentricity form
      <code>E_ecc(s) = Σ (r¹ᵢ)² + Σ (r²ₛ)²</code> which penalises both the mean
      and variance of district radii (efficiency + equity in one number).
      Across all three chains, the operational Voronoi layout sits in the favourable
      tail — i.e. LAS's current sector design is already a good plan among the
      sampler's feasible alternatives.
    </p>

    <figure class="plot-fig">
      <img src="/falcomplot/ensemble_compare/trace_energies.png"
           alt="Energy trajectories over 10k steps for all three chains, with Voronoi reference lines." />
      <figcaption>
        Energy trajectories. Left: E_minisum (demand-weighted travel time).
        Right: E_eccentricity. Voronoi is the dashed black baseline.
      </figcaption>
    </figure>

    <figure class="plot-fig">
      <img src="/falcomplot/ensemble_compare/trace_districts.png"
           alt="L1 and L2 district counts across the three chains." />
      <figcaption>
        Active facility counts. |P¹| varies in [55, 91], |P²| in [21, 31] across
        the chains — FalCom opens and closes facilities as the chain explores.
      </figcaption>
    </figure>

    <figure class="plot-fig">
      <img src="/falcomplot/ensemble_compare/real_vs_artificial.png"
           alt="Real vs artificial centers active in each chain." />
      <figcaption>
        Real LAS stations vs artificial scaffolding centers active per state.
        Real stations dominate the active facility set across chains.
      </figcaption>
    </figure>

    <figure class="plot-fig">
      <img src="/falcomplot/ensemble_compare/dist_metrics.png"
           alt="Empirical distributions of summary statistics across the three chains." />
      <figcaption>
        Empirical distributions of summary statistics. Voronoi's value
        (dashed line) sits at the favourable tail in every panel.
      </figcaption>
    </figure>

    <figure class="plot-fig">
      <img src="/falcomplot/ensemble_compare/summary_vs_voronoi.png"
           alt="Final-state metrics by chain compared to Voronoi." />
      <figcaption>
        Final-state metrics (last sampled snapshot of each chain) vs the
        Voronoi benchmark. Boltzmann and SA improve over pure sampling on E_ecc
        but neither catches the calibrated operational layout.
      </figcaption>
    </figure>

    <p class="body-text" style="margin-top: 1.4rem;">
      <b>Caveat on ensemble analysis.</b>
      <code>hierarchical_recom</code>'s proposal-density ratio is #P-hard
      (Cannon, Duchin, Randall &amp; Rule, 2022). Boltzmann acceptance is therefore
      a heuristic optimizer, not a true Metropolis-Hastings sampler. We report
      <i>empirical sample statistics</i> — properties of the observed feasible
      plans — rather than expectations under a known stationary distribution.
      Convergence diagnostics (multi-seed agreement, Gelman-Rubin) and a
      reversible-ReCom variant (Cannon et al. 2022) are paper-level future work.
    </p>
  </section>

</div>

<Head/>

<style>
  .plot-fig {
    margin: 1.2rem 0;
    padding: 0;
  }
  .plot-fig img {
    width: 100%;
    height: auto;
    display: block;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    background: #fff;
  }
  :global(.dark) .plot-fig img {
    border-color: rgba(255, 255, 255, 0.08);
    background: #fafafa;
  }
  .plot-fig figcaption {
    font-size: 0.85rem;
    color: #6b7280;
    margin-top: 0.5rem;
    line-height: 1.45;
    text-align: center;
  }
  :global(.dark) .plot-fig figcaption {
    color: rgba(255, 255, 255, 0.55);
  }
  .body-text code {
    background: rgba(0, 0, 0, 0.06);
    padding: 0.05rem 0.3rem;
    border-radius: 3px;
    font-size: 0.86em;
  }
  :global(.dark) .body-text code {
    background: rgba(255, 255, 255, 0.08);
  }

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

  @media (max-width: 640px) {
    .page { padding: 2rem 1.25rem 4rem; }
  }
</style>
