import { redirect } from '@sveltejs/kit';

// The About page was retired: its bio lives on Home and the full record is
// in /cv.pdf. Keep old links and search results working.
export function GET() {
  redirect(308, '/');
}
