<script>
  import { fade } from "svelte/transition";
  import Head from "../../../components/Head.svelte";

  const courses = [
    {
      where: "Illinois Institute of Technology",
      years: "2021–2026",
      level: "Graduate",
      list: "Linear Optimization, Statistical Learning, Mathematical Modeling, Regression, Time Series, Computational Algebraic Geometry",
    },
    {
      where: "Illinois Institute of Technology",
      years: "2021–2026",
      level: "Undergraduate",
      list: "Calculus I–II, Multivariate and Vector Calculus, Linear Algebra, Differential Equations, Complex Analysis, Discrete Mathematics, Computational Mathematics",
    },
    {
      where: "TED University, Ankara",
      years: "2019–2021",
      level: "Undergraduate",
      list: "Calculus of One Variable, Multivariable Calculus, Linear Algebra, Differential Equations",
    },
  ];

  const mentees = [
    {
      year: 2025,
      name: "Berru Güneş Bulanık",
      school: "Marmara University",
      project: "How Robots Walk: An Introduction to Path and Motion Planning",
      links: [
        { label: "Report", href: "https://drive.google.com/file/d/1N3X75xgjs5Go0b6SpttrqoH4LjC85sqS/view" },
        { label: "Video", href: "https://www.youtube.com/watch?v=KC1UKEftURI&t=5180s" },
      ],
    },
    {
      year: 2025,
      name: "Carlos Lanignan",
      school: "Bursa Technical University",
      project: "Fast and Fair? Exploring a Graph-Theoretic Approach to Large-Scale Political Redistricting",
      links: [
        { label: "Video", href: "https://www.youtube.com/watch?v=kUOIlxlHX7Y&t=10680s" },
      ],
    },
    {
      year: 2024,
      name: "Ahmet Eray Kocaman",
      school: "Bilkent University",
      project: "Exceeding Human-Level Expertise: Deep Reinforcement Learning",
      links: [
        { label: "Report (p. 192)", href: "https://sites.google.com/view/drpturkiye/previous-programs/summer-2024/symposium" },
        { label: "Video", href: "https://www.youtube.com/watch?v=CFLHafhlu-4" },
      ],
    },
    {
      year: 2023,
      name: "Doğa Seçkin",
      school: "Boğaziçi University",
      project: "Regression and Classification in Statistical Learning",
      links: [
        { label: "Report", href: "https://drive.google.com/file/d/1Ey8xDHKK0W_9mNYDHLN4uLl6bhzo-Bca/view" },
        { label: "Video", href: "https://www.youtube.com/watch?v=ImPJgb0lrfc&list=PLK6-bJu2kuRb2fOOuGoLKMGqAoITIR7x5&index=2" },
      ],
    },
    {
      year: 2023,
      name: "Çiğdem Cemre Bolat",
      school: "Middle East Technical University",
      project: "Beyond Constraints: Integer Programming",
      links: [
        { label: "Report", href: "https://drive.google.com/file/d/1EnGHUFyACritYJjhBuybkLNQV2UIulll/view" },
        { label: "Video", href: "https://www.youtube.com/watch?v=sWYdERWxEDc" },
      ],
    },
    {
      year: 2022,
      name: "Ilgi Demirer",
      school: "Middle East Technical University",
      project: "Linear Programming Models and How to Solve Them",
      links: [],
    },
  ];
</script>

<svelte:head>
  <title>Teaching — Alaittin Kirtisoglu</title>
  <meta name="description" content="Teaching and mentoring by Alaittin Kirtisoglu: mathematics courses at Illinois Institute of Technology and TED University, and undergraduate mentoring through the Directed Reading Program in Türkiye." />
</svelte:head>

