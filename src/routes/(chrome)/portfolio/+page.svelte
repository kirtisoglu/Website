<script>
  import { fly, fade } from "svelte/transition";
  import Head from "../../../components/Head.svelte";
</script>

<svelte:head>
  <title>Research Portfolio — Alaittin Kirtisoglu</title>
  <meta name="description" content="Research portfolio — Alaittin Kirtisoglu. PhD candidate at Illinois Institute of Technology working on MCMC sampling for hierarchical capacitated districting and equitable healthcare access." />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="page" in:fade={{ duration: 500, delay: 100 }}>

  <!-- Hero -->
  <section class="hero" in:fly={{ y: 30, duration: 500, delay: 200 }}>
    <p class="eyebrow">Research Portfolio</p>
    <h1>Alaittin Kirtisoglu</h1>
    <p class="subtitle">
      PhD Candidate in Applied Mathematics · Illinois Institute of Technology
    </p>
    <p class="lead">
      My research develops Markov chain Monte Carlo methods for hierarchical
      combinatorial optimization problems, with applications to equitable
      resource allocation in healthcare. The methodological core of my
      dissertation, <em>FalCom</em>, samples over the space of feasible
      hierarchical capacitated partitions rather than returning a single
      optimum, enabling ensemble characterization of structural robustness,
      facility essentiality, and capacity utilization across feasible plans.
    </p>
    <div class="actions">
      <a class="btn primary" href="/cv.pdf" target="_blank" rel="noopener">View CV (PDF)</a>
      <a class="btn" href="mailto:akirtisoglu@hawk.iit.edu">Email</a>
      <a class="btn" href="https://scholar.google.com/citations?user=ckb6pV4AAAAJ" target="_blank" rel="noopener">Google Scholar</a>
    </div>
  </section>

  <nav class="section-nav" in:fade={{ duration: 400, delay: 300 }}>
    <a href="#themes">Themes</a><span class="sep">·</span>
    <a href="#work">Selected work</a><span class="sep">·</span>
    <a href="#software">Software</a><span class="sep">·</span>
    <a href="#directions">Future directions</a><span class="sep">·</span>
    <a href="#talks">Talks</a><span class="sep">·</span>
    <a href="#references">References</a><span class="sep">·</span>
    <a href="#contact">Contact</a>
  </nav>

  <div class="divider"></div>

  <!-- What I work on -->
  <section id="themes" class="section" in:fly={{ y: 25, duration: 500, delay: 350 }}>
    <h2 class="section-title">Research themes</h2>
    <div class="themes">
      <div class="theme">
        <h3>MCMC sampling for combinatorial optimization</h3>
        <p>
          Markov chains over feasible configurations rather than single optima.
          Spanning-tree proposals for hierarchical districting under capacity
          and balance constraints. Convergence diagnostics, mixing analysis, and
          ensemble-based robustness characterization.
        </p>
      </div>
      <div class="theme">
        <h3>Equitable healthcare access design</h3>
        <p>
          Optimization frameworks for Federally Qualified Health Center network
          design, MUA designation reform, and policy-relevant ensemble analysis.
          Integration of federal data sources, transit-aware accessibility
          measures, and patient-flow modeling.
        </p>
      </div>
      <div class="theme">
        <h3>Combinatorial optimization and graph theory</h3>
        <p>
          MISOCP and matheuristic methods for UAV routing under nonlinear
          energy constraints. Graph coloring under bicolored-path avoidance.
          Diffusion-based hybrid samplers for political redistricting.
        </p>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Selected work -->
  <section id="work" class="section" in:fly={{ y: 25, duration: 500, delay: 400 }}>
    <h2 class="section-title">Selected work</h2>

    <div class="work-item">
      <div class="work-meta">
        <span class="status preprint">Preprint</span>
        <span class="venue">Manuscript, 2026</span>
      </div>
      <h3>FalCom: A Sampling Method for Districting and Hierarchical Facility Location</h3>
      <p class="authors">with H. Kaul</p>
      <p class="abstract">
        First MCMC sampling framework for hierarchical capacitated facility
        location and districting problems. Extends the spanning-tree proposal
        of ReCom to multi-level service systems with capacity bounds, demand
        balance, and candidate-aware cut selection. Validated on graphs of up
        to 50,000 basic units &mdash; an order of magnitude beyond published
        hierarchical facility-location methods. Released as open-source
        Python library with interactive web visualizer.
      </p>
      <div class="links">
        <a href="https://github.com/kirtisoglu/FalCom-Paper" target="_blank" rel="noopener">Paper repo</a>
        <a href="/research/falcom/">Project page</a>
      </div>
    </div>

    <div class="work-item">
      <div class="work-meta">
        <span class="status in-progress">In progress</span>
        <span class="venue">Manuscript + deployed dashboard, 2026</span>
      </div>
      <h3>Optimization-Based Decision Support for Equitable Expansion of Federally Qualified Health Centers in Chicago</h3>
      <p class="authors">with H. Kaul</p>
      <p class="abstract">
        Four-gap analysis of HRSA's FQHC grant-allocation system: absence of
        location-evaluation tools, outdated 1970s Index of Medical
        Underservice, limited MUA designation process, and unmapped referral
        networks. Proposes continuous percentile-rank replacement for the
        binary IMU threshold and integrates FalCom with a doubly-constrained
        spatial-interaction patient-flow model. Backed by a deployed analytics
        dashboard integrating six federal and commercial data sources.
      </p>
      <div class="links">
        <a href="/research/chicago-healthcare-network/">Project page</a>
        <a href="/research/chicago-healthcare-network/dashboard">Live dashboard</a>
      </div>
    </div>

    <div class="work-item">
      <div class="work-meta">
        <span class="status preprint">Preprint</span>
        <span class="venue">Manuscript, 2026</span>
      </div>
      <h3>UAV Routing for Maximum Information Collection under Time Windows and Energy Consumption</h3>
      <p class="authors">with M. Boran &amp; M. Tural</p>
      <p class="abstract">
        Exact convex-optimization framework for UAV reconnaissance routing
        under time windows, time-dependent rewards, and a nonlinear energy
        budget. The MINLP is reformulated exactly as a mixed-integer
        second-order cone program via a chain of three rotated cones, and
        solved at scale by an iterated-local-search matheuristic whose
        evaluation oracle is a small SOCP. Calibrated on a real fixed-wing
        UAV platform; scales to 200-node Solomon-derived instances.
      </p>
      <div class="links">
        <a href="https://github.com/kirtisoglu/UAV-Routing" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>

    <div class="work-item">
      <div class="work-meta">
        <span class="status preparing">Preparing for submission</span>
        <span class="venue">Manuscript, 2026</span>
      </div>
      <h3>A Diffusion Model for Political Redistricting</h3>
      <p class="authors">solo</p>
      <p class="abstract">
        Hybrid sampler complementing ReCom with a kernel-aware
        local-refinement step based on a graph-diffusion energy formulated as
        an integer quadratic program. Configurable Laplacian kernels (perimeter,
        density, demographic) with a fidelity term anchoring refinement near
        the current partition. On Iowa precincts, the integer variant reduces
        mean cut edges by 23.9% vs. ReCom.
      </p>
      <div class="links">
        <a href="https://github.com/kirtisoglu/Redistricting_Diffusion_Model" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>

    <div class="work-item">
      <div class="work-meta">
        <span class="status published">Published</span>
        <span class="venue">Graphs and Combinatorics, 40(1), 2024</span>
      </div>
      <h3>Coloring of Graphs Avoiding Bicolored Paths of a Fixed Length</h3>
      <p class="authors">with L. Özkahya</p>
      <p class="abstract">
        Proper vertex colorings of graphs that avoid bicolored paths of a
        fixed length. Introduces the P<sub>k</sub>-chromatic number s<sub>k</sub>(G).
        For graphs with maximum degree d &ge; 2 and k &ge; 4, establishes
        s<sub>k</sub>(G) = O(d<sup>(k&minus;1)/(k&minus;2)</sup>). Exact values
        for products of cycles and paths when k = 5, 6.
      </p>
      <div class="links">
        <a href="https://link.springer.com/article/10.1007/s00373-023-02739-4" target="_blank" rel="noopener">Journal</a>
        <a href="https://arxiv.org/abs/2012.04560" target="_blank" rel="noopener">arXiv</a>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Software -->
  <section id="software" class="section" in:fly={{ y: 25, duration: 500, delay: 450 }}>
    <h2 class="section-title">Software &amp; infrastructure</h2>
    <div class="software-grid">
      <div class="software-item">
        <h3>FalcomChain</h3>
        <p class="tag">Python &middot; MCMC sampler</p>
        <p>
          Core MCMC implementation for hierarchical capacitated facility
          location and districting. Spanning-tree proposals, capacitated tree
          cuts, candidate-aware cut selection, convergence diagnostics.
        </p>
        <a href="https://github.com/kirtisoglu/FalcomChain" target="_blank" rel="noopener">GitHub →</a>
      </div>
      <div class="software-item">
        <h3>FalcomPlot</h3>
        <p class="tag">Python + JavaScript &middot; visualization</p>
        <p>
          Plotting and interactive web visualizer for FalCom chains and
          ensemble outputs. Boundary frequency maps, facility stability
          profiles, energy traces.
        </p>
        <a href="https://github.com/kirtisoglu/FalcomPlot" target="_blank" rel="noopener">GitHub →</a>
      </div>
      <div class="software-item">
        <h3>FalcomTravel</h3>
        <p class="tag">R &middot; travel-time matrices</p>
        <p>
          Construction of transit-aware travel-time matrices on dual graphs.
          Used in the Chicago FQHC analysis to evaluate accessibility under
          the CTA network.
        </p>
        <a href="https://github.com/kirtisoglu/FalcomTravel" target="_blank" rel="noopener">GitHub →</a>
      </div>
      <div class="software-item">
        <h3>Chicago Healthcare Dashboard</h3>
        <p class="tag">SvelteKit &middot; deployed analytics</p>
        <p>
          Interactive analytics platform for Chicago's FQHC network. Six
          integrated data sources (HRSA UDS, CMS NPPES, ACS, Chicago Health
          Atlas, CTA GTFS, CDC SVI), multi-scale geographies, 33 health
          indicators.
        </p>
        <a href="/research/chicago-healthcare-network/dashboard">Live dashboard →</a>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Future directions -->
  <section id="directions" class="section" in:fly={{ y: 25, duration: 500, delay: 500 }}>
    <h2 class="section-title">Postdoctoral research directions</h2>

    <div class="direction">
      <h3>1. Stochastic extension of FalCom</h3>
      <p>
        Two-stage stochastic formulation in which first-stage districting
        decisions are made under demand uncertainty and second-stage
        operational adjustments respond to realized demand. Technical
        contributions: chance-constrained district feasibility with explicit
        bounds, convergence analysis of the chain under a stochastic
        objective, and distributionally robust extensions over Wasserstein
        balls of empirical demand distributions. Empirical setting: Chicago
        FQHC system under documented demand uncertainty.
      </p>
    </div>

    <div class="direction">
      <h3>2. Ensemble-based districting analysis for healthcare allocation equity</h3>
      <p>
        Application of ensemble-based districting analysis to inter-regional
        and rural-Indigenous gaps in healthcare allocation. Methodological
        lineage from districting-optimization work on U.S. liver allocation
        and from heterogeneous donor circles with flow-based contiguity at
        national-scale donation service areas. FalCom's spanning-tree
        contiguity handles arbitrary shapes at 50,000 nodes, and the
        stochastic extension above lets the analysis incorporate uncertain
        transplant demand and supply across regions.
      </p>
    </div>

    <div class="direction">
      <h3>3. Equitable last-mile healthcare delivery</h3>
      <p>
        Combining hierarchical districting (FalCom) with constrained vehicle
        routing (the UAV-Routing MISOCP formulation) for last-mile healthcare
        delivery in underserved and rural communities. Three-level
        structure: service-region design, autonomous-delivery infrastructure
        placement, dynamic routing under range and time-window constraints.
      </p>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Talks -->
  <section id="talks" class="section" in:fly={{ y: 25, duration: 500, delay: 550 }}>
    <h2 class="section-title">Selected talks</h2>
    <div class="talks">
      <div class="talk">
        <div class="talk-meta">
          <span class="talk-date">May 2026</span>
          <span class="talk-venue">METU IE Seminar, Ankara</span>
        </div>
        <div class="talk-title">Sampling Solutions for Districting Problems and Hierarchical Facility Location with Real-World Applications</div>
      </div>
      <div class="talk">
        <div class="talk-meta">
          <span class="talk-date">May 2026</span>
          <span class="talk-venue">ISCO 2026, Kusadasi</span>
        </div>
        <div class="talk-title">Sampling Solutions for Districting Problems and Hierarchical Facility Location with Real-World Applications</div>
      </div>
      <div class="talk">
        <div class="talk-meta">
          <span class="talk-date">Apr 2026</span>
          <span class="talk-venue">IIT Discrete Math Seminars, Chicago</span>
        </div>
        <div class="talk-title">UAV Routing for Maximum Information Collection under Time Windows</div>
      </div>
      <div class="talk">
        <div class="talk-meta">
          <span class="talk-date">2021</span>
          <span class="talk-venue">BCC · SIAM DM · European Combinatorial Conference</span>
        </div>
        <div class="talk-title">Coloring of Graphs Avoiding Bicolored Paths of a Fixed Length</div>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- References -->
  <section id="references" class="section" in:fly={{ y: 25, duration: 500, delay: 600 }}>
    <h2 class="section-title">References</h2>
    <div class="references">
      <div class="reference">
        <div class="ref-name">Hemanshu Kaul</div>
        <div class="ref-role">PhD advisor</div>
        <div class="ref-affil">Department of Applied Mathematics, Illinois Institute of Technology</div>
        <div class="ref-email"><a href="mailto:kaul@iit.edu">kaul@iit.edu</a></div>
      </div>
      <div class="reference">
        <div class="ref-name">Mustafa Kemal Tural</div>
        <div class="ref-role">Collaborator (UAV Routing)</div>
        <div class="ref-affil">Department of Industrial Engineering, Middle East Technical University</div>
        <div class="ref-email"><a href="mailto:tural@metu.edu.tr">tural@metu.edu.tr</a></div>
      </div>
      <div class="reference">
        <div class="ref-name">Lale Özkahya</div>
        <div class="ref-role">Master's advisor</div>
        <div class="ref-affil">Department of Computer Engineering, Hacettepe University</div>
        <div class="ref-email"><a href="mailto:ozkahya@cs.hacettepe.edu.tr">ozkahya@cs.hacettepe.edu.tr</a></div>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Contact -->
  <section id="contact" class="section" in:fly={{ y: 25, duration: 500, delay: 650 }}>
    <h2 class="section-title">Contact</h2>
    <p class="contact-line">
      <a href="mailto:akirtisoglu@hawk.iit.edu">akirtisoglu@hawk.iit.edu</a>
      &middot;
      <a href="https://akirtisoglu.me">akirtisoglu.me</a>
      &middot;
      <a href="https://github.com/kirtisoglu" target="_blank" rel="noopener">GitHub</a>
      &middot;
      <a href="https://www.linkedin.com/in/alaittin-kirtisoglu" target="_blank" rel="noopener">LinkedIn</a>
    </p>
  </section>

