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
    adapter: adapter()
  }
};

export default config;

