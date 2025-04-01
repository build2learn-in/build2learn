// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://build2learn.pages.dev/',
  // output: 'static',
  integrations: [mdx(), sitemap(), tailwind()],
  redirects: {
    '/project': '/project/page/1'
  }
});