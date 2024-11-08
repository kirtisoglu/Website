

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.B4JfU2DE.js","_app/immutable/chunks/scheduler.CCT5uyBh.js","_app/immutable/chunks/index.Dbo7dq9V.js"];
export const stylesheets = ["_app/immutable/assets/3.BJhDIryW.css"];
export const fonts = [];
