import { redirect } from '@sveltejs/kit';

// The project page was folded into the Research page. Its tools keep their
// own addresses under the fullscreen routes.
export function GET() {
  redirect(308, '/research#uav-routing');
}
