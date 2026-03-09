export async function load({ fetch }) {
  try {
    const news = await fetch('/news.json').then(r => r.json());
    return { news };
  } catch {
    return { news: [] };
  }
}
