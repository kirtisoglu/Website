<script>
  import { fly, fade } from "svelte/transition";
  import Head from "../../components/Head.svelte";

  let bibtexCopied = false;
  const bibtex = `@article{Kirtisoglu2024,
  author    = {Kirtisoglu, Alaittin and {\\"{O}}zkahya, Lale},
  title     = {Coloring of graphs avoiding bicolored paths of a fixed length},
  journal   = {Graphs and Combinatorics},
  volume    = {40},
  number    = {1},
  pages     = {11},
  year      = {2024},
  doi       = {10.1007/s00373-023-02739-4}
}`;

  function copyBibtex() {
    navigator.clipboard.writeText(bibtex).then(() => {
      bibtexCopied = true;
      setTimeout(() => { bibtexCopied = false; }, 2000);
    });
  }
</script>

<svelte:head>
  <title>Research — Alaittin Kirtisoglu</title>
  <meta name="description" content="Research papers and projects by Alaittin Kirtisoglu — combinatorial optimization, computational districting, UAV routing, healthcare network design, and graph coloring." />
</svelte:head>

<div class="page" in:fade={{ duration: 500, delay: 100 }}>

  <!-- Intro -->
  <section class="intro" in:fly={{ y: 30, duration: 500, delay: 200 }}>
    <div class="intro-text">
      <p class="eyebrow">Research</p>
      <h1>Work & Projects</h1>
      <p class="lead">
        My work spans combinatorial optimization, algorithm design, and equitable network
        design — from computational districting to healthcare access modeling. I am especially 
        interested in problems that are not only present rich theoretical challenges,
        but also arise from real-world needs with significant social impact. Below are
        my papers and interactive tools built from this research.
      </p>
      <p class="lead">
        If you have an interesting problem that intersects with some of my work and interest, 
        or are looking for a new problem, please reach out by email.
      </p>
    </div>
    <!-- Network infographic: city grid + facility nodes + coverage + spanning tree -->
    <svg class="graph-deco" viewBox="0 0 220 210" aria-hidden="true" fill="none">
      <!-- Street grid (faint) -->
      <line x1="10"  y1="42"  x2="210" y2="42"  stroke="#e5e7eb" stroke-width="0.8"/>
      <line x1="10"  y1="84"  x2="210" y2="84"  stroke="#e5e7eb" stroke-width="0.8"/>
      <line x1="10"  y1="126" x2="210" y2="126" stroke="#e5e7eb" stroke-width="0.8"/>
      <line x1="10"  y1="168" x2="210" y2="168" stroke="#e5e7eb" stroke-width="0.8"/>
      <line x1="42"  y1="10"  x2="42"  y2="200" stroke="#e5e7eb" stroke-width="0.8"/>
      <line x1="84"  y1="10"  x2="84"  y2="200" stroke="#e5e7eb" stroke-width="0.8"/>
      <line x1="126" y1="10"  x2="126" y2="200" stroke="#e5e7eb" stroke-width="0.8"/>
      <line x1="168" y1="10"  x2="168" y2="200" stroke="#e5e7eb" stroke-width="0.8"/>
      <!-- Coverage rings (soft) -->
      <circle cx="84"  cy="84"  r="38" fill="#e0e7ff" fill-opacity="0.45" stroke="#c7d2fe" stroke-width="0.8"/>
      <circle cx="168" cy="42"  r="28" fill="#e0e7ff" fill-opacity="0.35" stroke="#c7d2fe" stroke-width="0.8"/>
      <circle cx="126" cy="168" r="34" fill="#e0e7ff" fill-opacity="0.40" stroke="#c7d2fe" stroke-width="0.8"/>
      <circle cx="42"  cy="155" r="26" fill="#e0e7ff" fill-opacity="0.35" stroke="#c7d2fe" stroke-width="0.8"/>
      <!-- Spanning network edges -->
      <line x1="84"  y1="84"  x2="168" y2="42"  stroke="#6366f1" stroke-width="1.4" stroke-opacity="0.6"/>
      <line x1="84"  y1="84"  x2="126" y2="168" stroke="#6366f1" stroke-width="1.4" stroke-opacity="0.6"/>
      <line x1="84"  y1="84"  x2="42"  y2="155" stroke="#6366f1" stroke-width="1.4" stroke-opacity="0.6"/>
      <line x1="126" y1="168" x2="42"  y2="155" stroke="#6366f1" stroke-width="1.1" stroke-opacity="0.45"/>
      <line x1="168" y1="42"  x2="126" y2="168" stroke="#6366f1" stroke-width="1.1" stroke-opacity="0.35" stroke-dasharray="4 3"/>
      <!-- Demand nodes (small, scattered) -->
      <circle cx="55"  cy="42"  r="2.5" fill="#9ca3af"/>
      <circle cx="126" cy="42"  r="2.5" fill="#9ca3af"/>
      <circle cx="168" cy="84"  r="2.5" fill="#9ca3af"/>
      <circle cx="168" cy="126" r="2.5" fill="#9ca3af"/>
      <circle cx="84"  cy="126" r="2.5" fill="#9ca3af"/>
      <circle cx="42"  cy="84"  r="2.5" fill="#9ca3af"/>
      <circle cx="55"  cy="168" r="2.5" fill="#9ca3af"/>
      <circle cx="196" cy="168" r="2.5" fill="#9ca3af"/>
      <!-- Facility nodes (larger, indigo) -->
      <circle cx="84"  cy="84"  r="7" fill="#4f46e5"/>
      <circle cx="168" cy="42"  r="6" fill="#4f46e5"/>
      <circle cx="126" cy="168" r="6" fill="#4f46e5"/>
      <circle cx="42"  cy="155" r="5" fill="#6366f1"/>
      <!-- Cross icon on main facility -->
      <line x1="84" y1="80" x2="84" y2="88" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="80" y1="84" x2="88" y2="84" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  </section>

  <!-- Section anchors -->
  <nav class="section-nav" in:fade={{ duration: 400, delay: 250 }} aria-label="Page sections">
    <a href="#papers">Papers</a>
    <span class="section-nav-sep">·</span>
    <a href="#talks">Talks</a>
  </nav>

  <div class="divider"></div>

  <!-- Papers -->
  <section id="papers" class="section" in:fly={{ y: 30, duration: 500, delay: 300 }}>
    <h2 class="section-title">Papers</h2>

    <!-- Paper 1: Bicolored paths (published) -->
    <div class="paper">
      <div class="paper-meta">
        <span class="paper-num">1.</span>
        <span class="paper-status published">Published</span>
        <span class="paper-type">Research Paper</span>
      </div>
      <h3 class="paper-title">
        Coloring of Graphs Avoiding Bicolored Paths of a Fixed Length
      </h3>
      <p class="paper-authors">Kirtisoglu, A. &amp; Özkahya, L.</p>
      <p class="paper-venue">Graphs and Combinatorics, 40(1), Art. 11, 2024</p>
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
        <button class="bibtex-btn" on:click={copyBibtex}>
          {bibtexCopied ? '✓ Copied!' : 'Copy BibTeX'}
        </button>
      </div>
    </div>

     <div class="paper-divider"></div>

    <!-- Paper 2: FalCom -->
    <div class="paper">
      <div class="paper-meta">
        <span class="paper-num">2.</span>
        <span class="paper-status preprint">Preprint</span>
        <span class="paper-type">Research Paper &amp; Visualizer</span>
      </div>
      <h3 class="paper-title">
        <a href="/research/falcom/">FalCom: A Sampling Method for Districting and Hierarchical Facility Location</a>
      </h3>
      <p class="paper-venue">with Hemanshu Kaul</p>
      <p class="paper-abstract">
        We introduce FalCom, the first Markov chain Monte Carlo sampling framework for
        hierarchical capacitated facility location and districting problems. FalCom extends
        the spanning-tree proposal of ReCom from single-level political redistricting to
        multi-level service systems with capacity bounds, demand balance, and facility-aware
        cut selection. We demonstrate that it scales to graphs of 50,000 basic units — an
        order of magnitude beyond published hierarchical facility-location methods. Rather
        than returning a single optimum, FalCom samples ensembles of feasible plans,
        enabling boundary-robustness maps, essential-vs-substitutable facility analysis,
        and capacity-utilization distributions that no single-solution method can produce.
        The framework is validated on synthetic grids and a London Ambulance Service case
        study and released as an open-source Python library with an interactive visualizer.
      </p>
      <div class="paper-links">
        <a class="paper-link" href="https://github.com/kirtisoglu/FalcomChain" target="_blank" rel="noopener">GitHub →</a>
      </div>
      <div class="paper-tools">
        <span class="tools-label">Tools:</span>
        <a class="tool-link" href="/research/falcom/">FalCom Visualizer →</a>
      </div>
    </div>

    <div class="paper-divider"></div>

    <!-- Paper 3: UAV routing -->
    <div class="paper">
      <div class="paper-meta">
        <span class="paper-num">3.</span>
        <span class="paper-status preprint">Preprint</span>
        <span class="paper-type">Research Paper</span>
      </div>
      <h3 class="paper-title">
        UAV Routing for Maximum Information Collection under Time Windows and Energy Consumption
      </h3>
      <p class="paper-venue">with Melis Boran &amp; Mustafa Tural</p>
      <p class="paper-abstract">
        We develop an exact convex-optimization framework for UAV reconnaissance routing
        under time windows, time-dependent rewards, and a nonlinear energy budget. The
        model jointly selects which targets to visit, the order of visits, the travel speed
        on each arc, and a separate loitering time at the fixed minimum-power speed,
        capturing fixed-wing aerodynamics correctly. The resulting mixed-integer nonlinear
        program is reformulated exactly as a mixed-integer second-order cone program
        (MISOCP) via a chain of three rotated cones, and is solved at scale by an
        iterated-local-search matheuristic whose evaluation oracle is a small SOCP.
        Calibrated on a real-world UAV platform, the approach scales to 200-node
        Solomon-derived instances.
      </p>
      <div class="paper-links">
        <a class="paper-link" href="https://github.com/kirtisoglu/UAV-Routing" target="_blank" rel="noopener">GitHub →</a>
      </div>
    </div>

    <div class="paper-divider"></div>

    <!-- Paper 4: Diffusion model redistricting -->
    <div class="paper">
      <div class="paper-meta">
        <span class="paper-num">4.</span>
        <span class="paper-status submitting">Preparing for Submission</span>
        <span class="paper-type">Research Paper</span>
      </div>
      <h3 class="paper-title">
        A Diffusion Model for Political Redistricting
      </h3>
      <p class="paper-venue">Alaittin Kirtisoglu</p>
      <p class="paper-abstract">
        ReCom variants, the dominant MCMC methods for political redistricting, are
        computationally efficient but geometrically blind. We propose a hybrid sampler that
        complements ReCom with a kernel-aware local-refinement step, based on a
        graph-diffusion energy formulated as an integer quadratic program. Our results show
        that the hybrid model admits configurable Laplacian kernels (perimeter, density,
        demographic) plus a fidelity term that anchors refinement near the current
        partition. On Iowa precincts, the integer variant reduces mean cut edges by 23.9%
        vs. ReCom.
      </p>
      <div class="paper-links">
        <a class="paper-link" href="https://github.com/kirtisoglu/Redistricting_Diffusion_Model" target="_blank" rel="noopener">GitHub →</a>
      </div>
    </div>

    <div class="paper-divider"></div>

    <!-- Paper 5: Chicago Healthcare -->
    <div class="paper">
      <div class="paper-meta">
        <span class="paper-num">5.</span>
        <span class="paper-status testing">In Progress</span>
        <span class="paper-type">Research Paper &amp; Dashboard</span>
      </div>
      <h3 class="paper-title">
        <a href="/research/chicago-healthcare-network/">Optimization-Based Decision Support for Equitable Expansion of Federally Qualified Health Centers in Chicago</a>
      </h3>
      <p class="paper-venue">with Hemanshu Kaul</p>
      <p class="paper-abstract">
        We identify four critical gaps in the current HRSA's granting system for Federally
        Qualified Health Centers (FQHCs): the absence of location-evaluation tools; an
        outdated Index of Medical Underservice (IMU) formula; a limited Medically
        Underserved Area (MUA) designation process; and unmapped referral networks between
        FQHCs and hospitals. We show how optimization can address each. Integrating a
        flow-based model into the FalCom sampler, we design catchment areas and
        hospital-anchored health zones that satisfy HRSA's compliance requirements while
        balancing demand and capacity, and improving real-time transportation accessibility.
        We also propose an updated IMU formula, and outline a follow-up effort to map
        Chicago's physician referral network. To the best of our knowledge, this is the
        first paper bringing solutions from operations research to the location decisions
        of FQHCs.
      </p>
      <div class="paper-links">
        <a class="paper-link" href="https://github.com/kirtisoglu/Chicago-Healthcare-Network" target="_blank" rel="noopener">GitHub →</a>
      </div>
      <div class="paper-tools">
        <span class="tools-label">Tools:</span>
        <a class="tool-link" href="/research/chicago-healthcare-network/">Healthcare Accessibility Dashboard →</a>
      </div>
    </div>

  </section>

  <div class="divider"></div>

  <!-- Talks -->
  <section id="talks" class="section" in:fly={{ y: 30, duration: 500, delay: 400 }}>
    <h2 class="section-title">Talks</h2>

    <div class="talk">
      <div class="talk-meta">
        <span class="talk-date">May 2026</span>
        <span class="talk-venue">Middle East Technical University, Industrial Engineering Departmental Seminars, Ankara</span>
      </div>
      <h3 class="talk-title">Sampling Solutions for Districting Problems and Hierarchical Facility Location Solutions with Real-World Applications</h3>
    </div>

    <div class="talk">
      <div class="talk-meta">
        <span class="talk-date">May 2026</span>
        <span class="talk-venue"><a href="https://isco2026.com.tr/" target="_blank" rel="noopener">ISCO 2026</a>, Kusadasi, Turkey</span>
      </div>
      <h3 class="talk-title">Sampling Solutions for Districting Problems and Hierarchical Facility Location Solutions with Real-World Applications</h3>
    </div>

    <div class="talk">
      <div class="talk-meta">
        <span class="talk-date">Apr 2026</span>
        <span class="talk-venue">Illinois Institute of Technology, Discrete Math Seminars, Chicago</span>
      </div>
      <h3 class="talk-title">UAV Routing for Maximum Information Collection under Time Windows</h3>
    </div>

    <div class="talk">
      <div class="talk-meta">
        <span class="talk-date">Aug 2021</span>
        <span class="talk-venue">British Combinatorial Conference, Online</span>
      </div>
      <h3 class="talk-title">Coloring of Graphs Avoiding Bicolored Paths of a Fixed Length</h3>
    </div>

    <div class="talk">
      <div class="talk-meta">
        <span class="talk-date">Jul 2021</span>
        <span class="talk-venue">SIAM Conference on Discrete Mathematics, Online</span>
      </div>
      <h3 class="talk-title">Coloring of Graphs Avoiding Bicolored Paths of a Fixed Length</h3>
    </div>

    <div class="talk">
      <div class="talk-meta">
        <span class="talk-date">Jun 2021</span>
        <span class="talk-venue">European Combinatorial Conference, Online</span>
      </div>
      <h3 class="talk-title">Coloring of Graphs Avoiding Bicolored Paths of a Fixed Length</h3>
    </div>

  </section>

