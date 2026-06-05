import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { execSync } from 'child_process';

function gitDate(...files) {
  try {
    const quoted = files.map(f => `'${f.replace(/'/g, "'\\''")}'`).join(' ');
    return execSync(
      `git log -1 --format=%cd --date=format:"%B %d, '%y" -- ${quoted}`,
      { encoding: 'utf8' }
    ).trim() || null;
  } catch {
    return null;
  }
}

const buildDates = {
  '/':      gitDate('src/routes/(chrome)/+page.svelte', 'src/routes/(chrome)/+page.server.js'),
  '/about': gitDate('src/routes/(chrome)/about/+page.svelte', 'src/routes/(chrome)/about/+page.server.js'),
  '/blog':  gitDate('src/routes/(chrome)/blog/+page.svelte'),
};

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    hmr: { overlay: false },
  },
  optimizeDeps: {
    include: ['marked', '@deck.gl/core', '@deck.gl/layers', '@deck.gl/mapbox'],
  },
  define: {
    __BUILD_DATES__: JSON.stringify(buildDates),
  }
});
