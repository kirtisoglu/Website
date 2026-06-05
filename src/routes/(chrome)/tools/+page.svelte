<script>
  import { fly, fade } from "svelte/transition";
  import Head from "../../../components/Head.svelte";
</script>

<svelte:head>
  <title>Tools — Alaittin Kirtisoglu</title>
  <meta name="description" content="Interactive tools and visualizers built from research projects — FalCom Visualizer for districting and facility location sampling, the London Ambulance Service hierarchy map, and the Chicago Healthcare Accessibility Dashboard." />
</svelte:head>

<div class="page" in:fade={{ duration: 500, delay: 100 }}>

  <!-- Intro -->
  <section class="intro" in:fly={{ y: 30, duration: 500, delay: 200 }}>
    <p class="eyebrow">Tools</p>
    <h1>Interactive Tools</h1>
    <p class="lead">
      Visualizers and dashboards built from my research projects. Each tool is intended
      to make the methods accessible — letting you explore the underlying problem,
      inspect samples or solutions, and see how design choices affect outcomes.
      The tools below are linked to specific papers in the
      <a href="/research/">Research</a> section.
    </p>
  </section>

  <div class="divider"></div>

  <!-- Tools list -->
  <section class="section" in:fly={{ y: 30, duration: 500, delay: 300 }}>

    <!-- FalCom -->
    <a class="tool-card" href="/research/falcom/">
      <div class="tool-meta">
        <span class="tool-status coming">Coming soon</span>
        <span class="tool-tag">Sampling · Districting · Facility Location</span>
      </div>
      <h2 class="tool-name">FalCom Visualizer</h2>
      <p class="tool-desc">
        Animated Markov chain sampling for districting and hierarchical facility
        location. Watch districts evolve under the FalCom proposal, inspect facility
        placements, and compare sampled solutions across constraints. Built alongside
        the FalCom paper (with H. Kaul).
      </p>
      <span class="tool-cta">Open visualizer →</span>
    </a>

    <!-- LAS Hierarchy Map -->
    <a class="tool-card" href="/falcomplot/las_hierarchy.html">
      <div class="tool-meta">
        <span class="tool-status live">v1 · Live</span>
        <span class="tool-tag">EMS · Hierarchy · LAS Case Study</span>
      </div>
      <h2 class="tool-name">London Ambulance Service Hierarchy</h2>
      <p class="tool-desc">
        Operational layout of the London Ambulance Service — 5,042 LSOAs, 63
        ambulance stations, 19 groups, and 5 sectors with their HQ / EOC
        facilities, laid out as a Voronoi tessellation by station travel time.
        Per-station and per-sector tooltips report FalCom-style metrics
        (L¹ / L² radii, T_mean, T_p90, ≤ 8 min and ≤ 15 min coverage) computed
        on the OSMnx driving network. These numbers are the benchmark the
        FalCom chain ensemble is compared against.
      </p>
      <span class="tool-cta">Open hierarchy map →</span>
    </a>

    <!-- Chicago Healthcare -->
    <a class="tool-card" href="/research/chicago-healthcare-network/">
      <div class="tool-meta">
        <span class="tool-status live">v1 · Live</span>
        <span class="tool-tag">Accessibility · Optimization · Public Health</span>
      </div>
      <h2 class="tool-name">Chicago Healthcare Accessibility Dashboard</h2>
      <p class="tool-desc">
        Interactive map of healthcare facilities and health indicators across
        Chicago's 77 community areas. Explore access disparities, overlay
        socioeconomic data, and compare candidate facility placements. The
        optimization module — siting under equity constraints — is in progress.
      </p>
      <span class="tool-cta">Open dashboard →</span>
    </a>

  </section>

</div>

<Head/>

<style>
  .page {
    padding: 1.5rem 0 5rem;
    display: flex;
    flex-direction: column;
  }

  /* ── Intro ── */
  .intro {
    display: flex;
    flex-direction: column;
  }

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
    margin: 0 0 1rem;
    line-height: 1.15;
  }

  :global(.dark) .intro h1 { color: #f9fafb; }

  .lead {
    font-size: 1rem;
    line-height: 1.75;
    color: #4b5563;
    max-width: 620px;
    margin: 0;
  }

  :global(.dark) .lead { color: rgba(255,255,255,0.65); }

  .lead a {
    color: #4f46e5;
    text-decoration: none;
    border-bottom: 1px solid #c7d2fe;
  }

  .lead a:hover { border-color: #4f46e5; }

  :global(.dark) .lead a { color: #a5b4fc; border-color: rgba(165,180,252,0.3); }
  :global(.dark) .lead a:hover { border-color: #a5b4fc; }

  /* ── Divider ── */
  .divider {
    height: 1px;
    background: rgba(0,0,0,0.07);
    margin: 2.5rem 0;
  }

  :global(.dark) .divider { background: rgba(255,255,255,0.07); }

  /* ── Section ── */
  .section {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* ── Tool card ── */
  .tool-card {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 10px;
    padding: 1.4rem 1.5rem;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
  }

  .tool-card:hover {
    border-color: #c7d2fe;
    box-shadow: 0 4px 14px rgba(79,70,229,0.08);
    transform: translateY(-1px);
  }

  :global(.dark) .tool-card { border-color: rgba(255,255,255,0.08); }
  :global(.dark) .tool-card:hover { border-color: rgba(165,180,252,0.3); }

  .tool-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .tool-status {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 0.18rem 0.55rem;
    border-radius: 99px;
  }

  .tool-status.coming { background: #fef9c3; color: #a16207; }
  .tool-status.live   { background: #dcfce7; color: #15803d; }

  :global(.dark) .tool-status.coming { background: rgba(161,98,7,0.15); color: #fde047; }
  :global(.dark) .tool-status.live   { background: rgba(21,128,61,0.15); color: #86efac; }

  .tool-tag {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #9ca3af;
  }

  :global(.dark) .tool-tag { color: rgba(255,255,255,0.3); }

  .tool-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
    line-height: 1.3;
  }

  :global(.dark) .tool-name { color: #f9fafb; }

  .tool-desc {
    font-size: 0.92rem;
    line-height: 1.7;
    color: #4b5563;
    margin: 0;
  }

  :global(.dark) .tool-desc { color: rgba(255,255,255,0.65); }

  .tool-cta {
    font-size: 0.85rem;
    font-weight: 600;
    color: #4f46e5;
    margin-top: 0.25rem;
  }

  :global(.dark) .tool-cta { color: #a5b4fc; }

  /* ── Mobile ── */
  @media (max-width: 640px) {
    .page { padding: 2rem 1.25rem 4rem; }
    .tool-card { padding: 1.15rem 1.15rem; }
  }
</style>
