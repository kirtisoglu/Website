import * as server from '../entries/pages/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/3.vV6Y8-fk.js","_app/immutable/chunks/scheduler.CDy4W9XK.js","_app/immutable/chunks/index.B6k8GN6g.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/index.D3UhBU-y.js"];
export const stylesheets = ["_app/immutable/assets/3.C8ivfHeV.css"];
export const fonts = [];
