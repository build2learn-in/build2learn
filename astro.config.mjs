// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';


import partytown from '@astrojs/partytown';


import cloudflare from '@astrojs/cloudflare';


const getSite = function () {

  console.log(process.env.SITE)
  console.log(process.env.CF_PAGES_URL)
  console.log(process.env.NODE_ENV)

  

  if (process.env.CF_PAGES_URL) {
    return new URL(process.env.CF_PAGES_URL).toString();
  }

  if (process.env.SITE) {
    return new URL(`https://${process.env.SITE}`).toString();
  }

  // Default to production site for builds
  return process.env.NODE_ENV === 'development'
    ? new URL('http://localhost:4321').toString() 
    : new URL('https://build2learn.in').toString();

};

// https://astro.build/config
export default defineConfig({
  site: getSite(),

  integrations: [
    mdx(), 
    sitemap(), 
    tailwind(), 
    partytown({ config: { forward: ['dataLayer.push'] } })
  ],

  adapter: cloudflare()
});