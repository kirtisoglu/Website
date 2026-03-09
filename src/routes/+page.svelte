<script>
  import Head from "../components/Head.svelte";
  import Emoji from "../components/Emoji.svelte";
  import FaAngleDown from 'svelte-icons/fa/FaAngleDown.svelte'
  import LazyLoad from "../components/LazyLoad.svelte";
  let y;
  import { fly, fade } from "svelte/transition";
</script>

<svelte:window bind:scrollY={y} />

<style>
  .cont {
    position: relative;
    min-height: 25rem;
    height: calc(100vh - 4rem);
    overflow: hidden;
  }

  .intro {
    position: relative;
    z-index: 1;
    padding: 8rem 2rem 2rem;
    max-width: 32rem;
  }

  .intro h1 {
    margin-bottom: 0.75rem;
  }

  .intro p {
    line-height: 1.75;
    margin: 0.6rem 0;
  }

  .intro-svg {
    position: absolute;
    bottom: -3rem;
    right: -1rem;
    width: 55%;
    max-width: 42rem;
    min-width: 18rem;
    z-index: 0;
    pointer-events: none;
    opacity: 0.9;
  }

  .down-arrow {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    color: rgb(255, 62, 0);
    height: 2.5rem;
    width: 2.5rem;
    z-index: 1;
  }

  @media (max-width: 40rem) {
    .intro {
      padding-top: 4rem;
    }
    .intro-svg {
      width: 80%;
      min-width: 14rem;
      bottom: -1rem;
      right: -2rem;
      opacity: 0.35;
    }
  }
</style>

<div class="cont">
  <LazyLoad let:hasBeenVisible let:visible>
    <div class="intro">
      <h1>
        Welcome
        <Emoji symbol="👋" />
      </h1>
      <p>
        <b>I'm Alaittin</b> — fifth-year Ph.D. student in
        <a href="https://www.iit.edu/applied-math" target="_blank" rel="noopener noreferrer">applied mathematics</a>
        <Emoji symbol="🧑‍💻" /> at
        <a href="https://www.iit.edu" target="_blank" rel="noopener noreferrer">Illinois Institute of Technology</a>
        <Emoji symbol="🏫" />.
      </p>
      <p>
        <b>My research interests</b> lie in operations research and graph theory —
        resource allocation, transportation networks, graph algorithms and graph coloring.
      </p>
      <p>
        <b>In addition</b>, I design agentic workflows using large language models,
        and utilize neural networks and reinforcement learning.
      </p>
    </div>

    <span
      style="opacity: {1 - Math.max(0, y / 500)}"
      class="down-arrow">
      <FaAngleDown />
    </span>
  </LazyLoad>

  <img
    src="/home/6.png"
    alt=""
    class="intro-svg"/>
</div>
