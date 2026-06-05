// __BUILD_DATES__ is injected at build time by vite.config.js (git log).
// Falls back to null safely if git is unavailable (e.g. in dev without commits).

export async function load({ url }) {
  const route = url.pathname.replace(/\/$/, '') || '/';
  const dates = typeof __BUILD_DATES__ !== 'undefined' ? __BUILD_DATES__ : {};
  const lastUpdated = dates[route] ?? null;
  return { lastUpdated };
}
