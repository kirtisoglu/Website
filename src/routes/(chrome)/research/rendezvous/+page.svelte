<script>
  import { fly, fade } from "svelte/transition";
  import Head from "../../../../components/Head.svelte";
</script>

<svelte:head>
  <title>Robot Rendezvous — Alaittin Kirtisoglu</title>
  <meta name="description" content="Energy efficient multi-place robot rendezvous: a tanker robot recharges mobile worker robots at rendezvous places it chooses, under campaign time and energy restrictions, with an interactive replay of the search." />
</svelte:head>

<div class="page" in:fade={{ duration: 500, delay: 100 }}>

  <nav class="breadcrumb">
    <a href="/research/">Research</a>
    <span>›</span>
    <span>Robot Rendezvous</span>
  </nav>

  <section class="intro" in:fly={{ y: 30, duration: 500, delay: 150 }}>
    <p class="eyebrow">Project</p>
    <h1>Robot Rendezvous</h1>
    <p class="subtitle">Multi-Place Robot Rendezvous Problem with Campaign Time and Energy Consumption Restrictions</p>
    <div class="meta-row">
      <span class="status-badge preparing">In Preparation</span>
      <span class="coauthors">with Nazlı Dolu Hastürk &amp; Mustafa Tural</span>
    </div>
  </section>

  <div class="divider"></div>

  <section class="section" in:fly={{ y: 30, duration: 500, delay: 250 }}>
    <h2 class="section-title">Overview</h2>
    <p class="body-text">
      A tanker robot keeps a team of mobile worker robots running by meeting each of them
      in turn and recharging its battery. Every meeting can happen at a different place, and
      both the place and the speed of every robot on every leg are decisions: a robot that
      moves faster or slower than its energy-optimal speed pays for it in energy. We study
      two versions of the problem over one set of constraints, minimising the total energy
      consumed under a limit on the campaign time, and minimising the campaign time itself.
    </p>
    <p class="body-text">
      For a fixed meeting order the problem is a second-order cone program: the Euclidean
      distances are cones as they stand, and each energy constraint becomes a rotated cone
      once the quadratic-over-linear term is given its own variable. The meeting order is
      searched with 2-opt and 3-opt edge exchange heuristics adapted from the travelling
      salesman problem, each candidate order costing one cone program, and with speed-up
      techniques — fixed-radius search, candidate lists and don't-look bits — that decide
      which candidates are worth solving at all. The work builds on Nazlı Dolu Hastürk's
      MSc thesis at Middle East Technical University.
    </p>
  </section>

  <div class="divider"></div>

  <section class="section" in:fly={{ y: 30, duration: 500, delay: 350 }}>
    <h2 class="section-title">Search Replay</h2>
    <p class="body-text">
      An interactive replay of the meeting-order search. The search view steps through every
      move the heuristic accepts: the tanker's tour through the rendezvous places the cone
      program chose, the best candidates it rejected, the objective of every candidate it
      solved, and, for the speed-up algorithm, the fixed-radius balls and the robots whose
      don't-look bits are on. The schedule view plays the solution of any step in time, with
      robots driving to their rendezvous places, the tanker recharging them one by one, and
      every battery draining and filling.
    </p>
    <p class="body-text">
      The runs are on instances generated as in the thesis, with the thesis's energy
      parameters; they illustrate the method, and the numbers are not the paper's results.
    </p>
    <a class="dashboard-btn" href="/research/rendezvous/animation/">Open Search Replay</a>
  </section>

</div>

<Head/>

<style>
  .page {
    max-width: 780px;
    margin: 0 auto;
    padding: 2.5rem 2rem 5rem;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .breadcrumb {
    font-size: 0.8rem;
    color: #9ca3af;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 2rem;
  }

  .breadcrumb a {
    color: #4f46e5;
    text-decoration: none;
  }

  .breadcrumb a:hover { text-decoration: underline; }
  :global(.dark) .breadcrumb a { color: #818cf8; }
  :global(.dark) .breadcrumb { color: rgba(255,255,255,0.3); }

  .eyebrow {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #4f46e5;
    margin: 0 0 0.75rem;
  }

  :global(.dark) .eyebrow { color: #818cf8; }

  .intro h1 {
    font-size: clamp(1.8rem, 5vw, 2.6rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #111827;
    margin: 0 0 0.4rem;
    line-height: 1.15;
  }

  :global(.dark) .intro h1 { color: #f9fafb; }

  .subtitle {
    font-size: 1rem;
    color: #6b7280;
    margin: 0 0 1.25rem;
  }

  :global(.dark) .subtitle { color: rgba(255,255,255,0.45); }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .status-badge {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 0.18rem 0.55rem;
    border-radius: 99px;
  }

  .status-badge.preparing { background: #e0e7ff; color: #4338ca; }
  :global(.dark) .status-badge.preparing { background: rgba(67,56,202,0.15); color: #a5b4fc; }

  .coauthors {
    font-size: 0.85rem;
    color: #9ca3af;
  }

  :global(.dark) .coauthors { color: rgba(255,255,255,0.38); }

  .divider {
    height: 1px;
    background: rgba(0,0,0,0.07);
    margin: 2.5rem 0;
  }

  :global(.dark) .divider { background: rgba(255,255,255,0.07); }

  .section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .section-title {
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #4f46e5;
    margin: 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e0e7ff;
  }

  :global(.dark) .section-title {
    color: #818cf8;
    border-bottom-color: rgba(129,140,248,0.2);
  }

  .body-text {
    font-size: 0.95rem;
    line-height: 1.75;
    color: #374151;
    margin: 0;
  }

  :global(.dark) .body-text { color: rgba(255,255,255,0.7); }

  .dashboard-btn {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.6rem 1.25rem;
    background: #4f46e5;
    color: #fff;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.15s;
    align-self: flex-start;
  }

  .dashboard-btn:hover { background: #4338ca; }
  :global(.dark) .dashboard-btn { background: #6366f1; }
  :global(.dark) .dashboard-btn:hover { background: #818cf8; }

  @media (max-width: 640px) {
    .page { padding: 2rem 1.25rem 4rem; }
  }
</style>
