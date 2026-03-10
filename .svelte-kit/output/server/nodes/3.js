import * as server from '../entries/pages/about/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/about/+page.server.js";
export const imports = ["_app/immutable/nodes/3.DfZj7Ahk.js","_app/immutable/chunks/scheduler.SePkYZyr.js","_app/immutable/chunks/index.B8SdgjTp.js","_app/immutable/chunks/index.B4jObAXg.js","_app/immutable/chunks/Head.BSfyBOAn.js"];
export const stylesheets = ["_app/immutable/assets/3.nHY6tLS0.css"];
export const fonts = [];
