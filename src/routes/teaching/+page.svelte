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

  <p class="coming-soon">More coming soon.</p>

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

  /* ── Mobile ── */
  @media (max-width: 640px) {
    .page {
      padding: 2rem 1.25rem 4rem;
    }
  }
</style>
