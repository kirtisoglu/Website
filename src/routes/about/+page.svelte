<script>
  import { fly, fade } from "svelte/transition";
  import Head from "../../components/Head.svelte";
  import HiddenLinks from "../../components/HiddenLinks.svelte";

  let emailCopied = false;
  function copyEmail() {
    navigator.clipboard.writeText('akirtisoglu@hawk.iit.edu').then(() => {
      emailCopied = true;
      setTimeout(() => { emailCopied = false; }, 2000);
    });
  }
</script>

<div class="page" in:fade={{ duration: 500, delay: 200 }}>

  <!-- Hero / Intro -->
  <section class="hero" in:fly={{ y: 40, duration: 500, delay: 300 }}>
    <h1>Alaittin Kirtisoglu</h1>
    <p class="subtitle">
      Ph.D. Candidate in Applied Mathematics · Illinois Institute of Technology
    </p>
    <p class="intro-body">
      I'm a fifth-year Ph.D. student in <a href="https://www.iit.edu/applied-math" target="_blank" rel="noopener">Applied Mathematics</a> at IIT,
      a member of the <a href="https://www.math.iit.edu/~kaul/DAM/DAM.html" target="_blank" rel="noopener">Discrete Applied Mathematics Group</a>,
      and a Teaching Assistant. My research lies at the intersection of graph theory,
      algorithmic optimization, and computational methods for complex, data-driven problems
      in mathematics and applied sciences.
    </p>
    <span class="cv-download cv-disabled">
      Download CV (PDF) — coming soon
    </span>
  </section>

  <div class="divider"></div>

  <!-- Research Interests -->
  <section class="cv-section" in:fly={{ y: 30, duration: 500, delay: 750 }}>
    <h2 class="section-title">Research Interests</h2>
    <ul class="interest-list">
      <li>Optimization &amp; Algorithm Design</li>
      <li>Graph Theory</li>
      <li>Resource Allocation</li>
      <li>Equitable Network Design</li>
    </ul>
  </section>

  <div class="divider"></div>

  <!-- Education -->
  <section class="cv-section" in:fly={{ y: 30, duration: 500, delay: 450 }}>
    <h2 class="section-title">Education</h2>
    <div class="entries">

      <div class="entry">
        <div class="entry-meta">
          <span class="degree">Ph.D. in Applied Mathematics</span>
          <span class="badge">2026</span>
        </div>
        <span class="institution">
          <a href="https://www.iit.edu/" target="_blank" rel="noopener">Illinois Institute of Technology, Chicago, IL</a>
        </span>
        <span class="detail">Advisor: <a href="https://www.math.iit.edu/~kaul/" target="_blank" rel="noopener">Hemanshu Kaul</a></span>
      </div>

      <div class="entry">
        <div class="entry-meta">
          <span class="degree">M.Sc. in Mathematics</span>
          <span class="badge">2021</span>
        </div>
        <span class="institution">
          <a href="https://www.hacettepe.edu.tr/english/" target="_blank" rel="noopener">Hacettepe University, Ankara, Turkey</a>
        </span>
        <span class="detail">Advisor: <a href="https://ozkahya.github.io/" target="_blank" rel="noopener">Lale Özkahya</a></span>
      </div>

      <div class="entry">
        <div class="entry-meta">
          <span class="degree">B.Sc. in Mathematics</span>
          <span class="badge">2018</span>
        </div>
        <span class="institution">
          <a href="https://www.mku.edu.tr/default.aspx" target="_blank" rel="noopener">Mustafa Kemal University, Hatay, Turkey</a>
        </span>
      </div>

    </div>
  </section>

  <div class="divider"></div>

  <!-- Research Experience -->
  <section class="cv-section" in:fly={{ y: 30, duration: 500, delay: 550 }}>
    <h2 class="section-title">Work Experience</h2>
    <div class="entries">

      <div class="entry">
        <div class="entry-meta">
          <span class="degree">Graduate Teaching Assistant</span>
          <span class="institution">
          <a href="https://www.iit.edu/" target="_blank" rel="noopener">HIllinois Institute of Technology</a>
        </span>
          <span class="badge">2021-2026</span>
        </div>
      </div>

      <div class="entry">
        <div class="entry-meta">
          <span class="degree">Research Intern</span>
          <span class="org">
            <a href="https://www.fnal.gov/" target="_blank" rel="noopener">Fermi National Accelerator Laboratory</a>
            <span class="badge">2022</span>
          </span>
        </div>
        <p class="entry-desc">
          Worked with the <strong>Exa.TrkX</strong> project applying hierarchical graph neural networks
          for particle trajectory reconstruction in 3D detector data.
        </p>
      </div>
      <div class="entries">

      <div class="entry">
        <div class="entry-meta">
          <span class="degree">Graduate Teaching Assistant</span>
          <span class="org">
            <a href="https://www.tedu.edu.tr/en" target="_blank" rel="noopener">TED University</a>
            <span class="badge">2019 -2021</span>
          </span>
        </div>
      </div>

    </div>
  </section>
  <div class="divider"></div>

  <!-- Publications -->
  <section class="cv-section" in:fly={{ y: 30, duration: 500, delay: 650 }}>
    <h2 class="section-title">Publications</h2>

    <ol class="pub-list">
      <li>
        Kirtisoglu, A., &amp; Özkahya, L. (2024).
        Coloring of graphs avoiding bicolored paths of a fixed length.
        <em>Graphs and Combinatorics</em>, 40(1), 11.
        <span class="pub-tag peer">Peer-Reviewed</span>
      </li>
      <li>Kaul, H., &amp; Kirtisoglu, A. FalCom: A Sampling Method for Districting and Hierarchical Facility Location. <span class="pub-tag progress">In Progress</span></li>
      <li>Kaul, H., &amp; Kirtisoglu, A., &amp; Erwin, K. Chicago Healthcare Network — Optimization-Based Decision Support for Equitable Access. <span class="pub-tag progress">In Progress</span></li>
      <li>Kirtisoglu, A. A Diffusion Model for Political Redistricting. <span class="pub-tag progress">In Progress</span></li>
      <li>Kirtisoglu, A., Boran, M., &amp; Tural, M. UAV Routing for Maximum Information Collection under Time Windows. <span class="pub-tag progress">In Progress</span></li>
      <li>Goel, S., &amp; Kaul, H., Kirtisoglu, A., &amp; Mellacheruvu, T. Bike-Share Stations: An Equity Analysis and Location Optimization. <span class="pub-tag progress">In Progress</span></li>
    </ol>
  </section>

  <div class="divider"></div>


  <!-- Contact -->
  <section class="cv-section" in:fly={{ y: 30, duration: 500, delay: 1050 }}>
    <h2 class="section-title">Contact</h2>
    <div class="contact-grid">
      <div class="contact-row">
        <span class="contact-label">Email</span>
        <span class="email-inline">
          <a href="mailto:akirtisoglu@hawk.iit.edu">akirtisoglu@hawk.iit.edu</a>
          {#if emailCopied}
            <span class="copied-tip">Copied!</span>
          {:else}
            <button class="copy-btn" on:click={copyEmail} title="Copy email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          {/if}
        </span>
      </div>
      <div class="contact-row">
        <span class="contact-label">LinkedIn</span>
        <a href="https://www.linkedin.com/in/alaittin-kirtisoglu" target="_blank" rel="noopener">linkedin.com/in/alaittin-kirtisoglu</a>
      </div>
      <div class="contact-row">
        <span class="contact-label">GitHub</span>
        <a href="https://github.com/kirtisoglu" target="_blank" rel="noopener">github.com/kirtisoglu</a>
      </div>
      <div class="contact-row">
        <span class="contact-label">Office</span>
        <span class="contact-value">Department of Applied Mathematics, Illinois Institute of Technology, Chicago, IL</span>
      </div>
    </div>
  </section>

</div>

<Head/>
<HiddenLinks/>

<style>
  /* ── Layout ── */
  .page {
    padding: 1.5rem 0 5rem;
  }

  /* ── Hero ── */
  .hero {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 2rem;
  }

  .hero h1 {
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0 0 0.2rem;
    line-height: 1.2;
    color: #111827;
  }

  .subtitle {
    font-size: 0.9rem;
    color: #6b7280;
    margin: 0 0 1rem;
    letter-spacing: 0.01em;
  }

  .intro-body,
  .body-text {
    font-size: 0.95rem;
    line-height: 1.75;
    color: #374151;
    margin: 0;
  }

  .cv-download {
    display: inline-block;
    margin-top: 1rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: #4f46e5;
    text-decoration: none;
    letter-spacing: 0.01em;
  }

  .cv-download:hover {
    text-decoration: underline;
  }

  .cv-disabled {
    color: #9ca3af;
    cursor: default;
    pointer-events: none;
  }

  :global(.dark) .cv-disabled {
    color: #4b5563;
  }

  :global(.dark) .cv-download {
    color: #818cf8;
  }

  /* ── Divider ── */
  .divider {
    height: 1px;
    background: #e5e7eb;
    margin: 2rem 0;
  }

  /* ── Sections ── */
  .cv-section {
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

  /* ── Entries ── */
  .entries {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
  }

  .entry {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .entry-meta {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    flex-wrap: wrap;
  }

  .degree {
    font-weight: 600;
    font-size: 0.95rem;
    color: #111827;
  }

  .org {
    font-size: 0.88rem;
    color: #6b7280;
  }

  .badge {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    background: #eef2ff;
    color: #4f46e5;
    border: 1px solid #c7d2fe;
    border-radius: 4px;
    padding: 1px 7px;
    text-transform: uppercase;
  }

  .institution {
    font-size: 0.9rem;
    color: #374151;
  }

  .detail {
    font-size: 0.85rem;
    color: #9ca3af;
  }

  .entry-desc {
    font-size: 0.92rem;
    color: #374151;
    margin: 0.2rem 0 0;
    line-height: 1.65;
  }

  .bullets {
    margin: 0.35rem 0 0 1.1rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .bullets li {
    font-size: 0.9rem;
    color: #4b5563;
    line-height: 1.6;
  }

  /* ── Publications ── */
  .pub-category {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    color: #9ca3af;
    text-transform: uppercase;
    margin: 0.25rem 0 0.4rem;
  }

  .pub-list {
    margin: 0 0 0.5rem 1.2rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .pub-list li {
    font-size: 0.92rem;
    color: #374151;
    line-height: 1.65;
  }

  .pub-list em {
    font-style: italic;
    color: #6b7280;
  }

  .pub-tag {
    display: inline-block;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.1rem 0.45rem;
    border-radius: 99px;
    vertical-align: middle;
    margin-left: 0.35rem;
  }

  .pub-tag.peer     { background: #dcfce7; color: #15803d; }
  .pub-tag.progress { background: #e0e7ff; color: #4338ca; }

  :global(.dark) .pub-tag.peer     { background: rgba(21,128,61,0.15); color: #86efac; }
  :global(.dark) .pub-tag.progress { background: rgba(67,56,202,0.15); color: #a5b4fc; }

  /* ── Research Interests ── */
  .interest-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .interest-list li {
    font-size: 0.88rem;
    background: #f5f3ff;
    border: 1px solid #ddd6fe;
    border-radius: 4px;
    padding: 0.3rem 0.75rem;
    color: #4338ca;
  }

  /* ── Skills ── */
  .skills-grid {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .skill-group {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .skill-label {
    font-size: 0.78rem;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    min-width: 70px;
    padding-top: 0.3rem;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .tag {
    font-size: 0.83rem;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    padding: 0.22rem 0.6rem;
    color: #374151;
  }

  /* ── Links ── */
  a {
    color: #4f46e5;
    text-decoration: none;
  }
  a:hover {
    color: #3730a3;
    text-decoration: underline;
  }

  /* ── Dark mode ── */
  :global(.dark) .hero h1,
  :global(.dark) .degree {
    color: #f9fafb;
  }

  :global(.dark) .subtitle,
  :global(.dark) .org,
  :global(.dark) .detail,
  :global(.dark) .pub-category,
  :global(.dark) .skill-label {
    color: #6b7280;
  }

  :global(.dark) .intro-body,
  :global(.dark) .body-text,
  :global(.dark) .institution,
  :global(.dark) .entry-desc,
  :global(.dark) .pub-list li,
  :global(.dark) .bullets li {
    color: rgba(255,255,255,0.78);
  }

  :global(.dark) .divider {
    background: rgba(255,255,255,0.08);
  }

  :global(.dark) .section-title {
    color: #818cf8;
  }

  :global(.dark) .badge {
    background: rgba(129,140,248,0.12);
    color: #818cf8;
    border-color: rgba(129,140,248,0.3);
  }

  :global(.dark) .interest-list li {
    background: rgba(129,140,248,0.08);
    border-color: rgba(129,140,248,0.2);
    color: #a5b4fc;
  }

  :global(.dark) .tag {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.75);
  }

  :global(.dark) a {
    color: #818cf8;
  }
  :global(.dark) a:hover {
    color: #a5b4fc;
  }

  :global(.dark) .pub-list em {
    color: rgba(255,255,255,0.5);
  }

  /* ── Contact ── */
  .contact-grid {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .contact-row {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .email-inline {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .copy-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: #9ca3af;
    display: flex;
    align-items: center;
    transition: color 0.15s;
  }
  .copy-btn svg { width: 13px; height: 13px; }
  .copy-btn:hover { color: #4f46e5; }

  .copied-tip {
    font-size: 0.72rem;
    color: #22c55e;
    white-space: nowrap;
  }

  :global(.dark) .copy-btn { color: rgba(255,255,255,0.3); }
  :global(.dark) .copy-btn:hover { color: #818cf8; }

  .contact-label {
    font-size: 0.78rem;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    min-width: 70px;
    flex-shrink: 0;
  }

  .contact-value {
    font-size: 0.9rem;
    color: #374151;
  }

  :global(.dark) .contact-value {
    color: rgba(255,255,255,0.75);
  }

  /* ── Mobile ── */
  @media (max-width: 640px) {
    .page {
      padding: 1rem 0 4rem;
    }

    .hero h1,
    .subtitle {
      display: none;
    }

    .interest-list {
      justify-content: center;
    }

    .skill-group {
      flex-direction: column;
      gap: 0.4rem;
    }
  }
</style>
