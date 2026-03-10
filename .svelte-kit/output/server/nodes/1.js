

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.CVW77GQU.js","_app/immutable/chunks/scheduler.SePkYZyr.js","_app/immutable/chunks/index.B8SdgjTp.js"];
export const stylesheets = [];
export const fonts = [];
