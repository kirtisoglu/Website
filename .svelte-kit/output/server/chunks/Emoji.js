import { c as create_ssr_component, b as add_attribute, e as escape } from "./ssr.js";
const css = {
  code: "svg.svelte-c8tyih{stroke:currentColor;fill:currentColor;stroke-width:0;width:100%;height:auto;max-height:100%}",
  map: '{"version":3,"file":"IconBase.svelte","sources":["IconBase.svelte"],"sourcesContent":["<script>\\n  export let title = null;\\n  export let viewBox;\\n<\/script>\\n\\n<style>\\n  svg {\\n    stroke: currentColor;\\n    fill: currentColor;\\n    stroke-width: 0;\\n    width: 100%;\\n    height: auto;\\n    max-height: 100%;\\n  }  \\n</style>\\n\\n<svg xmlns=\\"http://www.w3.org/2000/svg\\" {viewBox}>\\n  {#if title}\\n    <title>{title}</title>\\n  {/if}\\n  <slot />\\n</svg>\\n"],"names":[],"mappings":"AAME,iBAAI,CACF,MAAM,CAAE,YAAY,CACpB,IAAI,CAAE,YAAY,CAClB,YAAY,CAAE,CAAC,CACf,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IACd"}'
};
const IconBase = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = null } = $$props;
  let { viewBox } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.viewBox === void 0 && $$bindings.viewBox && viewBox !== void 0) $$bindings.viewBox(viewBox);
  $$result.css.add(css);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("viewBox", viewBox, 0)} class="svelte-c8tyih">${title ? `<title>${escape(title)}</title>` : ``}${slots.default ? slots.default({}) : ``}</svg>`;
});
const Emoji = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label = "Emoji" } = $$props;
  let { symbol } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.symbol === void 0 && $$bindings.symbol && symbol !== void 0) $$bindings.symbol(symbol);
  return `<span role="img"${add_attribute("aria-label", label ? label : "", 0)}${add_attribute("aria-hidden", label ? "false" : "true", 0)}>${escape(symbol)}</span>`;
});
export {
  Emoji as E,
  IconBase as I
};
