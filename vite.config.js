import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { execSync } from 'child_process';

function gitDate(...files) {
  try {
    return execSync(
      `git log -1 --format=%cd --date=format:"%B %d, '%y" -- ${files.join(' ')}`,
      { encoding: 'utf8' }
    ).trim() || null;
  } catch {
    return null;
  }
}

const buildDates = {
  '/':      gitDate('src/routes/+page.svelte', 'src/routes/+page.server.js'),
  '/about': gitDate('src/routes/about/+page.svelte', 'src/routes/about/+page.server.js'),
  '/blog':  gitDate('src/routes/blog/+page.svelte'),
};

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    hmr: { overlay: false },
  },
  optimizeDeps: {
    include: ['marked']
  },
  define: {
    __BUILD_DATES__: JSON.stringify(buildDates),
  }
});
