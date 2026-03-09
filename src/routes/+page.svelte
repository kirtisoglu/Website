<script>
  import Head from "../components/Head.svelte";
  import Emoji from "../components/Emoji.svelte";
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";

  export let data;
  let y;

  const phrases = [
    "I study graphs & algorithms.",
    "I design redistricting methods.",
    "I optimize facility location.",
    "I build equitable networks.",
  ];

  let typedText = "";
  let showCursor = true;

  onMount(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const TYPING_SPEED = 65;
    const DELETING_SPEED = 35;
    const PAUSE_AFTER_TYPE = 1800;
    const PAUSE_AFTER_DELETE = 400;

    // Cursor blink
    const cursorInterval = setInterval(() => {
      showCursor = !showCursor;
    }, 530);

    function tick() {
      const current = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        typedText = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, PAUSE_AFTER_TYPE);
          return;
        }
        setTimeout(tick, TYPING_SPEED);
      } else {
        charIndex--;
        typedText = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, PAUSE_AFTER_DELETE);
          return;
        }
        setTimeout(tick, DELETING_SPEED);
      }
    }

    setTimeout(tick, 600);

    return () => clearInterval(cursorInterval);
  });
</script>

<svelte:window bind:scrollY={y} />

<!-- Dot grid background -->
<div class="page-bg" aria-hidden="true"></div>

<style>
  /* ── Dot grid background ── */
  .page-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, rgba(79,70,229,0.12) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  :global(.dark) .page-bg {
    background-image: radial-gradient(circle, rgba(129,140,248,0.08) 1px, transparent 1px);
  }

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
    z-index: 1;
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
    color: inherit;
  }

  /* ── Typed text ── */
  .typed-line {
    display: block;
    min-height: 1.2em;
  }

  .typed {
    color: #4f46e5;
  }

  :global(.dark) .typed {
    color: #818cf8;
  }

  .cursor {
    display: inline-block;
    width: 2px;
    margin-left: 1px;
    color: #4f46e5;
    animation: none;
    opacity: 1;
  }

  .cursor.blink {
    opacity: 0;
  }

  :global(.dark) .cursor {
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
    margin-bottom: 1.25rem;
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

  /* ── Collaboration badge ── */
  .collab-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: #6b7280;
    margin-bottom: 2.5rem;
  }

  :global(.dark) .collab-badge {
    color: rgba(255,255,255,0.5);
  }

  .collab-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    flex-shrink: 0;
    animation: pulse-green 2s ease-in-out infinite;
  }

  @keyframes pulse-green {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
    50% { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
  }

  :global(.dark) .collab-dot {
    background: #4ade80;
    animation: pulse-green-dark 2s ease-in-out infinite;
  }

  @keyframes pulse-green-dark {
    0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
    50% { box-shadow: 0 0 0 5px rgba(74,222,128,0); }
  }

  .scroll-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding: 1.5rem 0 0.5rem;
    opacity: 0.35;
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6b7280;
    max-width: 780px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    padding-left: 2rem;
    padding-right: 2rem;
    position: relative;
    z-index: 1;
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
    position: relative;
    z-index: 1;
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
  <h1>
    Hi, I'm <span class="name">Alaittin</span>.<br>
    <span class="typed-line">
      <span class="typed">{typedText}</span><span class="cursor" class:blink={!showCursor}>|</span>
    </span>
  </h1>
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
  <div class="collab-badge">
    <span class="collab-dot"></span>
    Open to collaboration &amp; consulting
  </div>
</section>

{#if y < 80}
  <div class="scroll-hint" out:fade={{ duration: 300 }}>
    <div class="scroll-line"></div>
    scroll
  </div>
{/if}

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
