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

  const falcom = [
    { name: "falcom_grid",  title: "FalCom: districts on a 400-cell grid" },
    { name: "falcom_graph", title: "FalCom: the same chain on the dual graph" },
    { name: "falcom_tree",  title: "FalCom: cutting a spanning tree" },
  ];
  const routing = [
    { name: "uav",        title: "UAV routing: the route on the map" },
    { name: "rendezvous", title: "Robot rendezvous: the recharging tour" },
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
    --tile: clamp(110px, calc((100vh - 500px) / 2.15), 165px);
    max-width: 920px;
    margin: 0 auto;
    padding: 1.5rem 0 0;
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
    margin: 0.25rem 0 0.85rem;
    font-size: 0.95rem;
    color: #6b7280;
  }
  :global(.dark) .role { color: rgba(255,255,255,0.55); }

  .text p:not(.role) {
    max-width: 66ch;
    margin: 0 0 0.7rem;
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
    margin-top: 1.1rem;
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