</div>

<style>
  .page {
    padding: 1.5rem 0 5rem;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  :global(html) { scroll-behavior: smooth; scroll-padding-top: 5rem; }

  /* ── Hero ── */
  .hero { display: flex; flex-direction: column; gap: 0.75rem; }
  .eyebrow {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #4f46e5;
    margin: 0;
  }
  :global(.dark) .eyebrow { color: #818cf8; }
  .hero h1 {
    font-size: clamp(1.8rem, 5vw, 2.6rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #111827;
    margin: 0;
    line-height: 1.15;
  }
  :global(.dark) .hero h1 { color: #f9fafb; }
  .subtitle {
    font-size: 0.95rem;
    color: #6b7280;
    margin: 0;
  }
  :global(.dark) .subtitle { color: rgba(255,255,255,0.55); }
  .lead {
    font-size: 1rem;
    line-height: 1.75;
    color: #4b5563;
    max-width: 720px;
    margin: 0.5rem 0 0;
  }
  :global(.dark) .lead { color: rgba(255,255,255,0.7); }
  .actions { display: flex; gap: 0.6rem; margin-top: 1rem; flex-wrap: wrap; }
  .btn {
    font-size: 0.88rem;
    font-weight: 500;
    color: #4f46e5;
    text-decoration: none;
    border: 1px solid #c7d2fe;
    padding: 0.4rem 0.85rem;
    border-radius: 6px;
    transition: background 0.15s;
  }
  .btn:hover { background: #eef2ff; }
  .btn.primary {
    background: #4f46e5; color: #fff; border-color: #4f46e5;
  }
  .btn.primary:hover { background: #4338ca; }
  :global(.dark) .btn { color: #a5b4fc; border-color: rgba(165,180,252,0.4); }
  :global(.dark) .btn:hover { background: rgba(99,102,241,0.1); }
  :global(.dark) .btn.primary { background: #6366f1; border-color: #6366f1; color: #fff; }

  /* ── Section nav ── */
  .section-nav {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: 1.5rem 0 0;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    flex-wrap: wrap;
  }
  .section-nav a {
    color: #6b7280;
    text-decoration: none;
    padding: 0.25rem 0;
    border-bottom: 1px solid transparent;
    transition: color 0.15s, border-color 0.15s;
  }
  .section-nav a:hover { color: #4f46e5; border-bottom-color: #c7d2fe; }
  .sep { color: #d1d5db; }
  :global(.dark) .section-nav a { color: rgba(255,255,255,0.5); }
  :global(.dark) .section-nav a:hover { color: #a5b4fc; border-bottom-color: rgba(165,180,252,0.4); }
  :global(.dark) .sep { color: rgba(255,255,255,0.2); }

  /* ── Divider ── */
  .divider {
    height: 1px;
    background: rgba(0,0,0,0.07);
    margin: 2.5rem 0;
  }
  :global(.dark) .divider { background: rgba(255,255,255,0.07); }

  /* ── Section ── */
  .section { display: flex; flex-direction: column; gap: 1.5rem; }
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

  /* ── Themes ── */
  .themes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  .theme { display: flex; flex-direction: column; gap: 0.4rem; }
  .theme h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
    line-height: 1.3;
  }
  :global(.dark) .theme h3 { color: #f9fafb; }
  .theme p {
    font-size: 0.9rem;
    line-height: 1.65;
    color: #4b5563;
    margin: 0;
  }
  :global(.dark) .theme p { color: rgba(255,255,255,0.65); }

  /* ── Work items ── */
  .work-item { display: flex; flex-direction: column; gap: 0.5rem; }
  .work-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  .status {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 0.18rem 0.55rem;
    border-radius: 99px;
  }
  .status.published  { background: #dcfce7; color: #15803d; }
  .status.preprint   { background: #e0e7ff; color: #4338ca; }
  .status.preparing  { background: #fef3c7; color: #92400e; }
  .status.in-progress { background: #fef9c3; color: #a16207; }
  :global(.dark) .status.published  { background: rgba(21,128,61,0.15);  color: #86efac; }
  :global(.dark) .status.preprint   { background: rgba(67,56,202,0.15);  color: #a5b4fc; }
  :global(.dark) .status.preparing  { background: rgba(146,64,14,0.15);  color: #fcd34d; }
  :global(.dark) .status.in-progress { background: rgba(161,98,7,0.15);  color: #fde047; }
  .venue {
    font-size: 0.82rem;
    color: #9ca3af;
    font-style: italic;
  }
  :global(.dark) .venue { color: rgba(255,255,255,0.38); }
  .work-item h3 {
    font-size: 1.05rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
    line-height: 1.35;
  }
  :global(.dark) .work-item h3 { color: #f9fafb; }
  .authors {
    font-size: 0.85rem;
    color: #6b7280;
    margin: 0;
  }
  :global(.dark) .authors { color: rgba(255,255,255,0.45); }
  .abstract {
    font-size: 0.92rem;
    line-height: 1.75;
    color: #374151;
    margin: 0.1rem 0 0;
  }
  :global(.dark) .abstract { color: rgba(255,255,255,0.7); }
  .links { display: flex; gap: 1rem; margin-top: 0.2rem; }
  .links a {
    font-size: 0.85rem;
    font-weight: 500;
    color: #4f46e5;
    text-decoration: none;
  }
  .links a:hover { text-decoration: underline; }
  :global(.dark) .links a { color: #818cf8; }

  /* ── Software grid ── */
  .software-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.25rem;
  }
  .software-item {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 1rem 1.1rem;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 8px;
    background: rgba(238,242,255,0.3);
  }
  :global(.dark) .software-item {
    border-color: rgba(255,255,255,0.08);
    background: rgba(99,102,241,0.04);
  }
  .software-item h3 {
    font-size: 0.98rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }
  :global(.dark) .software-item h3 { color: #f9fafb; }
  .software-item .tag {
    font-size: 0.72rem;
    font-weight: 600;
    color: #6366f1;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin: 0;
  }
  :global(.dark) .software-item .tag { color: #a5b4fc; }
  .software-item p {
    font-size: 0.88rem;
    line-height: 1.6;
    color: #4b5563;
    margin: 0;
  }
  :global(.dark) .software-item p { color: rgba(255,255,255,0.65); }
  .software-item a {
    font-size: 0.85rem;
    font-weight: 500;
    color: #4f46e5;
    text-decoration: none;
    margin-top: auto;
  }
  .software-item a:hover { text-decoration: underline; }
  :global(.dark) .software-item a { color: #818cf8; }

  /* ── Directions ── */
  .direction { display: flex; flex-direction: column; gap: 0.4rem; }
  .direction h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }
  :global(.dark) .direction h3 { color: #f9fafb; }
  .direction p {
    font-size: 0.92rem;
    line-height: 1.7;
    color: #374151;
    margin: 0;
  }
  :global(.dark) .direction p { color: rgba(255,255,255,0.7); }

  /* ── Talks ── */
  .talks { display: flex; flex-direction: column; gap: 1.1rem; }
  .talk { display: flex; flex-direction: column; gap: 0.25rem; }
  .talk-meta {
    display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;
  }
  .talk-date {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #6b7280;
    min-width: 4.5rem;
  }
  :global(.dark) .talk-date { color: rgba(255,255,255,0.4); }
  .talk-venue {
    font-size: 0.88rem;
    font-weight: 700;
    color: #111827;
  }
  :global(.dark) .talk-venue { color: #f9fafb; }
  .talk-title {
    font-size: 0.85rem;
    font-weight: 400;
    color: #4b5563;
    line-height: 1.4;
  }
  :global(.dark) .talk-title { color: rgba(255,255,255,0.6); }

  /* ── References ── */
  .references {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  .reference {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 1rem 1.1rem;
    border-left: 3px solid #c7d2fe;
    background: rgba(238,242,255,0.25);
    border-radius: 0 6px 6px 0;
  }
  :global(.dark) .reference {
    border-left-color: rgba(165,180,252,0.4);
    background: rgba(99,102,241,0.04);
  }
  .ref-name {
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
  }
  :global(.dark) .ref-name { color: #f9fafb; }
  .ref-role {
    font-size: 0.78rem;
    font-weight: 600;
    color: #6366f1;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  :global(.dark) .ref-role { color: #a5b4fc; }
  .ref-affil {
    font-size: 0.88rem;
    color: #4b5563;
    line-height: 1.45;
    margin-top: 0.15rem;
  }
  :global(.dark) .ref-affil { color: rgba(255,255,255,0.65); }
  .ref-email {
    font-size: 0.88rem;
    margin-top: 0.25rem;
  }
  .ref-email a {
    color: #4f46e5;
    text-decoration: none;
  }
  .ref-email a:hover { text-decoration: underline; }
  :global(.dark) .ref-email a { color: #818cf8; }

  /* ── Contact ── */
  .contact-line {
    font-size: 0.95rem;
    color: #374151;
    margin: 0;
  }
  :global(.dark) .contact-line { color: rgba(255,255,255,0.7); }
  .contact-line a { color: #4f46e5; text-decoration: none; }
  .contact-line a:hover { text-decoration: underline; }
  :global(.dark) .contact-line a { color: #818cf8; }
  /* ── Mobile ── */
  @media (max-width: 640px) {
    .page { padding: 2rem 1.25rem 4rem; }
  }
</style>