</div>

<Head/>

<style>
  .page {
    padding: 1.5rem 0 5rem;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  :global(html) { scroll-behavior: smooth; scroll-padding-top: 5rem; }

  /* ── Section nav (anchor links) ── */
  .section-nav {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: 1rem 0 0;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .section-nav a {
    color: #6b7280;
    text-decoration: none;
    padding: 0.25rem 0;
    border-bottom: 1px solid transparent;
    transition: color 0.15s, border-color 0.15s;
  }

  .section-nav a:hover {
    color: #4f46e5;
    border-bottom-color: #c7d2fe;
  }

  .section-nav-sep {
    color: #d1d5db;
  }

  :global(.dark) .section-nav a { color: rgba(255,255,255,0.5); }
  :global(.dark) .section-nav a:hover { color: #a5b4fc; border-bottom-color: rgba(165,180,252,0.4); }
  :global(.dark) .section-nav-sep { color: rgba(255,255,255,0.2); }

  /* ── Intro ── */
  .intro {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
  }

  .intro-text {
    flex: 1;
  }

  .graph-deco {
    width: 250px;
    flex-shrink: 0;
    opacity: 0.85;
    align-self: flex-end;
    margin-right: 1.5rem;
    margin-bottom: 1rem;
  }

  :global(.dark) .graph-deco line {
    stroke: rgba(255,255,255,0.08);
  }

  :global(.dark) .graph-deco circle[r="2.5"] {
    fill: rgba(255,255,255,0.25);
  }

  @media (max-width: 640px) {
    .intro { flex-direction: column; }
    .graph-deco { width: 160px; align-self: center; }
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
    margin: 0 0 1.75rem;
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

  .paper-num {
    font-size: 0.85rem;
    font-weight: 700;
    color: #6b7280;
    min-width: 1.2rem;
  }

  :global(.dark) .paper-num { color: rgba(255,255,255,0.35); }

  .paper-status {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 0.18rem 0.55rem;
    border-radius: 99px;
  }

  .paper-status.published  { background: #dcfce7; color: #15803d; }
  .paper-status.preprint   { background: #ccfbf1; color: #0f766e; }
  .paper-status.submitted  { background: #dbeafe; color: #1e40af; }
  .paper-status.submitting { background: #e0e7ff; color: #4338ca; }
  .paper-status.testing    { background: #fef9c3; color: #a16207; }
  .paper-status.design     { background: #fce7f3; color: #9d174d; }

  :global(.dark) .paper-status.published  { background: rgba(21,128,61,0.15);  color: #86efac; }
  :global(.dark) .paper-status.preprint   { background: rgba(15,118,110,0.18); color: #5eead4; }
  :global(.dark) .paper-status.submitted  { background: rgba(30,64,175,0.18);  color: #93c5fd; }
  :global(.dark) .paper-status.submitting { background: rgba(67,56,202,0.15);  color: #a5b4fc; }
  :global(.dark) .paper-status.testing    { background: rgba(161,98,7,0.15);   color: #fde047; }
  :global(.dark) .paper-status.design     { background: rgba(157,23,77,0.15);  color: #f9a8d4; }

  .paper-type {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #9ca3af;
  }

  :global(.dark) .paper-type { color: rgba(255,255,255,0.3); }

  .paper-venue {
    font-size: 0.82rem;
    color: #9ca3af;
    margin: 0;
    font-style: italic;
  }

  :global(.dark) .paper-venue { color: rgba(255,255,255,0.38); }

  .paper-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
    line-height: 1.35;
  }

  .paper-title a {
    color: inherit;
    text-decoration: none;
    font-weight: inherit;
  }

  .paper-title a:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
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

  .tool-coming {
    font-size: 0.82rem;
    color: #9ca3af;
    font-style: italic;
  }

  :global(.dark) .tool-coming { color: rgba(255,255,255,0.3); }

  .bibtex-btn {
    font-size: 0.78rem;
    font-family: monospace;
    font-weight: 500;
    color: #6b7280;
    background: none;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    padding: 0.15rem 0.55rem;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
  }

  .bibtex-btn:hover {
    color: #111827;
    border-color: #9ca3af;
  }

  :global(.dark) .bibtex-btn {
    color: rgba(255,255,255,0.45);
    border-color: rgba(255,255,255,0.15);
  }

  :global(.dark) .bibtex-btn:hover {
    color: rgba(255,255,255,0.85);
    border-color: rgba(255,255,255,0.3);
  }

  .paper-divider {
    height: 1px;
    background: rgba(0,0,0,0.05);
  }

  :global(.dark) .paper-divider { background: rgba(255,255,255,0.05); }

  /* ── Talks ── */
  .talk {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .talk-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
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
    margin: 0;
    line-height: 1.4;
  }

  :global(.dark) .talk-title { color: rgba(255,255,255,0.6); }

  /* ── Mobile ── */
  @media (max-width: 640px) {
    .page {
      padding: 2rem 1.25rem 4rem;
    }
  }
</style>
