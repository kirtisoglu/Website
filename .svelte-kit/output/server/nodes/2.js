

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CI81HXUa.js","_app/immutable/chunks/scheduler.CCT5uyBh.js","_app/immutable/chunks/index.Dbo7dq9V.js","_app/immutable/chunks/Emoji.cajHXayH.js"];
export const stylesheets = ["_app/immutable/assets/2.DItMWoJI.css","_app/immutable/assets/Emoji.C6PPviNE.css"];
export const fonts = [];
