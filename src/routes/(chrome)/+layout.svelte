<script>
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import '../../app.css';
  import Nav from "../../components/Nav.svelte";
  import Footer from "../../components/Footer.svelte";

  export let data = {};

  // Start each new page at the top, unless the link points at a section (#...).
  afterNavigate(({ type, to }) => {
    if (type !== 'popstate' && !to?.url.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  });

  onMount(() => {
    if (typeof renderMathInElement === 'function') {
      // Scope KaTeX scan to the main content area, not document.body.
      // Scanning the whole body detaches text nodes Svelte uses as
      // hydration anchors (notably root.svelte's #svelte-announcer
      // marker), causing intermittent "insertBefore on null" errors
      // during the first patch after hydration.
      const main = document.querySelector('main') || document.body;
      renderMathInElement(main);
    }
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
</svelte:head>

<Nav />

<main>
  <slot/>
</main>

<Footer lastUpdated={data.lastUpdated} />

<style>
  main {
    width: 100%;
    max-width: 1100px;
    min-height: 70vh;
    margin: 0 auto;
    padding: 0 1.5rem;
    box-sizing: border-box;
  }

  @media (max-width: 40rem) {
    main { padding: 0 1rem; }
  }
</style>
