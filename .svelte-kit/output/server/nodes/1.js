

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.UQCsJhnL.js","_app/immutable/chunks/scheduler.CCT5uyBh.js","_app/immutable/chunks/index.Dbo7dq9V.js"];
export const stylesheets = [];
export const fonts = [];
