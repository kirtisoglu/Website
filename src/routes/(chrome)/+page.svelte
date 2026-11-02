<script>
  import Head from "../../components/Head.svelte";
  import Emoji from "../../components/Emoji.svelte";
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";

  export let data;
  const phrases = [
    "I study graphs & algorithms.",
    "I design redistricting methods.",
    "I optimize facility location.",
    "I build equitable networks.",
  ];

  const clips = [
    {
      src: "/videos/uav_flight.mp4",
      href: "/research/uav-routing/",
      title: "UAV Routing",
      alt: "A fixed-wing UAV flying the best route found on a 200-target instance.",
      desc: "The best route found on a 200-target instance, flown in time. The UAV visits 30 targets, sets its speed on every leg, and loiters (purple) to delay an arrival when a later one collects more information.",
    },
    {
      src: "/falcom-gif/falcom_linkedin.mp4",
      href: "/research/falcom/",
      title: "FalCom",
      alt: "The FalCom chain on a 400-cell grid, on the cell map and on the dual graph.",
      desc: "The FalCom Markov chain on a 400-cell grid, shown on the cell map and on the dual graph. It samples ensembles of feasible districting and facility location plans rather than a single optimum.",
    },
    {
      src: "/videos/rendezvous_schedule.mp4",
      href: "/research/rendezvous/",
      title: "Robot Rendezvous",
      alt: "A tanker robot recharging 15 worker robots at rendezvous places, with the schedule as a Gantt chart.",
      desc: "A recharging schedule for 15 worker robots. The tanker meets each worker at the rendezvous place the cone program chose and recharges it; batteries drain on the road and fill at every meeting, and the campaign ends within its time limit.",
    },
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 0 1.5rem;
    position: relative;
    z-index: 1;
  }

  .eyebrow {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #4f46e5;
    margin: 0 0 0.6rem;
  }

  :global(.dark) .eyebrow {
    color: #818cf8;
  }

  .hero h1 {
    font-size: clamp(1.5rem, 4vw, 2.2rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #111827;
    margin: 0 0 0.85rem;
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
    font-size: 0.92rem;
    line-height: 1.7;
    color: #4b5563;
    margin: 0 0 1rem;
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
    gap: 0.4rem;
    margin-bottom: 0.75rem;
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
    margin-bottom: 1rem;
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

  /* ── Research videos ── */
  .clips {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 0.5rem 0 1.75rem;
    position: relative;
    z-index: 1;
  }

  .clips-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #4f46e5;
    margin: 0;
  }

  :global(.dark) .clips-label { color: #818cf8; }

  .clip {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
    gap: 1.25rem;
    align-items: center;
  }

  .clip video {
    width: 100%;
    aspect-ratio: 16 / 9;
    display: block;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 8px;
    background: #fff;
  }

  :global(.dark) .clip video { border-color: rgba(255,255,255,0.1); }

  .clip-title {
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.35rem;
  }

  :global(.dark) .clip-title { color: #f9fafb; }

  .clip-title a {
    color: inherit;
    text-decoration: none;
    transition: color 0.15s;
  }

  .clip-title a:hover { color: #4f46e5; }
  :global(.dark) .clip-title a:hover { color: #a5b4fc; }

  .clip-desc {
    font-size: 0.88rem;
    line-height: 1.6;
    color: #4b5563;
    margin: 0;
  }

  :global(.dark) .clip-desc { color: rgba(255,255,255,0.65); }

  @media (max-width: 640px) {
    .clip { grid-template-columns: minmax(0, 1fr); gap: 0.6rem; }
  }

  /* ── Tools teaser ── */
  .tools-teaser {
    padding: 0.5rem 0 1.5rem;
    position: relative;
    z-index: 1;
  }

  .tools-teaser-link {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 8px;
    padding: 0.85rem 1.1rem;
    text-decoration: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .tools-teaser-link:hover {
    border-color: #c7d2fe;
    box-shadow: 0 2px 8px rgba(79,70,229,0.08);
  }

  :global(.dark) .tools-teaser-link { border-color: rgba(255,255,255,0.08); }
  :global(.dark) .tools-teaser-link:hover { border-color: rgba(165,180,252,0.3); }

  .tools-teaser-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #4f46e5;
    flex-shrink: 0;
  }

  :global(.dark) .tools-teaser-label { color: #818cf8; }

  .tools-teaser-text {
    font-size: 0.88rem;
    color: #4b5563;
    flex: 1;
    line-height: 1.5;
  }

  :global(.dark) .tools-teaser-text { color: rgba(255,255,255,0.65); }

  .tools-teaser-arrow {
    font-size: 1rem;
    color: #4f46e5;
    flex-shrink: 0;
  }

  :global(.dark) .tools-teaser-arrow { color: #818cf8; }

  @media (max-width: 640px) {
    .tools-teaser-link {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.4rem;
    }
    .tools-teaser-arrow { align-self: flex-end; margin-top: -1.5rem; }
  }

  /* ── Mobile ── */
  @media (max-width: 640px) {
    .hero {
      padding: 0.75rem 0 1rem;
    }

    .tools-section {
      padding: 0 0 1rem;
    }
  }
</style>

<section class="hero" in:fly={{ y: 30, duration: 600 }}>
  <p class="eyebrow">Applied Mathematics · NYU Grossman (CSTAR)</p>
  <h1>
    Hi, I'm <span class="name">Alaittin</span>.<br>
    <span class="typed-line">
      <span class="typed">{typedText}</span><span class="cursor" class:blink={!showCursor}>|</span>
    </span>
  </h1>
  <p class="hero-body">
    I recently completed my Ph.D. in Applied Mathematics at the
    <a href="https://www.iit.edu/applied-math" target="_blank" rel="noopener noreferrer">Illinois Institute of Technology</a>,
    in the
    <a href="https://www.math.iit.edu/~kaul/DAM/DAM.html" target="_blank" rel="noopener noreferrer">Discrete Applied Mathematics Group</a> under the supervision of <a href="https://www.math.iit.edu/~kaul/" target="_blank" rel="noopener">Hemanshu Kaul</a>,
    and will join <a href="https://med.nyu.edu/" target="_blank" rel="noopener">NYU Grossman School of Medicine (CSTAR)</a> as a Research Scientist working on organ allocation optimization.
    Previously, I was a master's student at <a href="https://www.hacettepe.edu.tr/english/" target="_blank" rel="noopener">Hacettepe University</a>,
    working on graph colorings under the supervision of <a href="https://ozkahya.github.io/" target="_blank" rel="noopener">Lale Özkahya</a>.
    My research spans graph theory, combinatorial optimization, and computational methods
    for real-world structured problems.
  </p>
  <div class="collab-badge">
    <span class="collab-dot"></span>
    Open to collaboration &amp; consulting
  </div>
</section>

<section class="clips" in:fade={{ duration: 400, delay: 150 }}>
  <p class="clips-label">Research in motion</p>
  {#each clips as c}
    <article class="clip">
      <video src={c.src} autoplay loop muted playsinline aria-label={c.alt} title={c.alt}></video>
      <div>
        <h2 class="clip-title"><a href={c.href}>{c.title}</a></h2>
        <p class="clip-desc">{c.desc}</p>
      </div>
    </article>
  {/each}
</section>

<section class="tools-teaser" in:fade={{ duration: 400, delay: 150 }}>
  <a href="/tools/" class="tools-teaser-link">
    <span class="tools-teaser-label">Interactive Tools</span>
    <span class="tools-teaser-text">
      Explore the FalCom Visualizer and the Chicago Healthcare Accessibility Dashboard
    </span>
    <span class="tools-teaser-arrow">→</span>
  </a>
</section>

