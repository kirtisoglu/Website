<script>
  import { fade } from "svelte/transition";
  import Head from "../../../../components/Head.svelte";

  const dashboardUrl = "https://chicago-healthcare-dashboard-production-47de.up.railway.app/";
</script>

<svelte:head>
  <title>Chicago Healthcare Dashboard — Alaittin Kirtisoglu</title>
</svelte:head>

<div class="page" in:fade={{ duration: 300 }}>

  <nav class="breadcrumb">
    <a href="/research/">Research</a>
    <span>›</span>
    <a href="/research/chicago-healthcare-network/">Chicago Healthcare Network</a>
    <span>›</span>
    <span>Dashboard</span>
  </nav>

  <div class="launch-card">
    <div class="card-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
      </svg>
    </div>
    <h1>Chicago Healthcare Access Dashboard</h1>
    <p class="desc">
      Interactive visualization of healthcare facility coverage across Chicago neighborhoods —
      explore access gaps, optimization outputs, and equity metrics.
    </p>
    <a class="launch-btn" href={dashboardUrl} target="_blank" rel="noopener noreferrer">
      Open Dashboard →
    </a>
    <p class="note">Opens in a new tab</p>
    <p class="testing-note">⚠ This dashboard is currently in testing. Some features may be incomplete or unstable.</p>
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

  .launch-btn {
    display: inline-block;
    padding: 0.7rem 1.75rem;
    background: #4f46e5;
    color: #fff;
    border-radius: 6px;
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.15s;
  }

  .launch-btn:hover { background: #4338ca; }
  :global(.dark) .launch-btn { background: #6366f1; }
  :global(.dark) .launch-btn:hover { background: #818cf8; }

  .note {
    font-size: 0.75rem;
    color: #9ca3af;
    margin: 0;
  }

  :global(.dark) .note { color: rgba(255,255,255,0.25); }

  .testing-note {
    font-size: 0.78rem;
    color: #92400e;
    background: #fef3c7;
    border: 1px solid #fde68a;
    border-radius: 6px;
    padding: 0.45rem 0.9rem;
    margin: 0;
  }

  :global(.dark) .testing-note {
    color: #fde047;
    background: rgba(161,98,7,0.12);
    border-color: rgba(253,224,71,0.2);
  }

  @media (max-width: 640px) {
    .page { padding: 2rem 1.25rem 4rem; }
    .launch-card { padding: 2rem 1.25rem; }
  }
</style>
