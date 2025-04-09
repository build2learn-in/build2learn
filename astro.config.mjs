// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';


const getSite = function () {
  
  if (process.env.SITE) {
    return new URL(`https://${process.env.SITE}`).toString();
  }
  
  if (process.env.CF_PAGES_URL) {
    return new URL(process.env.CF_PAGES_URL).toString();
  }

  return new URL('http://localhost:3000').toString();

};

// https://astro.build/config
export default defineConfig({
  site: getSite(),
  integrations: [mdx(), sitemap(), tailwind()],
});