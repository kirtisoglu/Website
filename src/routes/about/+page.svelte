<script>
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import Head from "../../components/Head.svelte";
  import HiddenLinks from "../../components/HiddenLinks.svelte";

  let visible = false;
  onMount(() => { visible = true; });
</script>

{#if visible}
<div class="page" in:fade={{ duration: 500, delay: 200 }}>

  <!-- Hero / Intro -->
  <section class="hero" in:fly={{ y: 40, duration: 500, delay: 300 }}>
    <img src="/about/portrait.webp" alt="Alaittin Kirtisoglu" class="portrait" />
    <div class="hero-text">
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
    </div>
  </section>

  <div class="divider"></div>

  <!-- Education -->
  <section class="cv-section" in:fly={{ y: 30, duration: 500, delay: 450 }}>
    <h2 class="section-title">Education</h2>
    <div class="entries">

      <div class="entry">
        <div class="entry-meta">
          <span class="degree">Ph.D. in Applied Mathematics</span>
          <span class="badge">In Progress</span>
        </div>
        <span class="institution">
          <a href="https://www.iit.edu/" target="_blank" rel="noopener">Illinois Institute of Technology</a>
        </span>
        <span class="detail">Advisor: <a href="https://www.math.iit.edu/~kaul/" target="_blank" rel="noopener">Hemanshu Kaul</a></span>
      </div>

      <div class="entry">
        <div class="entry-meta">
          <span class="degree">M.Sc. in Mathematics — Graph Theory</span>
        </div>
        <span class="institution">
          <a href="https://www.hacettepe.edu.tr/english/" target="_blank" rel="noopener">Hacettepe University</a>
        </span>
        <span class="detail">Supervisor: <a href="https://ozkahya.github.io/" target="_blank" rel="noopener">Lale Özkahya</a></span>
      </div>

      <div class="entry">
        <div class="entry-meta">
          <span class="degree">B.Sc. in Mathematics</span>
        </div>
        <span class="institution">
          <a href="https://www.mku.edu.tr/default.aspx" target="_blank" rel="noopener">Mustafa Kemal University</a>
        </span>
      </div>

    </div>
  </section>

  <div class="divider"></div>

  <!-- Research Experience -->
  <section class="cv-section" in:fly={{ y: 30, duration: 500, delay: 550 }}>
    <h2 class="section-title">Research Experience</h2>
    <div class="entries">

      <div class="entry">
        <div class="entry-meta">
          <span class="degree">Graduate Researcher</span>
          <span class="org">Illinois Institute of Technology</span>
        </div>
        <ul class="bullets">
          <li>Developing computational frameworks leveraging graph-based models and optimization techniques to solve structured data problems.</li>
          <li>Methods include algorithm design, simulation, and rigorous performance evaluation.</li>
        </ul>
      </div>

      <div class="entry">
        <div class="entry-meta">
          <span class="degree">Research Intern</span>
          <span class="org">
            <a href="https://www.fnal.gov/" target="_blank" rel="noopener">Fermi National Accelerator Laboratory</a>
          </span>
        </div>
        <p class="entry-desc">
          Worked with the <strong>Exa.TrkX</strong> project applying hierarchical graph neural networks
          for particle trajectory reconstruction in 3D detector data.
        </p>
        <ul class="bullets">
          <li>Defined a density-based hierarchical clustering algorithm to support downstream message-passing models.</li>
          <li>Results contributed to more accurate particle identification for precision measurements in neutrino physics.</li>
        </ul>
      </div>

    </div>
  </section>

  <div class="divider"></div>

  <!-- Publications -->
  <section class="cv-section" in:fly={{ y: 30, duration: 500, delay: 650 }}>
    <h2 class="section-title">Publications</h2>

    <h3 class="pub-category">Peer-Reviewed</h3>
    <ol class="pub-list">
      <li>
        Kirtisoglu, A., &amp; Özkahya, L. (2024).
        Coloring of graphs avoiding bicolored paths of a fixed length.
        <em>Graphs and Combinatorics</em>, 40(1), 11.
      </li>
    </ol>

    <h3 class="pub-category">In Preparation</h3>
    <ol class="pub-list">
      <li>
        Kaul, H., &amp; Kirtisoglu, A. (in preparation).
        Designing an equitable primary care network: Chicago case study.
      </li>
    </ol>
  </section>

  <div class="divider"></div>

  <!-- Research Interests -->
  <section class="cv-section" in:fly={{ y: 30, duration: 500, delay: 750 }}>
    <h2 class="section-title">Research Interests</h2>
    <ul class="interest-list">
      <li>Graph Theory and Combinatorics</li>
      <li>Algorithm Design &amp; Optimization</li>
      <li>Computational Methods &amp; Machine Learning for Structured Data</li>
      <li>Equitable Network Design</li>
    </ul>
  </section>

  <div class="divider"></div>

  <!-- Skills -->
  <section class="cv-section" in:fly={{ y: 30, duration: 500, delay: 850 }}>
    <h2 class="section-title">Skills</h2>
    <div class="skills-grid">
      <div class="skill-group">
        <span class="skill-label">Technical</span>
        <span class="skill-tags">
          <span class="tag">Python</span>
          <span class="tag">Graph Algorithms</span>
          <span class="tag">Optimization Libraries</span>
          <span class="tag">Data Analysis</span>
        </span>
      </div>
      <div class="skill-group">
        <span class="skill-label">Tools</span>
        <span class="skill-tags">
          <span class="tag">LaTeX</span>
          <span class="tag">Git</span>
          <span class="tag">Numerical Computing</span>
        </span>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- Personal & Contact -->
  <section class="cv-section personal" in:fly={{ y: 30, duration: 500, delay: 950 }}>
    <h2 class="section-title">Personal Interests</h2>
    <p class="intro-body">
      Outside academia, I enjoy playing Go, hiking, and reading broadly —
      activities that keep me curious and grounded.
      Feel free to reach out via the contact link below if you'd like to connect or collaborate.
    </p>
  </section>

</div>
{/if}

<Head/>
<HiddenLinks/>

<style>
  .page {
    max-width: 860px;
    margin: 0 auto;
    padding: 3rem 1.5rem 5rem;
  }

  /* Hero */
  .hero {
    display: flex;
    align-items: flex-start;
    gap: 2.5rem;
    margin-bottom: 2.5rem;
  }

  .portrait {
    width: 200px;
    height: 240px;
    object-fit: cover;
    object-position: top;
    border-radius: 6px;
    flex-shrink: 0;
    box-shadow: 0 4px 20px rgba(0,0,0,0.35);
  }

  .hero-text {
    flex: 1;
    padding-top: 0.25rem;
  }

  .hero-text h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.4rem;
    line-height: 1.2;
  }

  .subtitle {
    font-size: 0.95rem;
    color: #9ca3af;
    margin: 0 0 1rem;
    letter-spacing: 0.02em;
  }

  .intro-body {
    font-size: 0.97rem;
    line-height: 1.75;
    color: rgba(255,255,255,0.82);
    margin: 0;
  }

  /* Divider */
  .divider {
    height: 1px;
    background: rgba(255,255,255,0.08);
    margin: 2rem 0;
  }

  /* Section */
  .cv-section {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .section-title {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #818cf8;
    margin: 0 0 0.25rem;
  }

  /* Entries */
  .entries {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .entry {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .entry-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .degree {
    font-weight: 600;
    font-size: 0.97rem;
  }

  .org {
    font-size: 0.9rem;
    color: #9ca3af;
  }

  .badge {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    background: rgba(129,140,248,0.15);
    color: #818cf8;
    border: 1px solid rgba(129,140,248,0.3);
    border-radius: 4px;
    padding: 1px 7px;
    text-transform: uppercase;
  }

  .institution {
    font-size: 0.92rem;
    color: rgba(255,255,255,0.7);
  }

  .detail {
    font-size: 0.88rem;
    color: #6b7280;
  }

  .entry-desc {
    font-size: 0.93rem;
    color: rgba(255,255,255,0.75);
    margin: 0.25rem 0 0;
    line-height: 1.6;
  }

  .bullets {
    margin: 0.4rem 0 0 1.1rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .bullets li {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.72);
    line-height: 1.6;
  }

  /* Publications */
  .pub-category {
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: #6b7280;
    text-transform: uppercase;
    margin: 0.5rem 0 0.5rem;
  }

  .pub-list {
    margin: 0 0 0 1.2rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .pub-list li {
    font-size: 0.93rem;
    color: rgba(255,255,255,0.8);
    line-height: 1.65;
  }

  .pub-list em {
    font-style: italic;
    color: rgba(255,255,255,0.65);
  }

  /* Interests */
  .interest-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .interest-list li {
    font-size: 0.9rem;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
    padding: 0.35rem 0.8rem;
    color: rgba(255,255,255,0.8);
  }

  /* Skills */
  .skills-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .skill-group {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .skill-label {
    font-size: 0.82rem;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    min-width: 70px;
    padding-top: 0.3rem;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .tag {
    font-size: 0.85rem;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
    padding: 0.25rem 0.65rem;
    color: rgba(255,255,255,0.75);
  }

  /* Personal */
  .personal .intro-body {
    color: rgba(255,255,255,0.75);
  }

  /* Links */
  a {
    color: #818cf8;
    text-decoration: none;
  }
  a:hover {
    color: #a5b4fc;
    text-decoration: underline;
  }

  /* Light mode */
  @media (prefers-color-scheme: light) {
    .intro-body,
    .bullets li,
    .pub-list li,
    .entry-desc,
    .institution,
    .tag {
      color: #374151;
    }

    .subtitle,
    .org,
    .detail {
      color: #6b7280;
    }

    .interest-list li {
      color: #374151;
      background: rgba(0,0,0,0.04);
      border-color: rgba(0,0,0,0.1);
    }

    .tag {
      background: rgba(0,0,0,0.04);
      border-color: rgba(0,0,0,0.1);
    }

    .divider {
      background: rgba(0,0,0,0.1);
    }

    .badge {
      background: rgba(99,102,241,0.1);
      color: #4f46e5;
      border-color: rgba(99,102,241,0.25);
    }

    .section-title {
      color: #4f46e5;
    }

    a {
      color: #4f46e5;
    }
    a:hover {
      color: #3730a3;
    }
  }

  /* Mobile */
  @media (max-width: 640px) {
    .hero {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .portrait {
      width: 160px;
      height: 200px;
    }

    .hero-text h1 {
      font-size: 1.6rem;
    }

    .interest-list {
      justify-content: center;
    }

    .skill-group {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style>
