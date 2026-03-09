<script>
  import Head from "../components/Head.svelte";
  import Emoji from "../components/Emoji.svelte";
  import FaAngleDown from 'svelte-icons/fa/FaAngleDown.svelte';
  import LazyLoad from "../components/LazyLoad.svelte";
  import { fade } from "svelte/transition";

  export let data;
  let y;
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

  /* News section */
  .news {
    max-width: 860px;
    margin: 0 auto;
    padding: 3rem 2rem 2rem;
    width: 100%;
    box-sizing: border-box;
  }

  .news-title {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #4f46e5;
    margin: 0 0 1.25rem;
  }

  :global(.dark) .news-title {
    color: #818cf8;
  }

  .news-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    border-left: 2px solid rgba(79, 70, 229, 0.25);
    padding-left: 0;
    margin: 0;
    list-style: none;
  }

  .news-item {
    display: flex;
    gap: 1.25rem;
    padding: 0.9rem 0 0.9rem 1.5rem;
    position: relative;
    align-items: baseline;
  }

  .news-item::before {
    content: '';
    position: absolute;
    left: -5px;
    top: 1.2rem;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #4f46e5;
    flex-shrink: 0;
  }

  :global(.dark) .news-item::before {
    background: #818cf8;
  }

  .news-date {
    font-size: 0.8rem;
    font-weight: 600;
    color: #6b7280;
    white-space: nowrap;
    min-width: 7rem;
    padding-top: 0.05rem;
  }

  .news-text {
    font-size: 0.93rem;
    line-height: 1.65;
    color: #374151;
  }

  :global(.dark) .news-text {
    color: rgba(255,255,255,0.8);
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
    .news-item {
      flex-direction: column;
      gap: 0.25rem;
    }
    .news-date {
      min-width: unset;
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

  <img src="/home/6.png" alt="" class="intro-svg"/>
</div>

{#if data.news && data.news.length > 0}
  <section class="news" in:fade={{ duration: 400, delay: 300 }}>
    <h2 class="news-title">News &amp; Updates</h2>
    <ul class="news-list">
      {#each data.news as item}
        <li class="news-item">
          <span class="news-date">{item.date}</span>
          <span class="news-text">{@html item.text}</span>
        </li>
      {/each}
    </ul>
  </section>
{/if}
