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
      My work spans graph theory, combinatorial optimization, and algorithm design —
      from structural coloring problems to computational frameworks for equitable
      resource allocation in urban networks. Below are my papers and interactive
      tools built from this research.
    </p>
  </section>

  <div class="divider"></div>

  <!-- Papers -->
  <section class="section" in:fly={{ y: 30, duration: 500, delay: 300 }}>
    <h2 class="section-title">Papers</h2>

    <!-- Paper 1: FalCom -->
    <div class="paper">
      <div class="paper-meta">
        <span class="paper-status submitting">Submitted</span>
        <span class="paper-venue">with Hemanshu Kaul</span>
      </div>
      <h3 class="paper-title">
        FalCom: A Sampling Method for Districting and Hierarchical Facility Location
      </h3>
      <p class="paper-abstract dummy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>
    </div>

    <div class="paper-divider"></div>

    <!-- Paper 2: Chicago Healthcare -->
    <div class="paper">
      <div class="paper-meta">
        <span class="paper-status submitting">Submitted</span>
        <span class="paper-venue">with Hemanshu Kaul &amp; Kim Erwin</span>
      </div>
      <h3 class="paper-title">
        Chicago Healthcare Network — Optimization-Based Decision Support for Equitable Access
      </h3>
      <p class="paper-abstract dummy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>
      <div class="paper-tools">
        <span class="tools-label">Tools:</span>
        <a class="tool-link" href="#" target="_blank" rel="noopener">Healthcare Accessibility Dashboard →</a>
      </div>
    </div>

    <div class="paper-divider"></div>

    <!-- Paper 3: Diffusion model redistricting -->
    <div class="paper">
      <div class="paper-meta">
        <span class="paper-status testing">In Testing</span>
        <span class="paper-venue">with Daryl DeFord (tentative)</span>
      </div>
      <h3 class="paper-title">
        A Diffusion Model for Political Redistricting
      </h3>
      <p class="paper-abstract dummy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>
      <div class="paper-tools">
        <span class="tools-label">Tools:</span>
        <a class="tool-link" href="#" target="_blank" rel="noopener">Redistricting Visualizer →</a>
      </div>
    </div>

    <div class="paper-divider"></div>

    <!-- Paper 4: UAV routing -->
    <div class="paper">
      <div class="paper-meta">
        <span class="paper-status testing">In Testing</span>
        <span class="paper-venue">with Melis Boran &amp; Mustafa Tural</span>
      </div>
      <h3 class="paper-title">
        UAV Routing for Maximum Information Collection under Time Windows
      </h3>
      <p class="paper-abstract dummy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>
    </div>

    <div class="paper-divider"></div>

    <!-- Paper 5: Bike-share -->
    <div class="paper">
      <div class="paper-meta">
        <span class="paper-status design">In Design</span>
        <span class="paper-venue">with Shaan Goel, Hemanshu Kaul &amp; Taran Mellacheruvu</span>
      </div>
      <h3 class="paper-title">
        Bike-Share Stations: An Equity Analysis and Location Optimization
      </h3>
      <p class="paper-abstract dummy">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>
    </div>

    <div class="paper-divider"></div>

    <!-- Paper 6: Bicolored paths (published) -->
    <div class="paper">
      <div class="paper-meta">
        <span class="paper-status published">Published</span>
        <span class="paper-venue">Graphs and Combinatorics, 40(1), Art. 11, 2024</span>
      </div>
      <h3 class="paper-title">
        Coloring of Graphs Avoiding Bicolored Paths of a Fixed Length
      </h3>
      <p class="paper-authors">Kirtisoglu, A. &amp; Özkahya, L.</p>
      <p class="paper-abstract">
        We study proper vertex colorings of graphs that avoid bicolored paths of a fixed
        length — that is, paths whose vertices alternate between exactly two colors. We
        introduce the P<sub>k</sub>-chromatic number s<sub>k</sub>(G), the minimum number
        of colors needed for such a coloring. For any graph with maximum degree d ≥ 2 and
        k ≥ 4, we establish that s<sub>k</sub>(G) = O(d<sup>(k−1)/(k−2)</sup>). We also
        determine exact values of s<sub>k</sub> for products of cycles and paths when k = 5
        and k = 6. The problem generalizes classical star coloring and acyclic coloring and
        connects chromatic theory with Ramsey-type structural questions.
      </p>
      <div class="paper-links">
        <a class="paper-link" href="https://link.springer.com/article/10.1007/s00373-023-02739-4" target="_blank" rel="noopener">Journal →</a>
        <a class="paper-link" href="https://arxiv.org/abs/2012.04560" target="_blank" rel="noopener">arXiv →</a>
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
    gap: 0.55rem;
  }

  .paper-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .paper-status {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 0.18rem 0.55rem;
    border-radius: 99px;
  }

  .paper-status.published  { background: #dcfce7; color: #15803d; }
  .paper-status.submitting { background: #e0e7ff; color: #4338ca; }
  .paper-status.testing    { background: #fef9c3; color: #a16207; }
  .paper-status.design     { background: #fce7f3; color: #9d174d; }

  :global(.dark) .paper-status.published  { background: rgba(21,128,61,0.15);  color: #86efac; }
  :global(.dark) .paper-status.submitting { background: rgba(67,56,202,0.15);  color: #a5b4fc; }
  :global(.dark) .paper-status.testing    { background: rgba(161,98,7,0.15);   color: #fde047; }
  :global(.dark) .paper-status.design     { background: rgba(157,23,77,0.15);  color: #f9a8d4; }

  .paper-venue {
    font-size: 0.78rem;
    color: #9ca3af;
  }

  :global(.dark) .paper-venue { color: rgba(255,255,255,0.38); }

  .paper-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
    line-height: 1.35;
  }

  :global(.dark) .paper-title { color: #f9fafb; }

  .paper-authors {
    font-size: 0.85rem;
    color: #6b7280;
    margin: 0;
  }

  :global(.dark) .paper-authors { color: rgba(255,255,255,0.45); }

  .paper-abstract {
    font-size: 0.92rem;
    line-height: 1.75;
    color: #374151;
    margin: 0.1rem 0 0;
  }

  .paper-abstract.dummy {
    color: #9ca3af;
    font-style: italic;
  }

  :global(.dark) .paper-abstract { color: rgba(255,255,255,0.7); }
  :global(.dark) .paper-abstract.dummy { color: rgba(255,255,255,0.25); }

  .paper-links {
    display: flex;
    gap: 1rem;
    margin-top: 0.1rem;
  }

  .paper-link {
    font-size: 0.85rem;
    font-weight: 500;
    color: #4f46e5;
    text-decoration: none;
  }

  .paper-link:hover { text-decoration: underline; }

  :global(.dark) .paper-link { color: #818cf8; }

  .paper-tools {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.1rem;
  }

  .tools-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  :global(.dark) .tools-label { color: rgba(255,255,255,0.3); }

  .tool-link {
    font-size: 0.85rem;
    font-weight: 500;
    color: #4f46e5;
    text-decoration: none;
  }

  .tool-link:hover { text-decoration: underline; }

  :global(.dark) .tool-link { color: #818cf8; }

  .paper-divider {
    height: 1px;
    background: rgba(0,0,0,0.05);
  }

  :global(.dark) .paper-divider { background: rgba(255,255,255,0.05); }

  /* ── Mobile ── */
  @media (max-width: 640px) {
    .page {
      padding: 2rem 1.25rem 4rem;
    }
  }
</style>
