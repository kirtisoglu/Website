<script>
  import { fly, fade } from "svelte/transition";
  import Head from "../../components/Head.svelte";
</script>

<svelte:head>
  <title>Teaching — Alaittin Kirtisoglu</title>
  <meta name="description" content="Teaching experience of Alaittin Kirtisoglu — courses assisted at Illinois Institute of Technology in mathematics, statistics, and data science." />
</svelte:head>

<div class="page" in:fade={{ duration: 500, delay: 100 }}>

  <!-- Intro -->
  <section class="intro" in:fly={{ y: 30, duration: 500, delay: 200 }}>
    <p class="eyebrow">Teaching</p>
    <h1>Teaching & Mentoring</h1>
    <p class="lead">
      I have served as a Teaching Assistant at Illinois Institute of Technology, and TED University
      for 7 years and have mentored undergraduate and graduate students on research projects.
      I believe strong teaching and careful mentoring are inseparable from good research.
    </p>
  </section>

  <div class="divider"></div>

  <!-- DRP Türkiye -->
  <section class="section" in:fly={{ y: 30, duration: 500, delay: 300 }}>
    <h2 class="section-title">Directed Reading Program — Türkiye</h2>

    <p class="section-intro">
      <a href="https://sites.google.com/view/drpturkiye/" target="_blank" rel="noopener">DRP&nbsp;Türkiye</a>
      is an online program that pairs undergraduate mathematics students at universities in and around Türkiye
      with graduate-student and early-career mentors at institutions around the world.
      Each summer, mentor and mentee work through selected books or articles over nine intensive weeks:
      weekly meetings, a written report, and a presentation at a closing symposium.
    </p>

    <p class="section-intro">
      I have mentored students through DRP since 2022, from a range of universities and backgrounds.
      I match the topic and difficulty to each student's background, aiming to stretch them on
      something they can actually finish. Recent projects:
    </p>

    <div class="entries">

      <!-- 2025 -->
      <div class="entry">
        <div class="entry-head">
          <span class="course-name">Berru Güneş Bulanık</span>
          <span class="term">Summer 2025</span>
        </div>
        <span class="institution">Sophomore, Mathematics — Marmara University</span>
        <p class="entry-desc"><em>How Robots Walk: An Introduction to Path and Motion Planning.</em></p>
        <p class="entry-links">
          <a href="https://drive.google.com/file/d/1N3X75xgjs5Go0b6SpttrqoH4LjC85sqS/view" target="_blank" rel="noopener">Report</a>
          ·
          <a href="https://www.youtube.com/watch?v=KC1UKEftURI&t=5180s" target="_blank" rel="noopener">Presentation</a>
        </p>
      </div>

      <div class="entry">
        <div class="entry-head">
          <span class="course-name">Carlos Lanignan</span>
          <span class="term">Summer 2025</span>
        </div>
        <span class="institution">Junior, Mathematics — Bursa Technical University</span>
        <p class="entry-desc"><em>Fast and Fair? Exploring a Graph-Theoretic Approach to Large-Scale Political Redistricting.</em></p>
        <p class="entry-links">
          <a href="https://www.youtube.com/watch?v=kUOIlxlHX7Y&t=10680s" target="_blank" rel="noopener">Presentation</a>
        </p>
      </div>

      <!-- 2024 -->
      <div class="entry">
        <div class="entry-head">
          <span class="course-name">Ahmet Eray Kocaman</span>
          <span class="term">Summer 2024</span>
        </div>
        <span class="institution">Sophomore, Physics — Bilkent University</span>
        <p class="entry-desc"><em>Exceeding Human-Level Expertise: Deep Reinforcement Learning.</em></p>
        <p class="entry-links">
          <a href="https://sites.google.com/view/drpturkiye/previous-programs/summer-2024/symposium" target="_blank" rel="noopener">Report (in 2024 symposium proceedings, p.&nbsp;192)</a>
          ·
          <a href="https://www.youtube.com/watch?v=CFLHafhlu-4" target="_blank" rel="noopener">Presentation</a>
        </p>
      </div>

      <!-- 2023 -->
      <div class="entry">
        <div class="entry-head">
          <span class="course-name">Doğa Seçkin</span>
          <span class="term">Summer 2023</span>
        </div>
        <span class="institution">Senior, double major in Physics and Mathematics — Boğaziçi University</span>
        <p class="entry-desc"><em>Regression and Classification in Statistical Learning.</em></p>
        <p class="entry-links">
          <a href="https://drive.google.com/file/d/1Ey8xDHKK0W_9mNYDHLN4uLl6bhzo-Bca/view" target="_blank" rel="noopener">Report</a>
          ·
          <a href="https://www.youtube.com/watch?v=ImPJgb0lrfc&list=PLK6-bJu2kuRb2fOOuGoLKMGqAoITIR7x5&index=2" target="_blank" rel="noopener">Presentation</a>
        </p>
      </div>

      <div class="entry">
        <div class="entry-head">
          <span class="course-name">Çiğdem Cemre Bolat</span>
          <span class="term">Summer 2023</span>
        </div>
        <span class="institution">Senior, Mathematics — Middle East Technical University</span>
        <p class="entry-desc"><em>Beyond Constraints: Integer Programming.</em></p>
        <p class="entry-links">
          <a href="https://drive.google.com/file/d/1EnGHUFyACritYJjhBuybkLNQV2UIulll/view" target="_blank" rel="noopener">Report</a>
          ·
          <a href="https://www.youtube.com/watch?v=sWYdERWxEDc" target="_blank" rel="noopener">Presentation</a>
        </p>
      </div>

      <!-- 2022 -->
      <div class="entry">
        <div class="entry-head">
          <span class="course-name">Ilgi Demirer</span>
          <span class="term">Summer 2022</span>
        </div>
        <span class="institution">Undergraduate, Mathematics — Middle East Technical University</span>
        <p class="entry-desc"><em>Linear Programming Models and How to Solve Them.</em></p>
      </div>

    </div>
  </section>

  <div class="divider"></div>

  <!-- IIT TA -->
  <section class="section" in:fly={{ y: 30, duration: 500, delay: 400 }}>
    <h2 class="section-title">Teaching Assistant — Illinois Institute of Technology</h2>
    <p class="section-intro">
      Recitation and grading for undergraduate mathematics courses in the
      Department of Applied Mathematics, Fall 2021 – Spring 2026.
    </p>
    <ul class="course-list">
      <li>Calculus I</li>
      <li>Calculus II</li>
      <li>Multivariate and Vector Calculus</li>
      <li>Linear Algebra</li>
      <li>Differential Equations</li>
      <li>Complex Analysis</li>
      <li>Discrete Mathematics</li>
      <li>Computational Mathematics</li>
    </ul>
  </section>

  <div class="divider"></div>

  <!-- TED TA -->
  <section class="section" in:fly={{ y: 30, duration: 500, delay: 500 }}>
    <h2 class="section-title">Teaching Assistant — TED University, Ankara</h2>
    <p class="section-intro">
      Recitation and grading for undergraduate mathematics courses in the
      Department of Mathematics, Fall 2019 – Spring 2021.
    </p>
    <ul class="course-list">
      <li>Calculus of One Variable</li>
      <li>Multivariable Calculus</li>
      <li>Linear Algebra</li>
      <li>Differential Equations</li>
    </ul>
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
    gap: 1.5rem;
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
    gap: 1.5rem;
  }

  .entry {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .course-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: #111827;
  }

  :global(.dark) .course-name { color: #f9fafb; }

  .term {
    font-size: 0.78rem;
    color: #9ca3af;
    white-space: nowrap;
  }

  :global(.dark) .term { color: rgba(255,255,255,0.38); }

  .institution,
  .role-label {
    font-size: 0.85rem;
    color: #6b7280;
  }

  :global(.dark) .institution,
  :global(.dark) .role-label { color: rgba(255,255,255,0.45); }

  .bullets {
    margin: 0.25rem 0 0;
    padding-left: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .bullets li {
    font-size: 0.9rem;
    line-height: 1.65;
    color: #374151;
  }

  :global(.dark) .bullets li { color: rgba(255,255,255,0.7); }

  .entry-desc {
    font-size: 0.9rem;
    line-height: 1.65;
    color: #374151;
    margin: 0.1rem 0 0;
  }

  :global(.dark) .entry-desc { color: rgba(255,255,255,0.7); }

  .coming-soon {
    font-size: 0.88rem;
    color: #9ca3af;
    margin: 0;
  }

  :global(.dark) .coming-soon { color: rgba(255,255,255,0.3); }

  .section-intro {
    font-size: 0.95rem;
    line-height: 1.7;
    color: #374151;
    max-width: 720px;
    margin: 0;
  }

  :global(.dark) .section-intro { color: rgba(255,255,255,0.7); }

  .section-intro a {
    color: #4f46e5;
    text-decoration: none;
  }
  .section-intro a:hover { text-decoration: underline; }
  :global(.dark) .section-intro a { color: #818cf8; }

  .entry-links {
    font-size: 0.82rem;
    color: #6b7280;
    margin: 0.15rem 0 0;
  }

  .entry-links a {
    color: #4f46e5;
    text-decoration: none;
  }
  .entry-links a:hover { text-decoration: underline; }
  :global(.dark) .entry-links { color: rgba(255,255,255,0.4); }
  :global(.dark) .entry-links a { color: #818cf8; }

  .course-list {
    list-style: none;
    padding: 0;
    margin: 0.4rem 0 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.35rem 1.5rem;
  }

  .course-list li {
    font-size: 0.92rem;
    color: #374151;
    line-height: 1.55;
    padding-left: 0.9rem;
    position: relative;
  }

  .course-list li::before {
    content: "·";
    position: absolute;
    left: 0;
    color: #9ca3af;
    font-weight: 700;
  }

  :global(.dark) .course-list li { color: rgba(255,255,255,0.7); }
  :global(.dark) .course-list li::before { color: rgba(255,255,255,0.3); }

  @media (max-width: 640px) {
    .course-list { grid-template-columns: 1fr; }
  }

  /* ── Mobile ── */
  @media (max-width: 640px) {
    .page {
      padding: 2rem 1.25rem 4rem;
    }
  }
</style>
