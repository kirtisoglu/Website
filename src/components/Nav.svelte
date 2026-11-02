<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { afterNavigate } from '$app/navigation';

  const links = [
    { href: '/research/', label: 'Research', match: '/research' },
    { href: '/teaching/', label: 'Teaching', match: '/teaching' },
  ];

  $: path = $page.url.pathname;
  const isCurrent = (match, p) => p === match || p.startsWith(match + '/');

  let dark = false;
  let menu;

  onMount(() => {
    try { dark = localStorage.getItem('theme') === 'dark'; } catch (e) {}
    document.documentElement.classList.toggle('dark', dark);
  });

  // Close the phone menu after following one of its links.
  afterNavigate(() => { if (menu) menu.open = false; });

  function toggleTheme() {
    dark = !dark;
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
    document.documentElement.classList.toggle('dark', dark);
  }
</script>

<nav class:dark>
  <div class="nav-inner">
    <a href="/" class="site-name" aria-current={path === '/' ? 'page' : undefined}>Alaittin's Homepage</a>

    <div class="right">
      <div class="links desktop">
        {#each links as l}
          <a href={l.href} aria-current={isCurrent(l.match, path) ? 'page' : undefined}>{l.label}</a>
        {/each}
        <a href="/cv.pdf" target="_blank" rel="noopener" aria-label="CV (PDF, opens in a new tab)">CV <span class="ext" aria-hidden="true">↗</span></a>
        <span class="divider" aria-hidden="true"></span>
      </div>

      <button class="theme-toggle" on:click={toggleTheme} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
        {#if dark}
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1.5" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22.5"/><line x1="1.5" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22.5" y2="12"/><line x1="4.6" y1="4.6" x2="6.4" y2="6.4"/><line x1="17.6" y1="17.6" x2="19.4" y2="19.4"/><line x1="4.6" y1="19.4" x2="6.4" y2="17.6"/><line x1="17.6" y1="6.4" x2="19.4" y2="4.6"/></g></svg>
        {:else}
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
        {/if}
      </button>

      <!-- Phone menu: a CSS-only disclosure, so it works before the page hydrates -->
      <details class="mobile" bind:this={menu}>
        <summary aria-label="Menu">
          <svg class="open-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </summary>
        <div class="mobile-menu">
          <a href="/" aria-current={path === '/' ? 'page' : undefined}>Home</a>
          {#each links as l}
            <a href={l.href} aria-current={isCurrent(l.match, path) ? 'page' : undefined}>{l.label}</a>
          {/each}
          <a href="/cv.pdf" target="_blank" rel="noopener">CV <span class="ext" aria-hidden="true">↗</span></a>
        </div>
      </details>
    </div>
  </div>
</nav>

<style>
  nav {
    position: sticky;
    top: 0;
    z-index: 3;
    background: #ffffff;
    border-bottom: 1px solid rgba(0,0,0,0.08);
  }
  nav.dark {
    background: #242424;
    border-bottom-color: rgba(255,255,255,0.07);
  }

  .nav-inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    max-width: 1100px;
    height: 4rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    box-sizing: border-box;
  }

  a { text-decoration: none; color: #6b7280; }
  nav.dark a { color: rgba(255,255,255,0.6); }
  a:hover { color: #111827; }
  nav.dark a:hover { color: #f9fafb; }

  .site-name {
    font-weight: 600;
    color: #111827;
    white-space: nowrap;
  }
  nav.dark .site-name { color: #f9fafb; }

  .right {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .links {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .links > a[aria-current] { color: #111827; font-weight: 600; }
  nav.dark .links > a[aria-current] { color: #f9fafb; }

  .ext { font-size: 0.8em; margin-left: 0.1em; }

  .divider {
    width: 1px;
    height: 1.4rem;
    background: rgba(0,0,0,0.15);
  }
  nav.dark .divider { background: rgba(255,255,255,0.2); }


  .theme-toggle {
    display: flex;
    align-items: center;
    padding: 0;
    border: 0;
    background: none;
    color: #f5b400;
    cursor: pointer;
  }
  .theme-toggle svg { width: 1.15rem; height: 1.15rem; }
  .theme-toggle:focus-visible, a:focus-visible, summary:focus-visible {
    outline: 2px solid #4f46e5;
    outline-offset: 3px;
    border-radius: 2px;
  }

  /* Phone menu, hidden on desktop */
  .mobile { display: none; }
  .mobile summary {
    list-style: none;
    display: flex;
    padding: 0.25rem;
    color: #6b7280;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  nav.dark .mobile summary { color: rgba(255,255,255,0.6); }
  .mobile summary::-webkit-details-marker { display: none; }
  .mobile summary::marker { content: ""; }
  .mobile summary svg { width: 1.4rem; height: 1.4rem; }
  .close-icon { display: none; }
  .mobile[open] .open-icon { display: none; }
  .mobile[open] .close-icon { display: block; }

  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1.5rem 1rem;
    background: #ffffff;
    border-top: 1px solid rgba(0,0,0,0.08);
    box-shadow: 0 8px 16px rgba(0,0,0,0.08);
  }
  nav.dark .mobile-menu {
    background: #242424;
    border-top-color: rgba(255,255,255,0.07);
  }
  .mobile-menu > a {
    padding: 0.6rem 0;
    font-size: 1rem;
    font-weight: 500;
    color: #374151;
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }
  nav.dark .mobile-menu > a { color: rgba(255,255,255,0.75); border-bottom-color: rgba(255,255,255,0.06); }
  .mobile-menu > a:last-child { border-bottom: 0; }
  .mobile-menu > a[aria-current] { color: #4f46e5; font-weight: 700; }
  nav.dark .mobile-menu > a[aria-current] { color: #a5b4fc; }

  @media (max-width: 40rem) {
    .nav-inner { padding: 0 1rem; }
    .desktop { display: none; }
    .mobile { display: block; }
    .right { gap: 0.9rem; }
  }
</style>
