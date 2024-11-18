export async function load({ fetch }) {
    try {
      const [introRes, contentRes, booklistRes] = await Promise.all([
        fetch('/static/about/intro'),
        fetch('/static/about/content'),
        fetch('/static/about/booklist')
      ]);
  
      return {
        intro: await introRes.json(),
        content: await contentRes.json(),
        booklist: await booklistRes.json()
      };
    } catch (error) {
      console.error('Error loading data:', error);
      return {
        error: 'Failed to load data'
      };
    }
  }