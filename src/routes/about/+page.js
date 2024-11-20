import { marked } from 'marked';
import matter from 'gray-matter';

export async function load({ fetch }) {
  try {
    const [intro, content, booklist] = await Promise.all([
      fetch('/about/intro.md').then(res => res.text()),
      fetch('/about/bottom-content.md').then(res => res.text()),
      fetch('/about/booklist.md').then(res => res.text())
    ]);

    return {
      intro: parseMarkdown(intro),
      content: parseMarkdown(content),
      booklist: parseMarkdown(booklist)
    };
  } catch (error) {
    console.error('Error loading markdown files:', error);
    return {
      error: 'Failed to load data'
    };
  }
}

function parseMarkdown(md) {
  const { data, content } = matter(md);
  const parsed = marked(content);
  // Extract title and emoji from the first line if it's a heading
  const title = data.title || '';
  const emoji = data.emoji || '';
  const image = data.image || '';
  
  return {
    title,
    emoji,
    image,
    html: parsed
  };
}