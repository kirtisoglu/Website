import { promises as fs } from 'fs';
import { marked } from 'marked';

export async function load() {
  try {
    const [intro, content, booklist] = await Promise.all([
      fs.readFile('src/lib/md/intro.md', 'utf-8'),
      fs.readFile('src/lib/md/content.md', 'utf-8'),
      fs.readFile('src/lib/md/booklist.md', 'utf-8')
    ]);

    return {
      intro: marked(intro),
      content: marked(content),
      booklist: marked(booklist)
    };
  } catch (error) {
    console.error('Error loading markdown files:', error);
    return {
      error: 'Failed to load data'
    };
  }
}