import { redirect } from '@sveltejs/kit';

// Tools now sit next to their papers on the Research page.
export function GET() {
  redirect(308, '/research');
}
