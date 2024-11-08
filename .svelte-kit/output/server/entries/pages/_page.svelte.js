import { c as create_ssr_component, b as add_attribute, v as validate_component, e as escape } from "../../chunks/ssr.js";
import { I as IconBase, E as Emoji } from "../../chunks/Emoji.js";
const LazyLoad = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let el = null;
  let visible = false;
  let hasBeenVisible = false;
  return `<div${add_attribute("this", el, 0)}>${slots.default ? slots.default({ visible, hasBeenVisible }) : ``}</div>`;
});
const FaAngleDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(IconBase, "IconBase").$$render($$result, Object.assign({}, { viewBox: "0 0 320 512" }, $$props), {}, {
    default: () => {
      return `<path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path>`;
    }
  })}`;
});
const css = {
  code: ".cont.svelte-r7cihq{position:relative;min-height:25rem;height:calc(100vh - 4em);width:calc(100vw - 4em)}.intro.svelte-r7cihq{padding-left:1rem;padding-top:10rem;padding-right:8rem}@media(max-width: 40rem){.intro.svelte-r7cihq{padding-right:0rem;padding-top:5rem}}.intro-svg.svelte-r7cihq{position:absolute;bottom:-3rem;right:-1rem;width:100%;max-width:42rem;min-width:35rem;overflow:hidden;z-index:-1}.down-arrow.svelte-r7cihq{position:absolute;bottom:2rem;left:calc(50vw - 4em);color:rgb(255, 62, 0);height:2.5rem;width:2.5rem}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["\\n<script>\\n  import Head from \\"../components/Head.svelte\\";\\n  import Emoji from \\"../components/Emoji.svelte\\";\\n  import FaAngleDown from 'svelte-icons/fa/FaAngleDown.svelte'\\n  import LazyLoad from \\"../components/LazyLoad.svelte\\";\\n  let y;\\n  let onHome = true;\\n  import { fly, fade } from \\"svelte/transition\\";\\n<\/script>\\n\\n<svelte:window bind:scrollY={y} />\\n\\n<style>\\n  .cont {\\n    position: relative;\\n    min-height: 25rem;\\n    height: calc(100vh - 4em);\\n    width: calc(100vw - 4em);\\n  }\\n  .intro {\\n    padding-left: 1rem;\\n    padding-top: 10rem;\\n    padding-right: 8rem;\\n  }\\n  @media (max-width: 40rem) {\\n    .intro {\\n      padding-right: 0rem;\\n      padding-top: 5rem;\\n    }\\n  }\\n  .intro-svg {\\n    position: absolute;\\n    bottom: -3rem;\\n    right: -1rem;\\n    width: 100%;\\n    max-width: 42rem;\\n    min-width: 35rem;\\n    overflow: hidden;\\n    z-index: -1;\\n  }\\n  .down-arrow {\\n    position: absolute;\\n    bottom: 2rem;\\n    left: calc(50vw - 4em);\\n    color: rgb(255, 62, 0);\\n    height: 2.5rem;\\n    width: 2.5rem;\\n  }\\n</style>\\n\\n<div class=\\"cont\\">\\n  <LazyLoad let:hasBeenVisible let:visible>\\n      <div class=\\"intro\\">\\n        <h1>\\n          Welcome\\n          <Emoji symbol=\\"👋\\" />\\n        </h1>\\n        <p>\\n          I'm Alaittin - fourth-year Ph.D. student \\n          in applied mathematics\\n          <Emoji symbol=\\"📈\\" />\\n          working on\\n        </p>\\n        <p>\\n          Previously a PhD student at IIT\\n          <a\\n            aria-label=\\"Illinois Institute of Technology\\"\\n            href=\\"https://www.iit.edu/applied-math\\">\\n            in applied mathematics at Illinois Institute of Technology\\n          </a>\\n          <Emoji symbol=\\"⚖️\\" />\\n        </p>\\n        <p>\\n          And graduate student\\n          <Emoji symbol=\\"🧑‍💻\\" />\\n          at the\\n          <a aria-label=\\"University of Oxford\\" href=\\"http://www.ox.ac.uk/\\">\\n            Hacettepe University\\n          </a>\\n          <Emoji symbol=\\"🏫🏯\\" />\\n        </p>\\n      </div>\\n      <span\\n        style=\\"opacity: {1 - Math.max(0, y / 500)}\\"\\n        class=\\"down-arrow\\">\\n        <FaAngleDown />\\n      </span>\\n\\n    </LazyLoad>\\n\\n      <img\\n      src=\\"/home/6.png\\"\\n      alt=\\"\\"\\n      class=\\"intro-svg\\"/>\\n</div>"],"names":[],"mappings":"AAcE,mBAAM,CACJ,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,KAAK,CACjB,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CACzB,KAAK,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,GAAG,CACzB,CACA,oBAAO,CACL,YAAY,CAAE,IAAI,CAClB,WAAW,CAAE,KAAK,CAClB,aAAa,CAAE,IACjB,CACA,MAAO,YAAY,KAAK,CAAE,CACxB,oBAAO,CACL,aAAa,CAAE,IAAI,CACnB,WAAW,CAAE,IACf,CACF,CACA,wBAAW,CACT,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,CAChB,SAAS,CAAE,KAAK,CAChB,QAAQ,CAAE,MAAM,CAChB,OAAO,CAAE,EACX,CACA,yBAAY,CACV,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,IAAI,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CACtB,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CACtB,MAAM,CAAE,MAAM,CACd,KAAK,CAAE,MACT"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let y;
  $$result.css.add(css);
  return `  <div class="cont svelte-r7cihq">${validate_component(LazyLoad, "LazyLoad").$$render($$result, {}, {}, {
    default: ({ hasBeenVisible, visible }) => {
      return `<div class="intro svelte-r7cihq"><h1>Welcome
          ${validate_component(Emoji, "Emoji").$$render($$result, { symbol: "👋" }, {}, {})}</h1> <p>I&#39;m Alaittin - fourth-year Ph.D. student 
          in applied mathematics
          ${validate_component(Emoji, "Emoji").$$render($$result, { symbol: "📈" }, {}, {})}
          working on</p> <p>Previously a PhD student at IIT
          <a aria-label="Illinois Institute of Technology" href="https://www.iit.edu/applied-math" data-svelte-h="svelte-1052f4p">in applied mathematics at Illinois Institute of Technology</a> ${validate_component(Emoji, "Emoji").$$render($$result, { symbol: "⚖️" }, {}, {})}</p> <p>And graduate student
          ${validate_component(Emoji, "Emoji").$$render($$result, { symbol: "🧑‍💻" }, {}, {})}
          at the
          <a aria-label="University of Oxford" href="http://www.ox.ac.uk/" data-svelte-h="svelte-stycu">Hacettepe University</a> ${validate_component(Emoji, "Emoji").$$render($$result, { symbol: "🏫🏯" }, {}, {})}</p></div> <span style="${"opacity: " + escape(1 - Math.max(0, y / 500), true)}" class="down-arrow svelte-r7cihq">${validate_component(FaAngleDown, "FaAngleDown").$$render($$result, {}, {}, {})}</span>`;
    }
  })} <img src="/home/6.png" alt="" class="intro-svg svelte-r7cihq"></div>`;
});
export {
  Page as default
};
