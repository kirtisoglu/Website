
import root from '../root.svelte';
import { set_building, set_prerendering } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_manifest, set_read_implementation } from '__sveltekit/server';
import { set_private_env, set_public_env, set_safe_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_dir: "_app",
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"" + assets + "/favicon.ico\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\n\t\t<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n\t\t<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n\t\t<link href=\"https://fonts.googleapis.com/css2?family=Mukta&family=Poppins:wght@500;600;700&display=swap\" rel=\"stylesheet\" />\n\n\t\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css\"\n\t\t\tintegrity=\"sha384-R4558gYOUz8mP9YWpZJjofhk+zx0AS11p36HnD2ZKj/6JR5z27gSSULCNHIRReVs\" crossorigin=\"anonymous\" />\n\t\t<script defer src=\"https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.js\"\n\t\t\tintegrity=\"sha384-z1fJDqw8ZApjGO3/unPWUPsIymfsJmyrDVWC8Tv/a1HeOtGmkwNd/7xUS0Xcnvsx\"\n\t\t\tcrossorigin=\"anonymous\"></script>\n\t\t<script defer src=\"https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/contrib/auto-render.min.js\"\n\t\t\tintegrity=\"sha384-+XBljXPPiv+OzfbB3cVmLHf4hdUFHlWNZN5spNQ7rmHTXpd7WvJum6fIACpNNfIR\" crossorigin=\"anonymous\"></script>\n\n\t\t<script type=\"application/ld+json\">\n\t\t\t{\n\t\t\t\t\"@context\": \"https://schema.org\",\n\t\t\t\t\"@type\": \"Person\",\n\t\t\t\t\"name\": \"Alaittin Kirtisoglu\",\n\t\t\t\t\"url\": \"https://akirtisoglu.me\",\n\t\t\t\t\"image\": \"https://akirtisoglu.me/about/portrait.webp\",\n\t\t\t\t\"jobTitle\": \"PhD Candidate in Applied Mathematics\",\n\t\t\t\t\"affiliation\": {\n\t\t\t\t\t\"@type\": \"Organization\",\n\t\t\t\t\t\"name\": \"Illinois Institute of Technology\",\n\t\t\t\t\t\"url\": \"https://www.iit.edu\"\n\t\t\t\t},\n\t\t\t\t\"alumniOf\": {\n\t\t\t\t\t\"@type\": \"Organization\",\n\t\t\t\t\t\"name\": \"Middle East Technical University\"\n\t\t\t\t},\n\t\t\t\t\"knowsAbout\": [\n\t\t\t\t\t\"Combinatorial Optimization\",\n\t\t\t\t\t\"Algorithm Design\",\n\t\t\t\t\t\"Graph Theory\",\n\t\t\t\t\t\"Computational Districting\",\n\t\t\t\t\t\"Facility Location\",\n\t\t\t\t\t\"Healthcare Network Design\"\n\t\t\t\t],\n\t\t\t\t\"sameAs\": [\n\t\t\t\t\t\"https://github.com/kirtisoglu\",\n\t\t\t\t\t\"https://scholar.google.com/citations?user=A1faWlMAAAAJ&hl=en\",\n\t\t\t\t\t\"https://www.linkedin.com/in/alaittin-kirtisoglu\",\n\t\t\t\t\t\"https://www.researchgate.net/profile/Alaittin-Kirtisoglu\"\n\t\t\t\t]\n\t\t\t}\n\t\t</script>\n\t\t" + head + "\n\t</head>\n\t<!--\n\t\tdata-sveltekit-reload forces a full HTML reload on every internal\n\t\tlink click instead of SPA navigation. Workaround for a Svelte 4\n\t\thydration race triggered by the route-group layout: the deeper\n\t\tgenerated root.svelte + the layout's {#if segment} branch flip\n\t\tintermittently detached the slot's anchor text-node during nav,\n\t\tcausing \"Cannot read properties of null (reading 'insertBefore')\"\n\t\tand blank pages after clicking the nav. Full reload sidesteps the\n\t\tnav-time patch entirely.\n\t-->\n\t<body data-sveltekit-preload-data=\"hover\" data-sveltekit-reload>\n\t\t<div style=\"display: contents\">" + body + "</div>\n\t</body>\n</html>\n\n",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family:\n\t\t\t\t\tsystem-ui,\n\t\t\t\t\t-apple-system,\n\t\t\t\t\tBlinkMacSystemFont,\n\t\t\t\t\t'Segoe UI',\n\t\t\t\t\tRoboto,\n\t\t\t\t\tOxygen,\n\t\t\t\t\tUbuntu,\n\t\t\t\t\tCantarell,\n\t\t\t\t\t'Open Sans',\n\t\t\t\t\t'Helvetica Neue',\n\t\t\t\t\tsans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "1dsirz3"
};

export async function get_hooks() {
	return {
		
		
	};
}

export { set_assets, set_building, set_manifest, set_prerendering, set_private_env, set_public_env, set_read_implementation, set_safe_public_env };
