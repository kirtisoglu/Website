import { c as create_ssr_component } from "../../../chunks/ssr.js";
const css = {
  code: "main.svelte-1uj95e7{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;min-height:100vh}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n    // Add any imports or scripts here\\n  <\/script>\\n  \\n  <svelte:head>\\n    <title>Blog</title>\\n  </svelte:head>\\n  \\n  <main>\\n    <h1>Blog</h1>\\n    <p>Welcome to my blog!. Here you'll find my latest posts.</p>\\n    <!-- Add more content, perhaps a list of blog posts -->\\n  </main>\\n  \\n  <style>\\n    main {\\n      display: flex;\\n      flex-direction: column;\\n      align-items: center;\\n      justify-content: center;\\n      text-align: center;\\n      min-height: 100vh;\\n    }\\n  </style>"],"names":[],"mappings":"AAeI,mBAAK,CACH,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,KACd"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1yq7jv9_START -->${$$result.title = `<title>Blog</title>`, ""}<!-- HEAD_svelte-1yq7jv9_END -->`, ""} <main class="svelte-1uj95e7" data-svelte-h="svelte-1cddxjd"><h1>Blog</h1> <p>Welcome to my blog!. Here you&#39;ll find my latest posts.</p>  </main>`;
});
export {
  Page as default
};
