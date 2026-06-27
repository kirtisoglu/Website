<script>
  import { fly, fade } from "svelte/transition";
  import Head from "../../../components/Head.svelte";

  let copiedEmail = '';
  function copyEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
      copiedEmail = email;
      setTimeout(() => { copiedEmail = ''; }, 1500);
    });
  }
</script>

<svelte:head>
  <title>Research Portfolio — Alaittin Kirtisoglu</title>
  <meta name="description" content="Research portfolio — Alaittin Kirtisoglu. PhD candidate at Illinois Institute of Technology working on MCMC sampling for hierarchical capacitated districting and equitable healthcare access." />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="page" in:fade={{ duration: 500, delay: 100 }}>

  <div class="privacy-note" in:fade={{ duration: 400, delay: 150 }}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    <p>
      This page is shared by direct link only and is not publicly listed.
      It includes unpublished manuscripts and research plans. Please keep
      the link and materials private.
    </p>
  </div>

  <!-- Hero -->
  <section class="hero" in:fly={{ y: 30, duration: 500, delay: 200 }}>
    <div class="hero-text">
      <p class="eyebrow">Research Portfolio</p>
      <h1>Alaittin Kirtisoglu</h1>
      <p class="subtitle">PhD Candidate in Applied Mathematics · Illinois Institute of Technology</p>
      <p class="lead">
        My main doctoral research, <em>FalCom</em>, is the first Markov chain
        Monte Carlo method that samples ensembles of feasible service-region
        designs at city or national scale — partitioning a geographic region
        into contiguous, demand-balanced districts at multiple administrative
        levels, with a capacitated facility or service team in each district.
        Its generality and scalability extend to a range of operational
        problems in healthcare, logistics, and public service delivery.
        Sampling ensembles enables robustness analysis, rather than returning
        a single optimal solution.
      </p>
    </div>
    <div class="hero-media">
      <video src="/falcom-gif/falcom_linkedin.mp4" autoplay muted loop playsinline
             aria-label="FalCom — sampling for districting and hierarchical facility location."
             title="FalCom — sampling for districting and hierarchical facility location."></video>
    </div>
  </section>

  <nav class="section-nav" in:fade={{ duration: 400, delay: 300 }}>
    <a href="#documents">Documents</a><span class="sep">·</span>
    <a href="#papers">Papers</a><span class="sep">·</span>
    <a href="#software">Software</a><span class="sep">·</span>
    <a href="#talks">Talks</a><span class="sep">·</span>
    <a href="#references">References</a>
  </nav>

  <div class="divider"></div>

  <!-- Documents -->
  <section id="documents" class="section" in:fly={{ y: 25, duration: 500, delay: 400 }}>
    <h2 class="section-title">Documents</h2>
    <div class="doc-list">
      <a class="doc" href="/docs/cover-letter.pdf" target="_blank" rel="noopener">
        <div class="doc-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div class="doc-body">
          <div class="doc-title">Cover letter</div>
          <div class="doc-desc">Introduction to my candidacy and fit for the position.</div>
        </div>
        <span class="doc-action">PDF →</span>
      </a>

      <a class="doc" href="/cv.pdf" target="_blank" rel="noopener">
        <div class="doc-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div class="doc-body">
          <div class="doc-title">Curriculum vitae</div>
          <div class="doc-desc">Full academic CV — education, publications, talks, teaching, and service.</div>
        </div>
        <span class="doc-action">PDF →</span>
      </a>

      <a class="doc" href="/docs/research-statement.pdf" target="_blank" rel="noopener">
        <div class="doc-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div class="doc-body">
          <div class="doc-title">Research statement</div>
          <div class="doc-desc">Past and ongoing research, methodology, and forward directions.</div>
        </div>
        <span class="doc-action">PDF →</span>
      </a>

      <a class="doc" href="/docs/falcom-writing-sample.pdf" target="_blank" rel="noopener">
        <div class="doc-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div class="doc-body">
          <div class="doc-title">Writing sample 1</div>
          <div class="doc-desc">FalCom — sampling for hierarchical districting and capacitated facility location.</div>
        </div>
        <span class="doc-action">PDF →</span>
      </a>

      <a class="doc" href="/docs/chicago-healthcare-writing-sample.pdf" target="_blank" rel="noopener">
        <div class="doc-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div class="doc-body">
          <div class="doc-title">Writing sample 2</div>
          <div class="doc-desc">Optimization-based decision support for equitable expansion of FQHCs in Chicago.</div>
        </div>
        <span class="doc-action">PDF →</span>
      </a>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Papers -->
  <section id="papers" class="section" in:fly={{ y: 25, duration: 500, delay: 450 }}>
    <h2 class="section-title">Papers</h2>

    <div class="work-list">
      <div class="work">
        <div class="work-head">
          <span class="status published">Published</span>
          <h3>Coloring of Graphs Avoiding Bicolored Paths of a Fixed Length</h3>
        </div>
        <p class="authors">Kirtisoglu, A. &amp; Özkahya, L. · Graphs and Combinatorics, 40(1), Art. 11, 2024</p>
        <p class="abstract">
          Introduces the P<sub>k</sub>-chromatic number s<sub>k</sub>(G), the
          minimum number of colors in a proper vertex coloring that avoids
          bicolored paths of length k. For any graph with maximum degree
          d &ge; 2 and k &ge; 4, establishes s<sub>k</sub>(G) =
          O(d<sup>(k&minus;1)/(k&minus;2)</sup>), and computes exact values
          for products of cycles and paths when k = 5, 6. Generalizes
          classical star and acyclic coloring, and connects chromatic theory
          with Ramsey-type structural questions.
        </p>
        <div class="links">
          <a href="https://link.springer.com/article/10.1007/s00373-023-02739-4" target="_blank" rel="noopener">Journal</a>
          <a href="https://arxiv.org/abs/2012.04560" target="_blank" rel="noopener">arXiv</a>
        </div>
      </div>

      <div class="work">
        <div class="work-head">
          <span class="status preprint">Preprint</span>
          <h3>FalCom: A Sampling Method for Districting and Hierarchical Facility Location</h3>
        </div>
        <p class="authors">Kirtisoglu, A. &amp; Kaul, H. · Manuscript, 2026</p>
        <p class="abstract">
          First MCMC framework for hierarchical capacitated facility location
          and districting. Extends the ReCom spanning-tree proposal from
          single-level political redistricting to multi-level service systems
          with capacity bounds, demand balance, and facility-aware cut
          selection. Scales to graphs of 50,000 basic units, an order of
          magnitude beyond published hierarchical methods. Rather than a
          single optimum, FalCom samples ensembles of feasible plans, enabling
          boundary-robustness maps, essential-vs-substitutable facility
          analysis, and capacity-utilization distributions. Validated on
          synthetic grids and a London Ambulance Service case study; released
          as an open-source Python library with an interactive visualizer.
        </p>
        <div class="links">
          <a href="/papers/falcom.pdf" target="_blank" rel="noopener">PDF</a>
          <a href="https://github.com/kirtisoglu/FalcomChain" target="_blank" rel="noopener">GitHub</a>
          <a href="/research/falcom/">Project page</a>
        </div>
      </div>

      <div class="work">
        <div class="work-head">
          <span class="status preprint">Preprint</span>
          <h3>UAV Routing for Maximum Information Collection under Time Windows and Energy Consumption</h3>
        </div>
        <p class="authors">Kirtisoglu, A., Boran, M. &amp; Tural, M. · Manuscript, 2026</p>
        <p class="abstract">
          Exact convex-optimization framework for UAV reconnaissance routing
          under time windows, time-dependent rewards, and a nonlinear energy
          budget. Jointly selects targets, visit order, per-arc travel speed,
          and a separate loitering time at the minimum-power speed, correctly
          capturing fixed-wing aerodynamics. The resulting MINLP is
          reformulated exactly as a mixed-integer second-order cone program
          via a chain of three rotated cones, and solved by an
          iterated-local-search matheuristic whose evaluation oracle is a
          small SOCP. Calibrated on a real-world UAV platform; scales to
          200-node Solomon-derived instances.
        </p>
        <div class="links">
          <a href="/papers/uav-routing.pdf" target="_blank" rel="noopener">PDF</a>
          <a href="https://github.com/kirtisoglu/UAV-Routing" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>

      <div class="work">
        <div class="work-head">
          <span class="status preparing">Preparing for Submission</span>
          <h3>A Diffusion Model for Political Redistricting</h3>
        </div>
        <p class="authors">Kirtisoglu, A. · Manuscript, 2026</p>
        <p class="abstract">
          ReCom variants, the dominant MCMC methods for political
          redistricting, are computationally efficient but geometrically
          blind. Proposes a hybrid sampler that complements ReCom with a
          kernel-aware local-refinement step formulated as an integer
          quadratic program. The hybrid admits configurable Laplacian kernels
          (perimeter, density, demographic) plus a fidelity term that anchors
          refinement near the current partition. On Iowa precincts, the
          integer variant reduces mean cut edges by 23.9% vs. ReCom.
        </p>
        <div class="links">
          <a href="/papers/diffusion-redistricting.pdf" target="_blank" rel="noopener">PDF</a>
          <a href="https://github.com/kirtisoglu/Redistricting_Diffusion_Model" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>

      <div class="work">
        <div class="work-head">
          <span class="status in-progress">In Progress</span>
          <h3>Optimization-Based Decision Support for Equitable Expansion of FQHCs in Chicago</h3>
        </div>
        <p class="authors">Kirtisoglu, A. &amp; Kaul, H. · Manuscript + deployed dashboard, 2026</p>
        <p class="abstract">
          Identifies four critical gaps in HRSA's granting system for
          Federally Qualified Health Centers: absence of location-evaluation
          tools, an outdated Index of Medical Underservice (IMU) formula, a
          limited Medically Underserved Area (MUA) designation process, and
          unmapped referral networks between FQHCs and hospitals. Shows how
          optimization can address each. Integrates a flow-based model
          into the FalCom sampler to design catchment areas and
          hospital-anchored health zones that satisfy HRSA's compliance
          requirements while balancing demand, capacity, and real-time
          transportation accessibility. To our knowledge, the first paper
          applying operations research to FQHC location decisions.
        </p>
        <div class="links">
          <a href="/papers/chicago-fqhc.pdf" target="_blank" rel="noopener">PDF</a>
          <a href="/research/chicago-healthcare-network/">Project page</a>
          <a href="/research/chicago-healthcare-network/dashboard">Live dashboard</a>
        </div>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Software -->
  <section id="software" class="section" in:fly={{ y: 25, duration: 500, delay: 500 }}>
    <h2 class="section-title">Software &amp; infrastructure</h2>
    <div class="sw-list">
      <div class="sw">
        <div class="sw-main">
          <span class="sw-name">FalcomChain</span>
          <span class="sw-tag">Python · MCMC sampler</span>
        </div>
        <a class="sw-link" href="https://github.com/kirtisoglu/FalcomChain" target="_blank" rel="noopener">GitHub →</a>
      </div>
      <div class="sw">
        <div class="sw-main">
          <span class="sw-name">FalcomPlot</span>
          <span class="sw-tag">Python + JS · visualization</span>
        </div>
        <a class="sw-link" href="https://github.com/kirtisoglu/FalcomPlot" target="_blank" rel="noopener">GitHub →</a>
      </div>
      <div class="sw">
        <div class="sw-main">
          <span class="sw-name">FalcomTravel</span>
          <span class="sw-tag">R · transit travel-time matrices</span>
        </div>
        <a class="sw-link" href="https://github.com/kirtisoglu/FalcomTravel" target="_blank" rel="noopener">GitHub →</a>
      </div>
      <div class="sw">
        <div class="sw-main">
          <span class="sw-name">Chicago Healthcare Dashboard</span>
          <span class="sw-tag">SvelteKit · deployed analytics</span>
        </div>
        <a class="sw-link" href="/research/chicago-healthcare-network/dashboard">Live →</a>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Talks -->
  <section id="talks" class="section" in:fly={{ y: 25, duration: 500, delay: 550 }}>
    <h2 class="section-title">Selected talks</h2>
    <div class="talks">
      <div class="talk">
        <span class="talk-date">May 2026</span>
        <span class="talk-venue">METU IE Seminar, Ankara</span>
        <span class="talk-title">Sampling Solutions for Districting Problems and Hierarchical Facility Location</span>
      </div>
      <div class="talk">
        <span class="talk-date">May 2026</span>
        <span class="talk-venue">ISCO 2026, Kusadasi</span>
        <span class="talk-title">Sampling Solutions for Districting Problems and Hierarchical Facility Location</span>
      </div>
      <div class="talk">
        <span class="talk-date">Apr 2026</span>
        <span class="talk-venue">IIT Discrete Math Seminars, Chicago</span>
        <span class="talk-title">UAV Routing for Maximum Information Collection under Time Windows</span>
      </div>
      <div class="talk">
        <span class="talk-date">2021</span>
        <span class="talk-venue">BCC · SIAM DM · European Combinatorial Conference</span>
        <span class="talk-title">Coloring of Graphs Avoiding Bicolored Paths of a Fixed Length</span>
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
        <div class="ref-email">
          <a href="mailto:kaul@iit.edu">kaul@iit.edu</a>
          <button class="copy-btn" title="Copy email" on:click={() => copyEmail('kaul@iit.edu')}>
            {#if copiedEmail === 'kaul@iit.edu'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {:else}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            {/if}
          </button>
        </div>
      </div>
      <div class="reference">
        <div class="ref-name">Mustafa Kemal Tural</div>
        <div class="ref-role">Collaborator (UAV Routing)</div>
        <div class="ref-affil">Department of Industrial Engineering, Middle East Technical University</div>
        <div class="ref-email">
          <a href="mailto:tural@metu.edu.tr">tural@metu.edu.tr</a>
          <button class="copy-btn" title="Copy email" on:click={() => copyEmail('tural@metu.edu.tr')}>
            {#if copiedEmail === 'tural@metu.edu.tr'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {:else}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            {/if}
          </button>
        </div>
      </div>
      <div class="reference">
        <div class="ref-name">Lale Özkahya</div>
        <div class="ref-role">Master's advisor</div>
        <div class="ref-affil">Department of Computer Engineering, Hacettepe University</div>
        <div class="ref-email">
          <a href="mailto:ozkahya@cs.hacettepe.edu.tr">ozkahya@cs.hacettepe.edu.tr</a>
          <button class="copy-btn" title="Copy email" on:click={() => copyEmail('ozkahya@cs.hacettepe.edu.tr')}>
            {#if copiedEmail === 'ozkahya@cs.hacettepe.edu.tr'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {:else}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            {/if}
          </button>
        </div>
      </div>
    </div>
  </section>

</div>

<style>
  .page {
    padding: 1.5rem 0 4rem;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  :global(html) { scroll-behavior: smooth; scroll-padding-top: 5rem; }

  /* ── Hero ── */
  .hero {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 1.75rem;
    align-items: center;
  }
  .hero-text { display: flex; flex-direction: column; gap: 0.55rem; min-width: 0; }
  .hero-media { min-width: 0; }
  .hero-media video {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
    background: #f3f4f6;
  }
  :global(.dark) .hero-media video { background: rgba(255,255,255,0.05); }
  @media (max-width: 720px) {
    .hero { grid-template-columns: 1fr; gap: 1rem; }
    .hero-media { max-width: 480px; }
  }
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
    font-size: clamp(1.7rem, 4.5vw, 2.4rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #111827;
    margin: 0;
    line-height: 1.15;
  }
  :global(.dark) .hero h1 { color: #f9fafb; }
  .subtitle { font-size: 0.92rem; color: #6b7280; margin: 0; }
  :global(.dark) .subtitle { color: rgba(255,255,255,0.55); }
  .lead {
    font-size: 0.96rem;
    line-height: 1.65;
    color: #4b5563;
    max-width: 720px;
    margin: 0.4rem 0 0;
  }
  :global(.dark) .lead { color: rgba(255,255,255,0.7); }

  /* ── Privacy note ── */
  .privacy-note {
    display: flex;
    align-items: flex-start;
    gap: 0.7rem;
    margin: 0 0 1.5rem;
    padding: 0.7rem 0.9rem;
    background: rgba(238,242,255,0.5);
    border: 1px solid rgba(199,210,254,0.7);
    border-radius: 6px;
  }
  .privacy-note svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: #6366f1;
    margin-top: 0.15rem;
  }
  .privacy-note p {
    font-size: 0.83rem;
    line-height: 1.5;
    color: #4338ca;
    margin: 0;
  }
  :global(.dark) .privacy-note {
    background: rgba(99,102,241,0.08);
    border-color: rgba(165,180,252,0.25);
  }
  :global(.dark) .privacy-note svg { color: #a5b4fc; }
  :global(.dark) .privacy-note p { color: #c7d2fe; }

  /* ── Section nav ── */
  .section-nav {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin: 1.2rem 0 0;
    font-size: 0.76rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    flex-wrap: wrap;
  }
  .section-nav a {
    color: #6b7280;
    text-decoration: none;
    padding: 0.2rem 0;
    border-bottom: 1px solid transparent;
    transition: color 0.15s, border-color 0.15s;
  }
  .section-nav a:hover { color: #4f46e5; border-bottom-color: #c7d2fe; }
  .sep { color: #d1d5db; }
  :global(.dark) .section-nav a { color: rgba(255,255,255,0.5); }
  :global(.dark) .section-nav a:hover { color: #a5b4fc; border-bottom-color: rgba(165,180,252,0.4); }
  :global(.dark) .sep { color: rgba(255,255,255,0.2); }

  /* ── Divider ── */
  .divider { height: 1px; background: rgba(0,0,0,0.07); margin: 1.75rem 0; }
  :global(.dark) .divider { background: rgba(255,255,255,0.07); }

  /* ── Section ── */
  .section { display: flex; flex-direction: column; gap: 1rem; }
  .section-title {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #4f46e5;
    margin: 0;
    padding-bottom: 0.4rem;
    border-bottom: 2px solid #e0e7ff;
  }
  :global(.dark) .section-title { color: #818cf8; border-bottom-color: rgba(129,140,248,0.2); }

  /* ── Selected work (compact) ── */
  .work-list { display: flex; flex-direction: column; gap: 1.25rem; }
  .work { display: flex; flex-direction: column; gap: 0.3rem; }
  .work-head { display: flex; align-items: baseline; gap: 0.6rem; flex-wrap: wrap; }
  .status {
    flex-shrink: 0;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 0.13rem 0.5rem;
    border-radius: 99px;
    line-height: 1.4;
  }
  .status.published   { background: #dcfce7; color: #15803d; }
  .status.preprint    { background: #e0e7ff; color: #4338ca; }
  .status.preparing   { background: #fef3c7; color: #92400e; }
  .status.in-progress { background: #fef9c3; color: #a16207; }
  :global(.dark) .status.published   { background: rgba(21,128,61,0.15);  color: #86efac; }
  :global(.dark) .status.preprint    { background: rgba(67,56,202,0.15);  color: #a5b4fc; }
  :global(.dark) .status.preparing   { background: rgba(146,64,14,0.15);  color: #fcd34d; }
  :global(.dark) .status.in-progress { background: rgba(161,98,7,0.15);   color: #fde047; }
  .work h3 { font-size: 0.98rem; font-weight: 700; color: #111827; margin: 0; line-height: 1.3; }
  :global(.dark) .work h3 { color: #f9fafb; }
  .authors { font-size: 0.8rem; color: #6b7280; margin: 0; font-style: italic; }
  :global(.dark) .authors { color: rgba(255,255,255,0.45); }
  .abstract {
    font-size: 0.87rem;
    line-height: 1.6;
    color: #374151;
    margin: 0.15rem 0 0;
  }
  :global(.dark) .abstract { color: rgba(255,255,255,0.7); }
  .links { display: flex; gap: 0.9rem; margin-top: 0.2rem; flex-wrap: wrap; }
  .links a { font-size: 0.82rem; font-weight: 500; color: #4f46e5; text-decoration: none; }
  .links a:hover { text-decoration: underline; }
  :global(.dark) .links a { color: #818cf8; }

  /* ── Documents ── */
  .doc-list { display: flex; flex-direction: column; gap: 0.5rem; counter-reset: doc; }
  .doc {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.7rem 0.9rem;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 8px;
    text-decoration: none;
    transition: border-color 0.15s, background 0.15s;
    counter-increment: doc;
  }
  .doc::before {
    content: counter(doc) ".";
    flex-shrink: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: #4f46e5;
    min-width: 1.3em;
    text-align: right;
  }
  :global(.dark) .doc::before { color: #818cf8; }
  .doc:hover {
    border-color: #c7d2fe;
    background: rgba(238,242,255,0.4);
  }
  :global(.dark) .doc { border-color: rgba(255,255,255,0.08); }
  :global(.dark) .doc:hover { border-color: rgba(165,180,252,0.3); background: rgba(99,102,241,0.06); }
  .doc-icon {
    width: 32px; height: 32px;
    flex-shrink: 0;
    color: #4f46e5;
  }
  :global(.dark) .doc-icon { color: #818cf8; }
  .doc-icon svg { width: 100%; height: 100%; }
  .doc-body { flex: 1; min-width: 0; }
  .doc-title { font-size: 0.95rem; font-weight: 700; color: #111827; margin-bottom: 0.1rem; }
  :global(.dark) .doc-title { color: #f9fafb; }
  .doc-desc { font-size: 0.82rem; line-height: 1.45; color: #6b7280; }
  :global(.dark) .doc-desc { color: rgba(255,255,255,0.6); }
  .doc-action {
    flex-shrink: 0;
    font-size: 0.82rem;
    font-weight: 600;
    color: #4f46e5;
  }
  :global(.dark) .doc-action { color: #818cf8; }

  /* ── Software (very compact list) ── */
  .sw-list { display: flex; flex-direction: column; gap: 0.35rem; }
  .sw {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.45rem 0.7rem;
    border-radius: 6px;
    transition: background 0.15s;
  }
  .sw:hover { background: rgba(238,242,255,0.4); }
  :global(.dark) .sw:hover { background: rgba(99,102,241,0.06); }
  .sw-main { display: flex; align-items: baseline; gap: 0.55rem; flex-wrap: wrap; min-width: 0; }
  .sw-name { font-size: 0.92rem; font-weight: 700; color: #111827; }
  :global(.dark) .sw-name { color: #f9fafb; }
  .sw-tag {
    font-size: 0.78rem;
    color: #6b7280;
  }
  :global(.dark) .sw-tag { color: rgba(255,255,255,0.5); }
  .sw-link {
    font-size: 0.82rem;
    font-weight: 500;
    color: #4f46e5;
    text-decoration: none;
    flex-shrink: 0;
  }
  .sw-link:hover { text-decoration: underline; }
  :global(.dark) .sw-link { color: #818cf8; }

  /* ── Talks ── */
  .talks { display: flex; flex-direction: column; gap: 0.5rem; }
  .talk {
    display: grid;
    grid-template-columns: 90px 1fr;
    gap: 0.5rem 1rem;
    padding: 0.4rem 0;
    border-top: 1px solid rgba(0,0,0,0.05);
    font-size: 0.85rem;
  }
  .talk:first-child { border-top: none; padding-top: 0; }
  :global(.dark) .talk { border-top-color: rgba(255,255,255,0.05); }
  .talk-date {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #6b7280;
    grid-row: span 2;
    padding-top: 0.1rem;
  }
  :global(.dark) .talk-date { color: rgba(255,255,255,0.4); }
  .talk-venue { font-size: 0.88rem; font-weight: 700; color: #111827; grid-column: 2; }
  :global(.dark) .talk-venue { color: #f9fafb; }
  .talk-title {
    font-size: 0.82rem;
    color: #4b5563;
    grid-column: 2;
    line-height: 1.4;
  }
  :global(.dark) .talk-title { color: rgba(255,255,255,0.6); }

  /* ── References ── */
  .references {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
  }
  .reference {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    padding: 0.75rem 0.9rem;
    border-left: 3px solid #c7d2fe;
    background: rgba(238,242,255,0.25);
    border-radius: 0 6px 6px 0;
  }
  :global(.dark) .reference {
    border-left-color: rgba(165,180,252,0.4);
    background: rgba(99,102,241,0.04);
  }
  .ref-name { font-size: 0.95rem; font-weight: 700; color: #111827; }
  :global(.dark) .ref-name { color: #f9fafb; }
  .ref-role {
    font-size: 0.72rem;
    font-weight: 600;
    color: #6366f1;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  :global(.dark) .ref-role { color: #a5b4fc; }
  .ref-affil { font-size: 0.83rem; color: #4b5563; line-height: 1.4; margin-top: 0.1rem; }
  :global(.dark) .ref-affil { color: rgba(255,255,255,0.65); }
  .ref-email {
    font-size: 0.85rem;
    margin-top: 0.2rem;
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }
  .ref-email a { color: #4f46e5; text-decoration: none; }
  .ref-email a:hover { text-decoration: underline; }
  :global(.dark) .ref-email a { color: #818cf8; }
  .copy-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: #9ca3af;
    cursor: pointer;
    transition: color 0.15s, background 0.15s;
  }
  .copy-btn:hover { color: #4f46e5; background: rgba(79,70,229,0.08); }
  .copy-btn svg { width: 13px; height: 13px; display: block; }
  :global(.dark) .copy-btn { color: rgba(255,255,255,0.4); }
  :global(.dark) .copy-btn:hover { color: #a5b4fc; background: rgba(165,180,252,0.1); }

  /* ── Mobile ── */
  @media (max-width: 640px) {
    .page { padding: 2rem 1.25rem 4rem; }
    .talk { grid-template-columns: 1fr; }
    .talk-date { grid-row: 1; }
    .talk-venue { grid-column: 1; }
    .talk-title { grid-column: 1; }
  }
</style>
