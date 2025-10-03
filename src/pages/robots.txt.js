import { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL, allowIndexing) => `
User-agent: *
${allowIndexing ? 'Allow: /' : 'Disallow: /'}

Sitemap: ${sitemapURL.href}
`;

export const GET = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  const allowIndexing = process.env.SITE === 'build2learn.in';
  return new Response(getRobotsTxt(sitemapURL, allowIndexing));
};