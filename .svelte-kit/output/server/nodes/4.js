

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.CaL_sF7o.js","_app/immutable/chunks/scheduler.CCT5uyBh.js","_app/immutable/chunks/index.Dbo7dq9V.js"];
export const stylesheets = ["_app/immutable/assets/3.BJhDIryW.css"];
export const fonts = [];
