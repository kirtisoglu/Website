<script>
  import { fly, fade } from "svelte/transition";
  import Head from "../../components/Head.svelte";
</script>

<svelte:head>
  <title>Research — Alaittin Kirtisoglu</title>
</svelte:head>

<div class="page" in:fade={{ duration: 500, delay: 100 }}>

  <!-- Intro -->
  <section class="intro" in:fly={{ y: 30, duration: 500, delay: 200 }}>
    <p class="eyebrow">Research</p>
    <h1>Work & Projects</h1>
    <p class="lead">
      My work spans pure graph theory and applied optimization — from structural
      combinatorics to algorithm design for real-world problems in equitable
      resource allocation and network design. Below are my papers and interactive
      tools built from this research.
    </p>
  </section>

  <div class="divider"></div>

  <!-- Papers -->
  <section class="section" in:fly={{ y: 30, duration: 500, delay: 300 }}>
    <h2 class="section-title">Papers</h2>

    <!-- Paper 1 -->
    <div class="paper">
      <div class="paper-meta">
        <span class="paper-status published">Published</span>
        <span class="paper-venue">Graphs and Combinatorics, 40(1), 2024</span>
      </div>
      <h3 class="paper-title">
        Coloring of Graphs Avoiding Bicolored Paths of a Fixed Length
      </h3>
      <p class="paper-authors">Kirtisoglu, A. &amp; Özkahya, L.</p>
      <p class="paper-abstract">
        A classical problem in graph theory asks: given a graph, how many colors
        are needed so that no two adjacent vertices share a color? This paper
        studies a stricter constraint — we require that no path of a given fixed
        length is colored with only two alternating colors (a <em>bicolored
        path</em>). We characterize the graphs that require extra colors to
        satisfy this condition and establish tight bounds on the number of colors
        needed. The results connect chromatic theory with Ramsey-type problems
        and provide new structural insight into how local coloring constraints
        propagate globally in a graph.
      </p>
      <a
        class="paper-link"
        href="https://link.springer.com/article/10.1007/s00373-023-02740-z"
        target="_blank"
        rel="noopener">
        View paper →
      </a>
    </div>

    <div class="paper-divider"></div>

    <!-- Paper 2 -->
    <div class="paper">
      <div class="paper-meta">
        <span class="paper-status prep">In Preparation</span>
        <span class="paper-venue">with Hemanshu Kaul · Illinois Institute of Technology</span>
      </div>
      <h3 class="paper-title">
        Designing an Equitable Primary Care Network: A Chicago Case Study
      </h3>
      <p class="paper-authors">Kaul, H. &amp; Kirtisoglu, A.</p>
      <p class="paper-abstract">
        Access to primary care in urban areas is deeply uneven — shaped by
        geography, transit, and facility capacity. This paper develops an
        optimization framework for locating and sizing primary care facilities
        across Chicago to minimize access disparities across communities. We
        model the problem as a facility location problem on a network derived
        from census and transit data, incorporate equity constraints to prevent
        under-serving vulnerable populations, and solve it using a Markov
        chain–based redistricting algorithm. The resulting network design
        significantly improves coverage equity across Chicago's 77 community areas.
      </p>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Dashboards -->
  <section class="section" in:fly={{ y: 30, duration: 500, delay: 400 }}>
    <h2 class="section-title">Interactive Tools</h2>

    <!-- Dashboard 1: Markov Chain / Redistricting -->
    <div class="dashboard-block">
      <div class="dashboard-info">
        <h3 class="dashboard-title">Redistricting & Facility Location Visualizer</h3>
        <p class="dashboard-desc">
          This dashboard animates the Markov chain algorithm at the core of the
          Chicago healthcare paper. Starting from an initial partition of the city
          into service zones, the algorithm performs a random walk over the space
          of valid redistrictings — accepting or rejecting proposed moves based on
          equity and coverage criteria. The animation shows how zone boundaries
          evolve over iterations and how the objective (e.g., minimizing the
          maximum travel time to the nearest facility) improves. You can pause,
          step through, and inspect individual zone statistics at any point.
        </p>
        <ul class="dashboard-features">
          <li>Step-by-step animation of Markov chain transitions</li>
          <li>Live objective value and equity metrics</li>
          <li>Adjustable parameters: number of facilities, equity weight</li>
        </ul>
      </div>
      <div class="dashboard-embed">
        <!-- Replace the src below with your actual dashboard URL -->
        <div class="embed-placeholder">
          <p class="placeholder-label">Dashboard coming soon</p>
          <p class="placeholder-hint">Paste your dashboard URL into the <code>src</code> of the iframe here.</p>
        </div>
        <!-- Uncomment and fill in when ready:
        <iframe
          src="YOUR_MARKOV_CHAIN_DASHBOARD_URL"
          title="Redistricting and Facility Location Visualizer"
          frameborder="0"
          allowfullscreen>
        </iframe>
        -->
      </div>
    </div>

    <div class="paper-divider"></div>

    <!-- Dashboard 2: Healthcare Accessibility -->
    <div class="dashboard-block">
      <div class="dashboard-info">
        <h3 class="dashboard-title">Healthcare Accessibility in Chicago</h3>
        <p class="dashboard-desc">
          An interactive map of primary care access across Chicago's 77 community
          areas. Each zone is colored by a composite accessibility score that
          accounts for the number of nearby facilities, their capacity, and
          estimated travel time by public transit. Overlays include physician
          shortage areas, population density, and insurance coverage rates.
          The map lets you explore which neighborhoods are underserved and
          how proposed facility placements from the optimization model
          would change the picture.
        </p>
        <ul class="dashboard-features">
          <li>Community-level accessibility scores (map view)</li>
          <li>Transit-adjusted travel time to nearest primary care</li>
          <li>Toggle: current vs. optimized facility placement</li>
          <li>Data sources: HRSA, Chicago Data Portal, ACS 2022</li>
        </ul>
      </div>
      <div class="dashboard-embed">
        <!-- Replace the src below with your actual dashboard URL -->
        <div class="embed-placeholder">
          <p class="placeholder-label">Dashboard coming soon</p>
          <p class="placeholder-hint">Paste your dashboard URL into the <code>src</code> of the iframe here.</p>
        </div>
        <!-- Uncomment and fill in when ready:
        <iframe
          src="YOUR_HEALTHCARE_DASHBOARD_URL"
          title="Healthcare Accessibility in Chicago"
          frameborder="0"
          allowfullscreen>
        </iframe>
        -->
      </div>
    </div>
  </section>

