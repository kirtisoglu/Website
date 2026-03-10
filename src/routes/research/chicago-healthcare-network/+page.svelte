<script>
  import { fly, fade } from "svelte/transition";
  import Head from "../../../components/Head.svelte";
</script>

<svelte:head>
  <title>Chicago Healthcare Network — Alaittin Kirtisoglu</title>
</svelte:head>

<div class="page" in:fade={{ duration: 500, delay: 100 }}>

  <nav class="breadcrumb">
    <a href="/research/">Research</a>
    <span>›</span>
    <span>Chicago Healthcare Network</span>
  </nav>

  <section class="intro" in:fly={{ y: 30, duration: 500, delay: 150 }}>
    <p class="eyebrow">Project</p>
    <h1>Chicago Healthcare Network</h1>
    <p class="subtitle">Optimization-Based Decision Support for Equitable Access</p>
    <div class="meta-row">
      <span class="status-badge preparing">In Preparation</span>
      <span class="coauthors">with Hemanshu Kaul &amp; Kim Erwin</span>
    </div>
  </section>

  <div class="divider"></div>

  <section class="section" in:fly={{ y: 30, duration: 500, delay: 250 }}>
    <h2 class="section-title">About</h2>
    <p class="body-text">
      This project develops an optimization-based framework for analyzing and improving
      equitable access to healthcare facilities across Chicago. Using network models and
      facility location theory, we identify gaps in coverage, model patient travel burdens,
      and recommend facility placements that improve access for underserved communities.
    </p>
  </section>

  <div class="divider"></div>

  <section class="section" in:fly={{ y: 30, duration: 500, delay: 350 }}>
    <h2 class="section-title">Interactive Dashboard</h2>
    <p class="body-text">
      The dashboard is designed as a decision-support tool for health sector investors,
      policymakers, and public officials. It brings together facility coverage, community
      health indicators, and geographic boundaries to help stakeholders:
    </p>
    <ul class="body-list">
      <li>Identify medically underserved areas and coverage gaps</li>
      <li>Evaluate candidate sites for new primary care facilities</li>
      <li>Analyze spatial disparities in health outcomes across neighborhoods</li>
      <li>Support data-driven resource allocation and investment decisions</li>
    </ul>
    <a class="dashboard-btn" href="/research/chicago-healthcare-network/dashboard" target="_blank" rel="noopener">
      Open Dashboard →
    </a>
  </section>

  <div class="divider"></div>

  <section class="section" in:fly={{ y: 30, duration: 500, delay: 400 }}>
    <h2 class="section-title">Data Sources</h2>
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Dataset</th>
            <th>Provider</th>
            <th>Coverage</th>
            <th>Used For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Community Health Indicators</td>
            <td><a href="https://chicagohealthatlas.org" target="_blank" rel="noopener">Chicago Health Atlas</a></td>
            <td>77 community areas</td>
            <td>33 health indicator layers</td>
          </tr>
          <tr>
            <td>HRSA Health Centers</td>
            <td><a href="https://data.hrsa.gov" target="_blank" rel="noopener">HRSA / data.gov</a></td>
            <td>Chicago, IL</td>
            <td>Federally funded clinic locations (213)</td>
          </tr>
          <tr>
            <td>Healthcare Facilities</td>
            <td>Google Places API</td>
            <td>Chicago, IL</td>
            <td>Hospitals, primary care, urgent care (626)</td>
          </tr>
          <tr>
            <td>Geographic Boundaries</td>
            <td><a href="https://data.cityofchicago.org" target="_blank" rel="noopener">City of Chicago / U.S. Census</a></td>
            <td>Chicago, IL</td>
            <td>Community areas, census tracts, health zones</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <div class="divider"></div>

  <section class="section disclosure" in:fly={{ y: 30, duration: 500, delay: 450 }}>
    <h2 class="section-title">AI Usage Disclosure</h2>
    <p class="body-text">
      This dashboard was developed with assistance from <a href="https://claude.ai" target="_blank" rel="noopener">Claude</a> (Anthropic). AI was used for:
    </p>
    <ul class="body-list">
      <li>Deck.gl layer configuration, SvelteKit component structure, and reactive state management to embed the dashboard into this webpage,</li>
      <li>Querying and interpreting the Chicago Health Atlas REST API to call indicator data,</li>
      <li>Writing Python scripts for exporting GeoJSON files.</li>
    </ul>
    <p class="body-text">
      All AI-generated code and content was reviewed and accepted by the author.
      The underlying data sources (Chicago Health Atlas, HRSA, Google Places, U.S. Census Bureau)
      are independent of AI and are cited with full provenance in <a href="https://github.com/kirtisoglu/Chicago-Healthcare-Network/blob/main/DATA_SOURCES.md" target="_blank" rel="noopener">DATA_SOURCES.md</a>.
    </p>
    <p class="body-text">
      AI was <strong>not</strong> used for: research design, selection of health indicators,
      interpretation of health outcomes, or any analytical conclusions drawn from the data.
    </p>
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

  .body-text a { color: #4f46e5; text-decoration: none; border-bottom: 1px solid #c7d2fe; }
  .body-text a:hover { border-color: #4f46e5; }
  :global(.dark) .body-text a { color: #a5b4fc; border-color: rgba(165,180,252,0.3); }

  .body-list {
    margin: 0;
    padding-left: 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .body-list li {
    font-size: 0.95rem;
    line-height: 1.65;
    color: #374151;
  }

  :global(.dark) .body-list li { color: rgba(255,255,255,0.7); }

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

  /* ── Data sources table ── */
  .table-wrap {
    overflow-x: auto;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
  }

  .data-table th {
    text-align: left;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #6b7280;
    padding: 0.5rem 0.75rem;
    border-bottom: 2px solid #e5e7eb;
  }

  .data-table td {
    padding: 0.65rem 0.75rem;
    color: #374151;
    border-bottom: 1px solid #f3f4f6;
    vertical-align: top;
    line-height: 1.5;
  }

  .data-table td a { color: #4f46e5; text-decoration: none; }
  .data-table td a:hover { text-decoration: underline; }

  :global(.dark) .data-table th { color: rgba(255,255,255,0.4); border-color: rgba(255,255,255,0.08); }
  :global(.dark) .data-table td { color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.05); }
  :global(.dark) .data-table td a { color: #a5b4fc; }

  /* ── Disclosure ── */
  .disclosure {
    background: #fafafa;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5rem;
  }

  :global(.dark) .disclosure {
    background: rgba(255,255,255,0.03);
    border-color: rgba(255,255,255,0.07);
  }

  @media (max-width: 640px) {
    .page { padding: 2rem 1.25rem 4rem; }
    .disclosure { padding: 1rem; }
  }
</style>