<div class="page" in:fade={{ duration: 300 }}>
  <header>
    <h1>Teaching</h1>
    <p class="lead">
      I ran recitations and grading for mathematics courses at Illinois Tech (2021–2026)
      and TED University (2019–2021), and since 2022 I have mentored undergraduates through the
      <a href="https://sites.google.com/view/drpturkiye/" target="_blank" rel="noopener">Directed Reading Program in Türkiye</a>.
    </p>
  </header>

  <section>
    <h2>Courses</h2>
    <div class="table-wrap">
      <table class="courses">
        <thead>
          <tr><th>Where</th><th>Level</th><th>Courses</th></tr>
        </thead>
        <tbody>
          {#each courses as c}
            <tr>
              <td class="where">{c.where}<small>{c.years}</small></td>
              <td class="level">{c.level}</td>
              <td>{c.list}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h2>Directed Reading Program mentees</h2>
    <p class="note">
      Each summer, a mentee and I spend nine weeks on a book or set of papers, ending with a written
      report and a talk at the program's symposium.
    </p>
    <div class="table-wrap">
      <table class="mentees">
        <thead>
          <tr><th>Year</th><th>Student</th><th>Project</th><th><span class="sr-only">Links</span></th></tr>
        </thead>
        <tbody>
          {#each mentees as m}
            <tr>
              <td class="year">{m.year}</td>
              <td class="student">{m.name}<small>{m.school}</small></td>
              <td class="project">{m.project}</td>
              <td class="links">
                {#each m.links as l, i}
                  {#if i > 0}<span class="sep" aria-hidden="true">·</span>{/if}
                  <a href={l.href} target="_blank" rel="noopener">{l.label}</a>
                {/each}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</div>

<Head/>

<style>
  .page {
    max-width: 820px;
    margin: 0 auto;
    padding: 2.5rem 0 4rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  h1 {
    font-size: clamp(1.8rem, 4vw, 2.3rem);
    font-weight: 700;
    letter-spacing: -0.015em;
    color: #111827;
    margin: 0 0 0.75rem;
    line-height: 1.15;
  }
  :global(.dark) h1 { color: #f9fafb; }

  .lead {
    font-size: 1rem;
    line-height: 1.7;
    color: #4b5563;
    max-width: 62ch;
    margin: 0;
  }
  :global(.dark) .lead { color: rgba(255,255,255,0.68); }

  section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  h2 {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6b7280;
    margin: 0;
  }
  :global(.dark) h2 { color: rgba(255,255,255,0.5); }

  .note {
    font-size: 0.92rem;
    line-height: 1.6;
    color: #4b5563;
    margin: 0;
    max-width: 62ch;
  }
  :global(.dark) .note { color: rgba(255,255,255,0.65); }

  a { color: #4f46e5; text-decoration: none; }
  a:hover { text-decoration: underline; }
  :global(.dark) a { color: #a5b4fc; }

  .table-wrap { overflow-x: auto; }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.92rem;
    line-height: 1.5;
    color: #1f2937;
  }
  :global(.dark) table { color: rgba(255,255,255,0.85); }

  th {
    text-align: left;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #6b7280;
    padding: 0.5rem 1rem 0.5rem 0;
    border-bottom: 1px solid #e5e7eb;
  }
  :global(.dark) th { color: rgba(255,255,255,0.45); border-bottom-color: rgba(255,255,255,0.1); }

  td {
    padding: 0.7rem 1rem 0.7rem 0;
    border-bottom: 1px solid #e5e7eb;
    vertical-align: top;
  }
  :global(.dark) td { border-bottom-color: rgba(255,255,255,0.08); }

  td small {
    display: block;
    font-size: 0.82rem;
    color: #6b7280;
    margin-top: 0.1rem;
  }
  :global(.dark) td small { color: rgba(255,255,255,0.45); }

  .where { min-width: 11rem; }
  .level, .year, .links { white-space: nowrap; color: #6b7280; }
  :global(.dark) .level, :global(.dark) .year { color: rgba(255,255,255,0.5); }
  .year { font-variant-numeric: tabular-nums; }
  .student { min-width: 10rem; font-weight: 500; }
  .student small { font-weight: 400; }
  .links { padding-right: 0; text-align: right; }
  .sep { margin: 0 0.35rem; color: #9ca3af; }

  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
  }

  /* Phones: each row becomes a small stacked block instead of a squeezed table */
  @media (max-width: 640px) {
    .page { padding: 1.25rem 0 3rem; gap: 2rem; }
    table, tbody, tr, td { display: block; width: 100%; }
    thead { display: none; }
    tr { padding: 0.75rem 0; border-bottom: 1px solid #e5e7eb; }
    :global(.dark) tr { border-bottom-color: rgba(255,255,255,0.08); }
    td { padding: 0; border: 0; }
    .where, .student { min-width: 0; }
    .courses .level { font-size: 0.8rem; margin: 0.35rem 0 0.15rem; text-transform: uppercase; letter-spacing: 0.06em; }
    .mentees tr { display: grid; grid-template-columns: 3rem minmax(0, 1fr); column-gap: 0.5rem; }
    .mentees .year { grid-row: span 3; }
    .mentees .project { font-style: italic; margin-top: 0.3rem; }
    .mentees .links { text-align: left; margin-top: 0.3rem; white-space: normal; }
  }
</style>