</div>

<Head/>

<style>
  .page {
    max-width: 780px;
    margin: 0 auto;
    padding: 3rem 2rem 5rem;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* ── Intro ── */
  .eyebrow {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #4f46e5;
    margin: 0 0 0.75rem;
  }

  :global(.dark) .eyebrow {
    color: #818cf8;
  }

  .intro h1 {
    font-size: clamp(1.8rem, 5vw, 2.6rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #111827;
    margin: 0 0 1rem;
    line-height: 1.15;
  }

  :global(.dark) .intro h1 {
    color: #f9fafb;
  }

  .lead {
    font-size: 1rem;
    line-height: 1.75;
    color: #4b5563;
    max-width: 620px;
    margin: 0;
  }

  :global(.dark) .lead {
    color: rgba(255,255,255,0.65);
  }

  /* ── Divider ── */
  .divider {
    height: 1px;
    background: rgba(0,0,0,0.07);
    margin: 2.5rem 0;
  }

  :global(.dark) .divider {
    background: rgba(255,255,255,0.07);
  }

  /* ── Section ── */
  .section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
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

  /* ── Papers ── */
  .paper {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .paper-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .paper-status {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 0.2rem 0.6rem;
    border-radius: 99px;
  }

  .paper-status.published {
    background: #dcfce7;
    color: #15803d;
  }

  :global(.dark) .paper-status.published {
    background: rgba(21,128,61,0.15);
    color: #86efac;
  }

  .paper-status.prep {
    background: #fef9c3;
    color: #a16207;
  }

  :global(.dark) .paper-status.prep {
    background: rgba(161,98,7,0.15);
    color: #fde047;
  }

  .paper-venue {
    font-size: 0.78rem;
    color: #9ca3af;
  }

  :global(.dark) .paper-venue {
    color: rgba(255,255,255,0.4);
  }

  .paper-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
    line-height: 1.35;
  }

  :global(.dark) .paper-title {
    color: #f9fafb;
  }

  .paper-authors {
    font-size: 0.85rem;
    color: #6b7280;
    margin: 0;
  }

  :global(.dark) .paper-authors {
    color: rgba(255,255,255,0.45);
  }

  .paper-abstract {
    font-size: 0.92rem;
    line-height: 1.75;
    color: #374151;
    margin: 0.25rem 0 0;
  }

  :global(.dark) .paper-abstract {
    color: rgba(255,255,255,0.7);
  }

  .paper-abstract em {
    color: #6b7280;
    font-style: italic;
  }

  .paper-link {
    font-size: 0.85rem;
    font-weight: 500;
    color: #4f46e5;
    text-decoration: none;
    align-self: flex-start;
  }

  .paper-link:hover {
    text-decoration: underline;
  }

  :global(.dark) .paper-link {
    color: #818cf8;
  }

  .paper-divider {
    height: 1px;
    background: rgba(0,0,0,0.05);
    margin: 0.5rem 0;
  }

  :global(.dark) .paper-divider {
    background: rgba(255,255,255,0.05);
  }

  /* ── Dashboards ── */
  .dashboard-block {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .dashboard-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }

  :global(.dark) .dashboard-title {
    color: #f9fafb;
  }

  .dashboard-desc {
    font-size: 0.92rem;
    line-height: 1.75;
    color: #374151;
    margin: 0.4rem 0 0;
  }

  :global(.dark) .dashboard-desc {
    color: rgba(255,255,255,0.7);
  }

  .dashboard-features {
    margin: 0.75rem 0 0;
    padding-left: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .dashboard-features li {
    font-size: 0.85rem;
    color: #6b7280;
    line-height: 1.5;
  }

  :global(.dark) .dashboard-features li {
    color: rgba(255,255,255,0.45);
  }

  .dashboard-embed {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.08);
  }

  :global(.dark) .dashboard-embed {
    border-color: rgba(255,255,255,0.08);
  }

  .dashboard-embed iframe {
    width: 100%;
    height: 520px;
    display: block;
    border: none;
  }

  .embed-placeholder {
    height: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: #f9fafb;
  }

  :global(.dark) .embed-placeholder {
    background: rgba(255,255,255,0.03);
  }

  .placeholder-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #9ca3af;
    margin: 0;
  }

  .placeholder-hint {
    font-size: 0.78rem;
    color: #d1d5db;
    margin: 0;
    text-align: center;
    padding: 0 2rem;
  }

  :global(.dark) .placeholder-hint {
    color: rgba(255,255,255,0.2);
  }

  .placeholder-hint code {
    font-family: monospace;
    background: rgba(0,0,0,0.05);
    padding: 0.1em 0.3em;
    border-radius: 3px;
  }

  /* ── Mobile ── */
  @media (max-width: 640px) {
    .page {
      padding: 2rem 1.25rem 4rem;
    }

    .dashboard-embed iframe {
      height: 380px;
    }
  }
</style>
