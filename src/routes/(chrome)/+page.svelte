<script>
  import Head from "../../components/Head.svelte";

  const email = "Alaittin.Kirtisoglu@nyulangone.org";
  let copied = false;

  function copyEmail() {
    navigator.clipboard.writeText(email).then(() => {
      copied = true;
      setTimeout(() => { copied = false; }, 2000);
    });
  }

  // Mouseover text for each animation.
  const falcom = [
    { name: "falcom_grid",  title: "FalCom on a 400-cell grid: a Markov chain over districting plans. Each step merges neighbouring districts and splits them again; stars mark the facilities." },
    { name: "falcom_graph", title: "The same FalCom chain drawn on the dual graph of the grid: one node per cell, coloured by district." },
    { name: "falcom_tree",  title: "One FalCom step: a random spanning tree of the merged districts is cut into new, balanced districts." },
  ];
  const routing = [
    { name: "uav",        title: "Fixed-wing UAV routing: the local search reshaping a route from the depot through the targets." },
    { name: "rendezvous", title: "Robot rendezvous: a tanker robot leaves its base and meets each worker robot to recharge it." },
  ];
</script>

<Head/>

<div class="home">
  <section class="intro">
    <aside class="card">
      <img src="/about/portrait.webp" alt="Alaittin Kirtisoglu" width="190" height="230" />
      <div class="row">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
        <span>New York, NY</span>
      </div>
      <div class="row">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>New York University</span>
      </div>
      <div class="row">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <span class="email">Alaittin.Kirtisoglu<wbr>@nyulangone.org</span>
        <button type="button" class="copy" on:click={copyEmail} aria-label="Copy email address" title="Copy email">
          {#if copied}
            <span class="copied">Copied!</span>
          {:else}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          {/if}
        </button>
      </div>
      <a class="row link" href="https://github.com/kirtisoglu" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        <span>GitHub</span>
      </a>
      <a class="row link" href="https://www.linkedin.com/in/alaittin-kirtisoglu" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
        <span>LinkedIn</span>
      </a>
      <a class="row link" href="https://scholar.google.com/citations?user=A1faWlMAAAAJ&hl=en" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 10a8 8 0 0 1 7.162 3.44L24 9.5z"/></svg>
        <span>Google Scholar</span>
      </a>
    </aside>

    <div class="text">
      <h1>Alaittin Kirtisoglu</h1>
      <p class="role">Research Scientist · NYU Grossman School of Medicine</p>
      <p>
        I recently joined the
        <a href="https://med.nyu.edu/centers-programs/surgical-transplant-applied-research/" target="_blank" rel="noopener">Center for Surgical &amp; Transplant Applied Research (CSTAR)</a>
        in the Department of Surgery at NYU Grossman School of Medicine as a Research Scientist,
        where I work with
        <a href="https://med.nyu.edu/faculty/sommer-e-gentry" target="_blank" rel="noopener">Sommer Gentry</a>
        on decision-making models, statistical inference, and access and equity analysis in organ
        allocation and public health planning.
      </p>
      <p>
        I received my Ph.D. in Applied Mathematics from
        <a href="https://www.iit.edu/applied-math" target="_blank" rel="noopener">Illinois Institute of Technology</a>
        in 2026, under the supervision of
        <a href="https://www.math.iit.edu/~kaul/" target="_blank" rel="noopener">Hemanshu Kaul</a>,
        and my M.Sc. in Mathematics from
        <a href="https://www.hacettepe.edu.tr/english/" target="_blank" rel="noopener">Hacettepe University</a>
        in 2021, under the supervision of
        <a href="https://ozkahya.github.io/" target="_blank" rel="noopener">Lale Özkahya</a>.
      </p>
      <p>
        I often generate animations from the kinds of discrete processes that come up in my
        research. Some examples with brief explanations in the mouseover text are below.
      </p>

      <div class="clips" aria-label="Animations from my research">
        <div class="clip-row r1">
          {#each falcom as c}
            <video
              class="clip"
              src={`/videos/home/${c.name}.mp4`}
              poster={`/videos/home/${c.name}.jpg`}
              autoplay
              muted
              loop
              playsinline
              preload="auto"
              title={c.title}
              aria-label={c.title}
            ></video>
          {/each}
        </div>
        <div class="clip-row r2">
          {#each routing as c}
            <video
              class="clip"
              src={`/videos/home/${c.name}.mp4`}
              poster={`/videos/home/${c.name}.jpg`}
              autoplay
              muted
              loop
              playsinline
              preload="auto"
              title={c.title}
              aria-label={c.title}
            ></video>
          {/each}
        </div>
      </div>
    </div>
  </section>

</div>

<style>
  /* Sized to fit on one laptop screen (e.g. 1366×768) with the header and footer. */
  .home {
    --tile: clamp(100px, calc((100vh - 500px) / 2.15), 200px);
    padding: 1.1rem 0 0;
  }

  /* ── Intro: photo card + text ── */
  .intro {
    display: grid;
    grid-template-columns: 190px minmax(0, 1fr);
    gap: 2rem;
    align-items: start;
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    padding: 0.85rem;
    background: #fafafa;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 10px;
  }
  :global(.dark) .card { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.08); }

  .card img {
    width: 100%;
    height: 175px;
    object-fit: cover;
    object-position: top;
    border-radius: 7px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.12);
    margin-bottom: 0.25rem;
  }

  .row {
    display: grid;
    grid-template-columns: 13px minmax(0, 1fr) auto;
    gap: 0.5rem;
    align-items: start;
    font-size: 0.76rem;
    line-height: 1.4;
    color: #6b7280;
  }
  :global(.dark) .row { color: rgba(255,255,255,0.55); }
  .row > svg { width: 13px; height: 13px; margin-top: 0.1rem; color: #9ca3af; }
  .email { overflow-wrap: anywhere; }
  a.row { text-decoration: none; }
  a.row:hover, a.row:hover > svg { color: #4f46e5; }
  :global(.dark) a.row:hover, :global(.dark) a.row:hover > svg { color: #a5b4fc; }

  .copy {
    display: flex;
    padding: 0;
    border: 0;
    background: none;
    color: #9ca3af;
    cursor: pointer;
  }
  .copy:hover { color: #4f46e5; }
  :global(.dark) .copy:hover { color: #a5b4fc; }
  .copy svg { width: 12px; height: 12px; margin-top: 0.1rem; }
  .copied { font-size: 0.7rem; color: #16a34a; white-space: nowrap; }

  .text h1 {
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.2;
    color: #111827;
    margin: 0;
  }
  :global(.dark) .text h1 { color: #f9fafb; }

  .role {
    margin: 0.2rem 0 0.7rem;
    font-size: 0.95rem;
    color: #6b7280;
  }
  :global(.dark) .role { color: rgba(255,255,255,0.55); }

  .text p:not(.role) {
    max-width: 82ch;
    margin: 0 0 0.55rem;
    font-size: 0.97rem;
    line-height: 1.65;
    color: #374151;
  }
  :global(.dark) .text p:not(.role) { color: rgba(255,255,255,0.78); }

  .text a {
    color: #4f46e5;
    text-decoration: none;
    border-bottom: 1px solid #c7d2fe;
  }
  .text a:hover { border-bottom-color: #4f46e5; }
  :global(.dark) .text a { color: #a5b4fc; border-bottom-color: rgba(165,180,252,0.3); }
  :global(.dark) .text a:hover { border-bottom-color: #a5b4fc; }

  /* ── Animations under the bio: three FalCom clips, then UAV and Rendezvous ── */
  .clips {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 0.3rem;
  }
  .clip-row { display: flex; gap: 10px; }

  .clip {
    box-sizing: border-box;
    display: block;
    width: var(--tile);
    min-width: 0;
    aspect-ratio: 1 / 1;
    object-fit: contain;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
  }
  .r2 .clip { width: calc(var(--tile) * 1.15); }
  :global(.dark) .clip { border-color: rgba(255,255,255,0.12); }

  @media (max-width: 640px) {
    .home { padding-top: 1.25rem; }
    .intro { grid-template-columns: minmax(0, 1fr); gap: 1.25rem; }
    .card { max-width: 220px; }
    .clips, .clip-row { gap: 8px; }
    .r1 .clip { width: calc((100% - 16px) / 3); }
    .r2 .clip { width: calc((100% - 8px) / 2); }
  }
</style>
