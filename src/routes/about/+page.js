import { marked } from 'marked';

export async function load({ fetch }) {
  try {
    const [intro, content, booklist] = await Promise.all([
      fetch('/md/intro.md').then(res => res.text()),
      fetch('/md/content.md').then(res => res.text()),
      fetch('/md/booklist.md').then(res => res.text())
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
  const parsed = marked(md);
  // Extract title and emoji from the first line if it's a heading
  const titleMatch = parsed.match(/<h1.*?>(.*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1] : '';
  const emojiMatch = title.match(/(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu);
  const emoji = emojiMatch ? emojiMatch[0] : '';
  
  return {
    title,
    emoji,
    html: parsed
  };
}