# Alaittin Kirtisoglu — Personal Website

Personal academic website of Alaittin Kirtisoglu, Ph.D. candidate in Applied Mathematics at Illinois Institute of Technology.

**Live site:** [kirtisoglu.vercel.app](https://kirtisoglu.vercel.app)

## Stack

- [SvelteKit](https://kit.svelte.dev/) — framework
- [Vite](https://vitejs.dev/) — build tool
- [Vercel](https://vercel.com/) — deployment (via `@sveltejs/adapter-vercel`)

## Pages

- **Home** — intro, research interests, news & updates
- **About** — academic CV: education, research experience, publications, skills
- **Blog** — writing (in progress)

## Development

```bash
npm install
npm run dev
```

## Updating news

Edit [`static/news.json`](static/news.json) to add or remove items from the News & Updates section on the home page. Each entry has a `date` string and a `text` string (HTML allowed).

## Deployment

Pushes to `main` auto-deploy to Vercel.
