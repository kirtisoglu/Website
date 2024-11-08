import { c as create_ssr_component, e as escape } from "../../chunks/ssr.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status = 500 } = $$props;
  let { error = { message: "An unknown error occurred" } } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
  return `${$$result.head += `<!-- HEAD_svelte-4sldlf_START -->${$$result.title = `<title>${escape(status)}</title>`, ""}<!-- HEAD_svelte-4sldlf_END -->`, ""} <h1>${escape(status)}</h1> ${status === 404 ? `<p data-svelte-h="svelte-29llpm">The page you&#39;re looking for doesn&#39;t exist.</p>` : `${status === 500 ? `<p data-svelte-h="svelte-13ir3fx">An internal server error occurred. Please try again later.</p>` : `<p>${escape(error?.message || "An unknown error occurred")}</p>`}`} ${``}`;
});
export {
  Error as default
};
