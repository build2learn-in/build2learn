// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

import partytown from '@astrojs/partytown';

import cloudflare from '@astrojs/cloudflare';

const getSite = function () {
  console.log(process.env.SITE);
  console.log(process.env.CF_PAGES_URL);
  console.log(process.env.NODE_ENV);

  if (process.env.SITE) {
    return new URL(`https://${process.env.SITE}`).toString();
  }

  if (process.env.CF_PAGES_URL) {
    return new URL(process.env.CF_PAGES_URL).toString();
  }

  // Default to production site for builds
  return process.env.NODE_ENV === 'development'
    ? new URL('http://localhost:4321').toString()
    : new URL('https://build2learn.in').toString();
};

// https://astro.build/config
export default defineConfig({
  site: getSite(),

  // Enforce a single canonical URL shape so Google consolidates
  // /about and /about/ (etc.) instead of crawling both.
  trailingSlash: 'always',

  integrations: [
    mdx(),
    sitemap({
      // Stamp every entry with the build time so Google re-crawls
      // pages it had parked as "Crawled - currently not indexed".
      lastmod: new Date(),
      changefreq: 'weekly',
      priority: 0.7,
    }),
    tailwind(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
  ],

  adapter: cloudflare(),
});
