<script>
  import { fade } from "svelte/transition";
  import Head from "../../../../components/Head.svelte";
</script>

<svelte:head>
  <title>FalCom Visualizer — Alaittin Kirtisoglu</title>
</svelte:head>

<div class="page" in:fade={{ duration: 300 }}>

  <nav class="breadcrumb">
    <a href="/research/">Research</a>
    <span>›</span>
    <a href="/research/falcom/">FalCom</a>
    <span>›</span>
    <span>Visualizer</span>
  </nav>

  <div class="launch-card">
    <div class="card-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.659 2.591l.007.022A24.3 24.3 0 0121 12.75m-11.25 0v2.25m0-2.25h11.25m-11.25 0a24.3 24.3 0 01-4.5-1.5M21 12.75v2.25m0-2.25a24.3 24.3 0 00-4.5-1.5m4.5 3.75a24.3 24.3 0 01-4.5 1.5m0 0v2.25m0-2.25a24.3 24.3 0 00-4.5 1.5"/>
      </svg>
    </div>
    <h1>FalCom Visualizer</h1>
    <p class="desc">
      Animated Markov chain sampling for facility location &amp; redistricting —
      explore chain convergence, district proposals, and fairness metrics interactively.
    </p>
    <div class="coming-soon-badge">Coming Soon</div>
    <p class="note">The visualizer is currently under development.</p>
  </div>

</div>

<Head/>

<style>
  .page {
    max-width: 600px;
    margin: 0 auto;
    padding: 2.5rem 2rem 5rem;
    width: 100%;
    box-sizing: border-box;
  }

  .breadcrumb {
    font-size: 0.78rem;
    color: #9ca3af;
    display: flex;
    gap: 0.4rem;
    align-items: center;
    margin-bottom: 3rem;
  }

  .breadcrumb a {
    color: #4f46e5;
    text-decoration: none;
  }

  .breadcrumb a:hover { text-decoration: underline; }
  :global(.dark) .breadcrumb a { color: #818cf8; }
  :global(.dark) .breadcrumb { color: rgba(255,255,255,0.3); }

  .launch-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.25rem;
    padding: 3rem 2rem;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 12px;
    background: #f9fafb;
  }

  :global(.dark) .launch-card {
    border-color: rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
  }

  .card-icon {
    width: 3rem;
    height: 3rem;
    color: #4f46e5;
  }

  :global(.dark) .card-icon { color: #818cf8; }

  h1 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
    line-height: 1.3;
  }

  :global(.dark) h1 { color: #f9fafb; }

  .desc {
    font-size: 0.92rem;
    line-height: 1.7;
    color: #6b7280;
    margin: 0;
    max-width: 420px;
  }

  :global(.dark) .desc { color: rgba(255,255,255,0.5); }

  .coming-soon-badge {
    display: inline-block;
    padding: 0.5rem 1.5rem;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
    color: #9ca3af;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  :global(.dark) .coming-soon-badge {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.3);
  }

  .note {
    font-size: 0.75rem;
    color: #9ca3af;
    margin: 0;
  }

  :global(.dark) .note { color: rgba(255,255,255,0.25); }

  @media (max-width: 640px) {
    .page { padding: 2rem 1.25rem 4rem; }
    .launch-card { padding: 2rem 1.25rem; }
  }
</style>
