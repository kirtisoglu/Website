
<script>
  import Head from "../components/Head.svelte";
  import Emoji from "../components/Emoji.svelte";
  import FaAngleDown from 'svelte-icons/fa/FaAngleDown.svelte'
  import LazyLoad from "../components/LazyLoad.svelte";
  let y;
  let onHome = true;
  import { fly, fade } from "svelte/transition";
</script>

<svelte:window bind:scrollY={y} />

<style>
  .cont {
    position: relative;
    min-height: 25rem;
    height: calc(100vh - 4em);
    width: calc(100vw - 4em);
  }
  .intro {
    padding-left: 1rem;
    padding-top: 10rem;
    padding-right: 8rem;
  }
  @media (max-width: 40rem) {
    .intro {
      padding-right: 0rem;
      padding-top: 5rem;
    }
  }
  .intro-svg {
    position: absolute;
    bottom: -3rem;
    right: -1rem;
    width: 100%;
    max-width: 42rem;
    min-width: 35rem;
    overflow: hidden;
    z-index: -1;
  }
  .down-arrow {
    position: absolute;
    bottom: 2rem;
    left: calc(50vw - 4em);
    color: rgb(255, 62, 0);
    height: 2.5rem;
    width: 2.5rem;
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
          <b>I'm Alaittin</b> - fourth-year Ph.D. student in <a href="https://www.iit.edu/applied-math" target="_blank" rel="noopener noreferrer">applied mathematics</a><Emoji symbol="🧑‍💻" />
          at <a href="https://www.iit.edu" target="_blank" rel="noopener noreferrer">Illinois Institute of Technology</a><Emoji symbol="🏫" />.
        </p>
        <p>
          <b>My research interests</b> lie in operations research and graph theory, especially resource allocation, <br> 
          transportation networks, graph algorithms, and related machine learning algorithms.
        </p>
        <p>
         In addition to that, I design agentic workflows using large language models and widely utilize neural networks, and reinforcement learning.
        </p>
        <p>
          I am open for research and applied scientist positions.
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