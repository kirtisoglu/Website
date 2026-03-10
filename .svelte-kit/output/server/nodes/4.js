

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.C72NHYTI.js","_app/immutable/chunks/scheduler.SePkYZyr.js","_app/immutable/chunks/index.B8SdgjTp.js","_app/immutable/chunks/index.B4jObAXg.js","_app/immutable/chunks/Head.BSfyBOAn.js"];
export const stylesheets = ["_app/immutable/assets/4.BCtWv5tB.css"];
export const fonts = [];
