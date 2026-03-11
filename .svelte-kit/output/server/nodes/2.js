

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(fullscreen)/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.D9wNHB2B.js","_app/immutable/chunks/scheduler.CDy4W9XK.js","_app/immutable/chunks/index.B6k8GN6g.js"];
export const stylesheets = [];
export const fonts = [];
