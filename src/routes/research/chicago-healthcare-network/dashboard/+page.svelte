<script>
  import { fade } from "svelte/transition";
  import Head from "../../../../components/Head.svelte";
</script>

<svelte:head>
  <title>Chicago Healthcare Dashboard — Alaittin Kirtisoglu</title>
</svelte:head>

<div class="dashboard-page" in:fade={{ duration: 300 }}>

  <div class="dashboard-header">
    <div class="header-left">
      <nav class="breadcrumb">
        <a href="/research/">Research</a>
        <span>›</span>
        <a href="/research/chicago-healthcare-network/">Chicago Healthcare Network</a>
        <span>›</span>
        <span>Dashboard</span>
      </nav>
      <h1>Chicago Healthcare Access Dashboard</h1>
    </div>
    <a class="back-btn" href="/research/chicago-healthcare-network/">← Back to project</a>
  </div>

  <div class="embed-container">
    <iframe
      src="https://chicago-healthcare-dashboard.up.railway.app/dashboard"
      title="Chicago Healthcare Access Dashboard"
      allowfullscreen
      loading="lazy"
    ></iframe>
  </div>

</div>

<Head/>

<style>
  .dashboard-page {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 4rem);
    padding: 1.25rem 2rem;
    box-sizing: border-box;
    max-width: 100%;
  }

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .breadcrumb {
    font-size: 0.78rem;
    color: #9ca3af;
    display: flex;
    gap: 0.4rem;
    align-items: center;
    margin-bottom: 0.4rem;
  }

  .breadcrumb a {
    color: #4f46e5;
    text-decoration: none;
  }

  .breadcrumb a:hover { text-decoration: underline; }
  :global(.dark) .breadcrumb a { color: #818cf8; }
  :global(.dark) .breadcrumb { color: rgba(255,255,255,0.3); }

  h1 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }

  :global(.dark) h1 { color: #f9fafb; }

  .back-btn {
    font-size: 0.82rem;
    color: #6b7280;
    text-decoration: none;
    white-space: nowrap;
  }

  .back-btn:hover { color: #111827; }
  :global(.dark) .back-btn { color: rgba(255,255,255,0.45); }
  :global(.dark) .back-btn:hover { color: rgba(255,255,255,0.85); }

  .embed-container {
    flex: 1;
    position: relative;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 8px;
    overflow: hidden;
    background: #f9fafb;
  }

  :global(.dark) .embed-container {
    border-color: rgba(255,255,255,0.08);
    background: #1a1a1a;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }


  @media (max-width: 640px) {
    .dashboard-page { padding: 1rem; }
    .dashboard-header { flex-direction: column; align-items: flex-start; }
  }
</style>
