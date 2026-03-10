import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, url }) => {
  const upstream = `https://chicagohealthatlas.org/api/v1/${params.path}${url.search}`;
  const response = await fetch(upstream, {
    headers: { Accept: 'application/json' },
  });
  const body = await response.arrayBuffer();
  return new Response(body, {
    status: response.status,
    headers: {
      'content-type': response.headers.get('content-type') ?? 'application/json',
      'cache-control': 'public, max-age=3600',
    },
  });
};
