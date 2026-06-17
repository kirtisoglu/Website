import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  
  // Preprocess both `<style>` tags in Svelte files, as well as Markdown files
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md']
    })
  ],

  kit: {
    adapter: adapter({
      runtime: 'nodejs20.x'
    }),
    prerender: {
      handleHttpError: ({ path, message }) => {
        // PDFs under /papers/ and /plans/ are populated as drafts land.
        // Skip prerender 404s on those paths so the build still succeeds.
        if (path.startsWith('/papers/') || path.startsWith('/plans/')) {
          return;
        }
        throw new Error(message);
      }
    }
  }
};

export default config;

