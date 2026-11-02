<script>
  import { fade } from "svelte/transition";
  import Head from "../../../components/Head.svelte";
  import { groups, papers, talks } from "$lib/papers.js";

  // Number papers 1..n in the order they appear on the page (group order).
  const sections = groups.map((g) => ({
    ...g,
    papers: papers.filter((p) => p.group === g.id),
  }));
  let n = 0;
  for (const s of sections) for (const p of s.papers) p.num = ++n;

  let open = {};
  function toggle(id) {
    open = { ...open, [id]: !open[id] };
  }

  let copied = null;
  function copyBibtex(p) {
    navigator.clipboard.writeText(p.bibtex).then(() => {
      copied = p.id;
      setTimeout(() => { if (copied === p.id) copied = null; }, 2000);
    });
  }

</script>

<svelte:head>
  <title>Research — Alaittin Kirtisoglu</title>
  <meta name="description" content="Papers and talks by Alaittin Kirtisoglu: UAV routing, FalCom sampling for districting and hierarchical facility location, robot rendezvous, graph coloring, and healthcare network design in Chicago." />
</svelte:head>

<div class="page" in:fade={{ duration: 300 }}>
  <header>
    <h1>Research</h1>
    <p class="lead">
      My research lies at the intersection of graph theory, stochastic processes, operations
      research, and data science.
    </p>
    <p class="lead">
      I develop Markov chain Monte Carlo sampling methods for location-allocation and
      districting problems, analyze spatial data and perform statistical inference, and design
      optimization models and heuristics for routing and scheduling problems. I also
      occasionally work on problems in extremal graph theory.
    </p>
    <p class="lead">
      I am particularly interested in problems motivated by real-world needs and with the
      potential for meaningful social impact. Below are my completed and ongoing research
      projects, many of which are accompanied by open-source code and interactive tools.
    </p>
    <nav class="jump" aria-label="Page sections">
      <a href="#papers">Papers</a>
      <a href="#talks">Talks</a>
    </nav>
  </header>

  <div id="papers" class="papers">
    {#each sections as s}
      <section>
        <h2>{s.title}</h2>
        {#each s.papers as p (p.id)}
          <article id={p.id} class="paper" class:has-video={p.video}>
            {#if p.video}
              <video
                class="thumb"
                src={p.video.thumb + ".mp4"}
                poster={p.video.thumb + ".jpg"}
                autoplay
                muted
                loop
                playsinline
                preload="auto"
                aria-label={p.video.alt}
              ></video>
            {/if}
            <div class="body">
              <span class="num">{p.num}.</span>
              <h3 class="title">
                {#if p.status}<span class="status">{p.status}</span>{/if}{p.title}
              </h3>
              <p class="meta">
                {p.authors.join(", ")}{#if p.venue}<span class="dot">&nbsp;·&#32;</span>{@html p.venue}{/if}
              </p>
              <div class="links">
                <button
                  type="button"
                  class="abs-toggle"
                  aria-expanded={!!open[p.id]}
                  aria-controls={"abs-" + p.id}
                  on:click={() => toggle(p.id)}
                >Abstract</button>
                {#each p.links as l}
                  <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel={l.href.startsWith("http") ? "noopener" : undefined}>{l.label}</a>
                {/each}
                {#if p.bibtex}
                  <button type="button" class="bibtex" on:click={() => copyBibtex(p)}>
                    {copied === p.id ? "Copied!" : "BibTeX"}
                  </button>
                {/if}
              </div>
              <p id={"abs-" + p.id} class="abstract" hidden={!open[p.id]}>{@html p.abstract}</p>
            </div>
          </article>
        {/each}
      </section>
    {/each}
  </div>

  <section id="talks">
    <h2>Talks</h2>
    <table class="talks">
      <tbody>
        {#each talks as t}
          <tr>
            <td class="date">{t.date}</td>
            <td>
              <span class="venue">{@html t.venue}</span>
              <span class="talk-title">{t.title}</span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</div>

<Head/>

<style>
  .page {
    max-width: 860px;
    margin: 0 auto;
    padding: 2.5rem 0 4rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  h1 {
    font-size: clamp(1.8rem, 4vw, 2.3rem);
    font-weight: 700;
    letter-spacing: -0.015em;
    color: #111827;
    margin: 0 0 0.75rem;
    line-height: 1.15;
  }
  :global(.dark) h1 { color: #f9fafb; }

  .lead {
    font-size: 1rem;
    line-height: 1.7;
    color: #4b5563;
    max-width: 64ch;
    margin: 0;
  }
  :global(.dark) .lead { color: rgba(255,255,255,0.68); }
  .lead + .lead { margin-top: 0.75rem; }

  .jump {
    display: flex;
    gap: 1.25rem;
    margin-top: 1rem;
    font-size: 0.92rem;
  }

  a { color: #4f46e5; text-decoration: none; }
  a:hover { text-decoration: underline; }
  :global(.dark) a { color: #a5b4fc; }

  .papers {
    display: flex;
    flex-direction: column;
    gap: 2.25rem;
  }

  section { scroll-margin-top: 5rem; }

  h2 {
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6b7280;
    margin: 0 0 0.25rem;
  }
  :global(.dark) h2 { color: rgba(255,255,255,0.5); }

  /* ── Paper ── */
  .paper {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
    padding: 1.1rem 0;
    border-bottom: 1px solid #e5e7eb;
    scroll-margin-top: 5rem;
  }
  .paper.has-video { grid-template-columns: minmax(0, 1fr) 210px; }
  .paper.has-video .thumb { order: 2; }
  :global(.dark) .paper { border-bottom-color: rgba(255,255,255,0.08); }

  .thumb {
    width: 100%;
    aspect-ratio: 16 / 9;
    display: block;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    object-fit: contain;
  }
  :global(.dark) .thumb { border-color: rgba(255,255,255,0.12); }

  .body {
    position: relative;
    padding-left: 1.8rem;
    min-width: 0;
  }

  .num {
    position: absolute;
    left: 0;
    top: 0;
    font-weight: 500;
    color: #9ca3af;
    font-variant-numeric: tabular-nums;
    line-height: 1.4;
  }
  :global(.dark) .num { color: rgba(255,255,255,0.4); }

  .title {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
    color: #111827;
    margin: 0;
  }
  :global(.dark) .title { color: #f9fafb; }

  .status {
    display: inline-block;
    font-size: 0.66rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #6b7280;
    border: 1px solid #d1d5db;
    border-radius: 3px;
    padding: 0 0.35rem;
    margin-right: 0.45rem;
    vertical-align: 0.12em;
    line-height: 1.5;
  }
  :global(.dark) .status { color: rgba(255,255,255,0.55); border-color: rgba(255,255,255,0.2); }

  .meta {
    font-size: 0.88rem;
    color: #6b7280;
    margin: 0.3rem 0 0;
    line-height: 1.5;
  }
  :global(.dark) .meta { color: rgba(255,255,255,0.5); }


  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 1rem;
    margin-top: 0.55rem;
    font-size: 0.86rem;
  }

  .abs-toggle, .bibtex {
    font: inherit;
    color: #4f46e5;
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
  }
  .abs-toggle:hover, .bibtex:hover { text-decoration: underline; }
  :global(.dark) .abs-toggle, :global(.dark) .bibtex { color: #a5b4fc; }

  .abs-toggle::after {
    content: "▾";
    display: inline-block;
    margin-left: 0.25rem;
    font-size: 0.8em;
    transition: transform 0.15s;
  }
  .abs-toggle[aria-expanded="true"]::after { transform: rotate(180deg); }

  .abstract {
    margin: 0.75rem 0 0;
    padding: 0.85rem 1rem;
    background: #f6f7f9;
    border-radius: 6px;
    font-size: 0.9rem;
    line-height: 1.65;
    color: #1f2937;
    max-width: 70ch;
  }
  :global(.dark) .abstract { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); }

  /* ── Talks ── */
  .talks {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.92rem;
    margin-top: 0.5rem;
  }
  .talks td {
    padding: 0.7rem 1rem 0.7rem 0;
    border-bottom: 1px solid #e5e7eb;
    vertical-align: top;
    line-height: 1.45;
  }
  :global(.dark) .talks td { border-bottom-color: rgba(255,255,255,0.08); }
  .date {
    white-space: nowrap;
    color: #6b7280;
    font-variant-numeric: tabular-nums;
    width: 6.5rem;
  }
  :global(.dark) .date { color: rgba(255,255,255,0.5); }
  .venue { display: block; color: #111827; }
  :global(.dark) .venue { color: rgba(255,255,255,0.88); }
  .talk-title { display: block; font-size: 0.85rem; color: #6b7280; margin-top: 0.1rem; }
  :global(.dark) .talk-title { color: rgba(255,255,255,0.5); }

  @media (prefers-reduced-motion: reduce) {
    .abs-toggle::after { transition: none; }
  }

  @media (max-width: 640px) {
    .page { padding: 1.25rem 0 3rem; gap: 2rem; }
    .paper.has-video { grid-template-columns: minmax(0, 1fr); gap: 0.75rem; }
    .paper.has-video .thumb { order: 0; }
    .thumb { max-width: 420px; }
    .date { width: 5.5rem; }
  }
</style>
