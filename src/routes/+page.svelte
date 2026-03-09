<script>
  import Head from "../components/Head.svelte";
  import Emoji from "../components/Emoji.svelte";
  import { fade, fly } from "svelte/transition";

  export let data;
  let y;
</script>

<svelte:window bind:scrollY={y} />

<style>
  /* ── Hero ── */
  .hero {
    min-height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem 2rem 3rem;
    max-width: 780px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    position: relative;
  }

  .eyebrow {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #4f46e5;
    margin: 0 0 1.25rem;
  }

  :global(.dark) .eyebrow {
    color: #818cf8;
  }

  .hero h1 {
    font-size: clamp(2.4rem, 6vw, 3.6rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #111827;
    margin: 0 0 1.5rem;
  }

  :global(.dark) .hero h1 {
    color: #f9fafb;
  }

  .hero h1 .name {
    color: #4f46e5;
  }

  :global(.dark) .hero h1 .name {
    color: #818cf8;
  }

  .hero-body {
    font-size: 1.05rem;
    line-height: 1.8;
    color: #4b5563;
    max-width: 560px;
    margin: 0 0 2rem;
  }

  :global(.dark) .hero-body {
    color: rgba(255,255,255,0.7);
  }

  .hero-body a {
    color: #4f46e5;
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px solid #c7d2fe;
    transition: border-color 0.15s;
  }

  .hero-body a:hover {
    border-color: #4f46e5;
  }

  :global(.dark) .hero-body a {
    color: #a5b4fc;
    border-color: rgba(165,180,252,0.3);
  }

  :global(.dark) .hero-body a:hover {
    border-color: #a5b4fc;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2.5rem;
  }

  .tag {
    font-size: 0.8rem;
    font-weight: 500;
    background: #f5f3ff;
    border: 1px solid #ddd6fe;
    color: #4338ca;
    border-radius: 99px;
    padding: 0.25rem 0.85rem;
    letter-spacing: 0.01em;
  }

  :global(.dark) .tag {
    background: rgba(129,140,248,0.1);
    border-color: rgba(129,140,248,0.25);
    color: #a5b4fc;
  }

  .scroll-hint {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    opacity: 0.4;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6b7280;
    transition: opacity 0.3s;
  }

  .scroll-line {
    width: 1px;
    height: 2rem;
    background: #6b7280;
    animation: scrollpulse 1.8s ease-in-out infinite;
  }

  @keyframes scrollpulse {
    0%, 100% { transform: scaleY(1); opacity: 0.4; }
    50% { transform: scaleY(0.5); opacity: 1; }
  }

  /* ── News ── */
  .news {
    max-width: 780px;
    margin: 0 auto;
    padding: 0 2rem 5rem;
    width: 100%;
    box-sizing: border-box;
  }

  .news-title {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #4f46e5;
    margin: 0 0 1.25rem;
  }

  :global(.dark) .news-title {
    color: #818cf8;
  }

  .news-list {
    list-style: none;
    padding: 0;
    margin: 0;
    border-left: 2px solid #e0e7ff;
  }

  :global(.dark) .news-list {
    border-color: rgba(129,140,248,0.2);
  }

  .news-item {
    display: flex;
    gap: 1.5rem;
    padding: 0.85rem 0 0.85rem 1.5rem;
    position: relative;
    align-items: baseline;
  }

  .news-item::before {
    content: '';
    position: absolute;
    left: -5px;
    top: 1.15rem;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #4f46e5;
  }

  :global(.dark) .news-item::before {
    background: #818cf8;
  }

  .news-date {
    font-size: 0.78rem;
    font-weight: 600;
    color: #9ca3af;
    white-space: nowrap;
    min-width: 7rem;
  }

  .news-text {
    font-size: 0.92rem;
    line-height: 1.65;
    color: #374151;
  }

  :global(.dark) .news-text {
    color: rgba(255,255,255,0.78);
  }

  /* ── Mobile ── */
  @media (max-width: 640px) {
    .hero {
      padding: 3rem 1.25rem 4rem;
      min-height: calc(100vh - 4rem);
    }

    .news {
      padding: 0 1.25rem 4rem;
    }

    .news-item {
      flex-direction: column;
      gap: 0.2rem;
    }

    .news-date {
      min-width: unset;
    }
  }
</style>

<section class="hero" in:fly={{ y: 30, duration: 600, delay: 100 }}>
  <p class="eyebrow">Applied Mathematics · IIT Chicago</p>
  <h1>Hi, I'm <span class="name">Alaittin</span>.<br>I study graphs &amp; algorithms.</h1>
  <p class="hero-body">
    Fifth-year Ph.D. candidate at the
    <a href="https://www.iit.edu/applied-math" target="_blank" rel="noopener noreferrer">Illinois Institute of Technology</a>,
    working in the
    <a href="https://www.math.iit.edu/~kaul/DAM/DAM.html" target="_blank" rel="noopener noreferrer">Discrete Applied Mathematics Group</a>.
    My research spans graph theory, combinatorial optimization, and computational methods
    for real-world structured problems.
  </p>
  <div class="tags">
    <span class="tag">Graph Theory</span>
    <span class="tag">Combinatorics</span>
    <span class="tag">Optimization</span>
    <span class="tag">Algorithm Design</span>
    <span class="tag">Machine Learning</span>
  </div>

  {#if y < 80}
    <div class="scroll-hint" out:fade={{ duration: 300 }}>
      <div class="scroll-line"></div>
      scroll
    </div>
  {/if}
</section>

{#if data.news && data.news.length > 0}
  <section class="news" in:fade={{ duration: 400, delay: 200 }}>
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
