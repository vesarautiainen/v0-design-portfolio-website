import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const repo = 'v0-design-portfolio-website';

export default {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html', // ✅ REQUIRED for GitHub Pages
      precompress: false,
      strict: true
    }),

    paths: {
		//base: process.env.NODE_ENV === 'production' ? `/${repo}` : ''
		base: '', //dev ? '' : `/${repo}`,
	},
  }
};
