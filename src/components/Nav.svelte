<script>
    import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte';
    import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
    import FaNewspaper from 'svelte-icons/fa/FaNewspaper.svelte';
    import FaPencilAlt from 'svelte-icons/fa/FaPencilAlt.svelte';
    import FaUser from 'svelte-icons/fa/FaUser.svelte';
    import { onMount } from 'svelte';

    export let segment;
    let linkedIn = "https://www.linkedin.com/in/alaittin-kirtisoglu";
    let github = "https://github.com/kirtisoglu";

    let dark = false;

    onMount(() => {
        const stored = localStorage.getItem('theme');
        dark = stored === 'dark';
        applyTheme(dark);
    });

    function toggleTheme() {
        dark = !dark;
        localStorage.setItem('theme', dark ? 'dark' : 'light');
        applyTheme(dark);
    }

    function applyTheme(isDark) {
        document.documentElement.classList.toggle('dark', isDark);
    }
</script>

<nav class:dark={dark}>
  <div class="nav-inner">
    <a
      rel="prefetch"
      aria-label="Home"
      aria-current={segment === undefined ? 'page' : undefined}
      href="."
      class="site-name">
      Alaittin's Homepage
    </a>
    <div class="links">
      <a
        aria-label="About"
        rel="prefetch"
        aria-current={segment === 'about' ? 'page' : undefined}
        href="about/">
        <span class="hide-on-mobile">About</span>
        <span class="show-on-mobile icon"><FaUser aria-label="about" /></span>
      </a>
      <a
        aria-label="Blog"
        rel="prefetch"
        aria-current={segment === 'research' ? 'page' : undefined}
        href="research/">
        <span class="hide-on-mobile">Research</span>
        <span class="show-on-mobile icon"><FaPencilAlt aria-label="research" /></span>
      </a>
      <a
        aria-label="Teaching"
        rel="prefetch"
        aria-current={segment === 'teaching' ? 'page' : undefined}
        href="teaching/">
        <span class="hide-on-mobile">Teaching</span>
        <span class="show-on-mobile icon"><FaNewspaper aria-label="teaching" /></span>
      </a>
      <div class="divider" />
      <a aria-label="LinkedIn" target="_blank" class="icon linkedin-nav" href={linkedIn}>
        <FaLinkedin aria-label="linked in" />
      </a>
      <a aria-label="Google Scholar" target="_blank" class="icon scholar-icon scholar-nav" href="https://scholar.google.com/citations?user=PLACEHOLDER">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 10a8 8 0 0 1 7.162 3.44L24 9.5z"/></svg>
      </a>
      <a aria-label="ResearchGate" target="_blank" class="icon rg-icon rgate-nav" href="https://www.researchgate.net/profile/Alaittin-Kirtisoglu">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a12.39 12.39 0 0 0-.35 2.133 20.818 20.818 0 0 0-.059 1.055v.78c-.868-.015-1.71.014-2.527.09V5.55c0-.547-.043-1.244-.13-2.09-.085-.848-.333-1.598-.742-2.25C12.092.562 11.388.187 10.48.03 9.573-.127 8.523.015 7.332.44L0 3.217v17.8l7.332-2.9c1.19-.47 2.24-.612 3.148-.426.907.185 1.61.607 2.11 1.267.5.66.8 1.49.9 2.49H24V0h-4.414zM10.48 16.5c-.496 0-.97-.065-1.42-.194l-2.73 1.082V5.966l2.73-1.082c.45-.178.917-.267 1.4-.267.483 0 .917.128 1.302.384.385.255.69.63.913 1.123.225.493.337 1.1.337 1.82 0 .72-.112 1.332-.337 1.836-.222.503-.528.883-.913 1.14-.385.255-.82.383-1.302.383-.483 0-.95-.09-1.4-.267v3.363c.45-.13.924-.194 1.42-.194.983 0 1.824.222 2.524.667.7.444 1.05 1.1 1.05 1.967 0 .867-.35 1.522-1.05 1.967-.7.444-1.54.667-2.524.667zm10.106-2.2h-2.4V9.067h-1.6V7.267h1.6V5.4c0-.8.2-1.4.6-1.8.4-.4.933-.6 1.6-.6.267 0 .533.033.8.1v1.867c-.2-.067-.4-.1-.6-.1-.4 0-.6.2-.6.6v1.8h1.2l-.2 1.8h-1v5.233z"/></svg>
      </a>
      <a aria-label="GitHub" target="_blank" class="icon github-nav" href={github}>
        <FaGithub aria-label="GitHub" />
      </a>
      <button
        class="theme-toggle"
        aria-label="Toggle dark mode"
        on:click={toggleTheme}
        title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
        {dark ? '☀️' : '🌙'}
      </button>
    </div>
  </div>
</nav>


<style>
    nav {
      position: sticky;
      top: 0;
      height: 4rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-weight: 400;
      z-index: 3;
      background-color: #ffffff;
      border-bottom: 1px solid rgba(0,0,0,0.08);
      transition: background-color 0.2s, border-color 0.2s;
    }

    .nav-inner {
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 1.5rem;
      box-sizing: border-box;
      position: relative;
    }

    nav.dark {
      background-color: #242424;
      border-bottom: 1px solid rgba(255,255,255,0.07);
    }

    .site-name {
      font-weight: 500;
      white-space: nowrap;
      flex-shrink: 0;
      color: #111827;
      width: 200px;
    }

    nav.dark .site-name {
      color: #f9fafb;
    }

    .links {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1.25rem;
    }

    .icon {
      width: 1.2rem;
      height: 1.2rem;
      display: flex;
      align-items: center;
      color: #9ca3af;
      transition: color 0.15s;
    }

    a {
      text-decoration: none;
      color: #6b7280;
    }

    nav.dark a {
      color: rgba(255,255,255,0.55);
    }

    .icon:hover { color: #111827; }

    .icon.linkedin-nav:hover  { color: #0a66c2; }
    .icon.scholar-nav:hover   { color: #4285f4; }
    .icon.rgate-nav:hover     { color: #00ccbb; }
    .icon.github-nav:hover    { color: #24292e; }

    nav.dark .icon { color: rgba(255,255,255,0.4); }
    nav.dark .icon.linkedin-nav:hover  { color: #4f9de8; }
    nav.dark .icon.scholar-nav:hover   { color: #7fb3f5; }
    nav.dark .icon.rgate-nav:hover     { color: #33ddcc; }
    nav.dark .icon.github-nav:hover    { color: rgba(255,255,255,0.9); }

    .show-on-mobile {
      display: none;
    }

    .theme-toggle {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      font-size: 1.1rem;
      line-height: 1;
      display: flex;
      align-items: center;
      border-radius: 4px;
    }
    .theme-toggle:hover {
      border-color: transparent;
    }

    .divider {
      height: 1.5rem;
      width: 1px;
      background-color: rgba(0,0,0,0.15);
    }

    nav.dark .divider {
      background-color: rgba(255,255,255,0.2);
    }

    [aria-current] {
      color: #111827;
      font-weight: 600;
      position: relative;
      display: inline-block;
    }

    nav.dark [aria-current] {
      color: #f9fafb;
    }

    .scholar-icon svg,
    .rg-icon svg {
      width: 100%;
      height: 100%;
    }

    @media (max-width: 40rem) {
      nav {
        padding: 0 1rem;
      }
      .hide-on-mobile {
        display: none;
      }
      .show-on-mobile {
        display: flex;
        align-items: center;
      }
      .links {
        gap: 0.9rem;
      }
    }
</style>
