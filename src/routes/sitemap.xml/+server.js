export const prerender = true;

const SITE = 'https://akirtisoglu.me';

const pages = [
  { path: '/',                                        priority: '1.0', changefreq: 'monthly' },
  { path: '/about',                                   priority: '0.9', changefreq: 'monthly' },
  { path: '/research',                                priority: '0.9', changefreq: 'weekly'  },
  { path: '/teaching',                                priority: '0.7', changefreq: 'monthly' },
  { path: '/blog',                                    priority: '0.7', changefreq: 'weekly'  },
  { path: '/research/falcom',                         priority: '0.8', changefreq: 'monthly' },
  { path: '/research/chicago-healthcare-network',     priority: '0.8', changefreq: 'monthly' },
];

/** @type {import('./$types').RequestHandler} */
export function GET() {
  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${SITE}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600'
    }
  });
}
