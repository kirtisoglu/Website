<script>
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import '../app.css';
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";
  import { injectAnalytics } from '@vercel/analytics/sveltekit';

  afterNavigate(() => { window.scrollTo(0, 0); });
  export let segment = undefined;
  export let data = {};

  $: fullscreen = $page.route.id?.startsWith('/(fullscreen)') ?? false;
  let h = 1000;
  let y = 0;
  let emailCopied = false;

  injectAnalytics();

  onMount(() => {
    if (typeof renderMathInElement === 'function') {
      renderMathInElement(document.body);
    }
  });

  function copyEmail() {
    navigator.clipboard.writeText('akirtisoglu@hawk.iit.edu').then(() => {
      emailCopied = true;
      setTimeout(() => { emailCopied = false; }, 2000);
    });
  }
</script>


<style>
  .layout-body {
    display: flex;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 2rem 1rem 2rem 1rem;
    box-sizing: border-box;
    gap: 3rem;
  }

  /* ── Sidebar ── */
  .sidebar-wrapper {
    width: 200px;
    flex-shrink: 0;
    position: sticky;
    top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .sidebar {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    padding: 1.25rem 1rem;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 10px;
    background: #fafafa;
  }

  :global(.dark) .sidebar {
    background: rgba(255,255,255,0.03);
    border-color: rgba(255,255,255,0.08);
  }

  .sidebar-photo {
    width: 150px;
    height: 180px;
    object-fit: cover;
    object-position: top;
    border-radius: 7px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.12);
    margin-bottom: 0.4rem;
  }

  .sidebar-name {
    font-size: 0.88rem;
    font-weight: 700;
    color: #111827;
    text-align: center;
    line-height: 1.3;
    margin: 0;
  }

  :global(.dark) .sidebar-name { color: #f9fafb; }

  .sidebar-divider {
    width: 100%;
    height: 1px;
    background: rgba(0,0,0,0.07);
    margin: 0.25rem 0;
  }

  :global(.dark) .sidebar-divider { background: rgba(255,255,255,0.08); }

  .sidebar-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    font-size: 0.75rem;
    color: #6b7280;
    text-decoration: none;
    line-height: 1.4;
    overflow: hidden;
  }

  .sidebar-row svg {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
    color: #9ca3af;
  }

  .sidebar-row span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  a.sidebar-row:hover { color: #4f46e5; }
  a.sidebar-row:hover svg { color: #4f46e5; }

  :global(.dark) .sidebar-row { color: rgba(255,255,255,0.5); }
  :global(.dark) a.sidebar-row:hover { color: #818cf8; }

  .email-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    width: 100%;
    overflow: hidden;
  }

  .email-copy-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: #9ca3af;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    transition: color 0.15s;
  }
  .email-copy-btn:hover { color: #4f46e5; }
  .email-copy-btn svg { width: 12px; height: 12px; }
  :global(.dark) .email-copy-btn { color: rgba(255,255,255,0.3); }
  :global(.dark) .email-copy-btn:hover { color: #818cf8; }

  .email-copied-tip {
    font-size: 0.68rem;
    color: #22c55e;
    white-space: nowrap;
  }

  main {
    flex: 1;
    min-width: 0;
    position: relative;
    min-height: 80vh;
  }

  .mobile-info { display: none; }
  .mobile-email-row { display: none; }

  @media (max-width: 700px) {
    .layout-body { flex-direction: column; padding: 0.75rem; gap: 0.75rem; }
    .sidebar-wrapper { width: 100%; position: static; }
    .sidebar { flex-direction: row; justify-content: flex-start; align-items: center; gap: 0.75rem; padding: 0.6rem 0.75rem; }
    .sidebar-photo { width: 54px; height: 66px; margin-bottom: 0; flex-shrink: 0; }
    .sidebar-name { display: none; }
    .sidebar-divider { display: none; }
    .sidebar-row { display: none; }
    .email-row { display: none; }
    .mobile-info { display: flex; flex-direction: column; gap: 0.15rem; }
    .mobile-name { margin: 0; font-size: 0.88rem; font-weight: 700; color: #111827; line-height: 1.3; }
    .mobile-title { margin: 0; font-size: 0.75rem; color: #6b7280; line-height: 1.4; white-space: normal; }
    .mobile-email-row { display: flex; align-items: center; gap: 0.35rem; margin-top: 0.25rem; }
    .mobile-email-btn { background: none; border: none; padding: 0; cursor: pointer; display: flex; align-items: center; gap: 0.3rem; color: #6b7280; font-size: 0.7rem; text-align: left; }
    .mobile-email-btn svg { width: 11px; height: 11px; flex-shrink: 0; color: #9ca3af; }
    .mobile-copy-icon { background: none; border: none; padding: 0; cursor: pointer; display: flex; align-items: center; color: #9ca3af; transition: color 0.15s; }
    .mobile-copy-icon svg { width: 11px; height: 11px; }
    .mobile-copy-icon:hover { color: #4f46e5; }
    .mobile-copied-tip { font-size: 0.68rem; color: #22c55e; white-space: nowrap; }
  }

  :global(.dark) .mobile-name { color: #f9fafb; }
  :global(.dark) .mobile-title { color: rgba(255,255,255,0.5); }
</style>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Mukta&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
  

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css"
    integrity="sha384-R4558gYOUz8mP9YWpZJjofhk+zx0AS11p36HnD2ZKj/6JR5z27gSSULCNHIRReVs" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.js"
    integrity="sha384-z1fJDqw8ZApjGO3/unPWUPsIymfsJmyrDVWC8Tv/a1HeOtGmkwNd/7xUS0Xcnvsx"
    crossorigin="anonymous"></script>

  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/contrib/auto-render.min.js"
    integrity="sha384-+XBljXPPiv+OzfbB3cVmLHf4hdUFHlWNZN5spNQ7rmHTXpd7WvJum6fIACpNNfIR" crossorigin="anonymous"></script>
</svelte:head>

<svelte:window bind:scrollY={y} />

{#if fullscreen}
  <slot />
{:else}

<Nav {segment} />

<div class="layout-body">
  <div class="sidebar-wrapper">
    <aside class="sidebar">
      <img src="/about/portrait.webp" alt="Alaittin Kirtisoglu" class="sidebar-photo" />
      <p class="sidebar-name">Alaittin Kirtisoglu</p>
      <div class="mobile-info">
        {#if segment === 'research'}
          <p class="mobile-name">Work &amp; Projects</p>
          <p class="mobile-title">Combinatorial optimization, algorithm design, and equitable network design.</p>
        {:else if segment === 'about'}
          <p class="mobile-name">Alaittin Kirtisoglu</p>
          <p class="mobile-title">Ph.D. Candidate · Applied Mathematics · IIT</p>
        {:else}
          <p class="mobile-name">Alaittin Kirtisoglu</p>
          <p class="mobile-title">PhD in Applied Mathematics</p>
        {/if}
        <div class="mobile-email-row">
          <button class="mobile-email-btn" on:click={copyEmail} title="Copy email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>akirtisoglu@hawk.iit.edu</span>
          </button>
          {#if emailCopied}
            <span class="mobile-copied-tip">Copied!</span>
          {:else}
            <button class="mobile-copy-icon" on:click={copyEmail} title="Copy email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          {/if}
        </div>
      </div>
      <div class="sidebar-divider"></div>

      <!-- City -->
      <div class="sidebar-row">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
        <span>Chicago, IL</span>
      </div>

      <!-- Institution -->
      <div class="sidebar-row">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>Illinois Tech</span>
      </div>

      <!-- Email (copy on click) -->
      <div class="email-row">
        <button class="sidebar-row" style="background:none;border:none;padding:0;cursor:pointer;text-align:left;" on:click={copyEmail}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px;flex-shrink:0;color:#9ca3af;">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span>akirtisoglu@hawk.iit.edu</span>
        </button>
        {#if emailCopied}
          <span class="email-copied-tip">Copied!</span>
        {:else}
          <button class="email-copy-btn" on:click={copyEmail} title="Copy email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
        {/if}
      </div>

      <!-- GitHub -->
      <a class="sidebar-row" href="https://github.com/kirtisoglu" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width:13px;height:13px;flex-shrink:0;">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
        <span>github.com/kirtisoglu</span>
      </a>
    </aside>
  </div>

  <main bind:clientHeight={h}>
    <slot/>
  </main>
</div>
<Footer {h} {y} lastUpdated={data.lastUpdated} />

{/if}
