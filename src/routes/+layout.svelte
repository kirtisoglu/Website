<!--
  Minimal root layout. The full chrome (Nav, profile sidebar, footer,
  KaTeX, etc.) lives in src/routes/(chrome)/+layout.svelte and only
  wraps routes inside that group. Fullscreen routes (the dashboard,
  the FalCom visualizer) live in (fullscreen)/ and don't inherit chrome.

  Keeping this layout free of {#if} branches around <slot/> avoids the
  Svelte 4 "Cannot read properties of null (reading 'insertBefore')"
  race that broke reactive updates on fullscreen pages (e.g. dashboard
  accordions silently failing to toggle).
-->
<script>
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  injectAnalytics();
</script>

<slot />
