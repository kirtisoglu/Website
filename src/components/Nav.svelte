<script>
    import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte';
    import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte';
    import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
    import FaNewspaper from 'svelte-icons/fa/FaNewspaper.svelte';
    import FaPencilAlt from 'svelte-icons/fa/FaPencilAlt.svelte';
    import FaUser from 'svelte-icons/fa/FaUser.svelte';
    import { onMount } from 'svelte';

    export let segment;
    let linkedIn = "https://www.linkedin.com/in/alaittin-kirtisoglu";
    let twitter = "https://x.com/kirtisoglu";
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
    <a
      rel="prefetch"
      aria-label="Home"
      aria-current={segment === undefined ? 'page' : undefined}
      href="."
      class="site-name">
      Alaittin Kirtisoglu
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
        aria-current={segment === 'blog' ? 'page' : undefined}
        href="blog/">
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
      <a aria-label="LinkedIn" target="_blank" class="icon" href={linkedIn}>
        <FaLinkedin aria-label="linked in" />
      </a>
      <a aria-label="Twitter" target="_blank" class="icon" href={twitter}>
        <FaTwitter aria-label="twitter" />
      </a>
      <a aria-label="GitHub" target="_blank" class="icon" href={github}>
        <FaGithub aria-label="GitHub" />
      </a>
      <div class="divider" />
      <button
        class="theme-toggle"
        aria-label="Toggle dark mode"
        on:click={toggleTheme}
        title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
        {dark ? '☀️' : '🌙'}
      </button>
    </div>
</nav>


<style>
    nav {
      position: sticky;
      top: 0;
      height: 4rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
      font-weight: 400;
      z-index: 3;
      background-color: #ffffff;
      border-bottom: 1px solid rgba(0,0,0,0.08);
      transition: background-color 0.2s, border-color 0.2s;
    }

    nav.dark {
      background-color: #242424;
      border-bottom: 1px solid rgba(255,255,255,0.07);
    }

    .site-name {
      font-weight: 500;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .links {
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
    }

    a {
      text-decoration: none;
    }

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
      color: #4f46e5;
      position: relative;
      display: inline-block;
    }

    nav.dark [aria-current] {
      color: #818cf8;
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
