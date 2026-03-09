import { execSync } from 'child_process';

/** Returns the date of the last git commit that touched the given files, or null. */
function gitLastCommitDate(...files) {
  try {
    const out = execSync(
      `git log -1 --format=%cd --date=format:"%B %d, '%y" -- ${files.join(' ')}`,
      { cwd: process.cwd(), encoding: 'utf8' }
    ).trim();
    return out || null;
  } catch {
    return null;
  }
}

export async function load({ url }) {
  const route = url.pathname.replace(/\/$/, '') || '/';

  // Map routes to the source files that define their content
  const fileMap = {
    '/':        ['src/routes/+page.svelte', 'src/routes/+page.server.js'],
    '/about':   ['src/routes/about/+page.svelte', 'src/routes/about/+page.server.js'],
    '/blog':    ['src/routes/blog/+page.svelte'],
  };

  const files = fileMap[route] ?? [];
  const lastUpdated = files.length ? gitLastCommitDate(...files) : null;

  return { lastUpdated };
}
