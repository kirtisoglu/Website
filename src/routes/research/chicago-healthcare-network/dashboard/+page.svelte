<script>
  import { onMount, onDestroy } from "svelte";
  import Head from "../../../../components/Head.svelte";

  // ── Layer visibility state ────────────────────────────────────────────────
  let showCityBoundary   = true;
  let showCommunityAreas = true;
  let showHealthCenters  = true;
  let showFacilities     = true;

  // ── Sidebar ───────────────────────────────────────────────────────────────
  let filterOpen = true;

  // ── Deck.gl / MapLibre refs ───────────────────────────────────────────────
  let mapContainer;
  let deckCanvas;
  let map;
  let deck;
  let buildLayers;

  // ── Category counts ───────────────────────────────────────────────────────
  let hcTotal       = 0;
  let facilityTotal = 0;

  // ── Colors ────────────────────────────────────────────────────────────────
  const COMMUNITY_FILL = [74, 144, 217, 50];
  const COMMUNITY_LINE = [255, 255, 255, 200];
  const CITY_LINE      = [31, 53, 87, 220];
  const HC_COLOR       = [230, 57, 70, 220];
  const FAC_COLOR      = [79, 70, 229, 220];

  // Rebuild layers when toggles change
  $: if (buildLayers && deck) {
    showCityBoundary; showCommunityAreas; showHealthCenters; showFacilities;
    deck.setProps({ layers: buildLayers() });
  }

  onMount(async () => {
    const [
      { Map },
      { Deck },
      { GeoJsonLayer, ScatterplotLayer },
    ] = await Promise.all([
      import("maplibre-gl"),
      import("@deck.gl/core"),
      import("@deck.gl/layers"),
    ]);

    map = new Map({
      container: mapContainer,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [-87.6298, 41.8781],
      zoom: 10,
    });

    await new Promise(r => map.on("load", r));

    deck = new Deck({
      canvas: deckCanvas,
      width: "100%",
      height: "100%",
      initialViewState: { longitude: -87.6298, latitude: 41.8781, zoom: 10, pitch: 0, bearing: 0 },
      controller: true,
      onViewStateChange: ({ viewState }) => {
        map.jumpTo({
          center: [viewState.longitude, viewState.latitude],
          zoom: viewState.zoom,
          bearing: viewState.bearing,
          pitch: viewState.pitch,
        });
      },
      getTooltip: ({ object }) => {
        if (!object) return null;
        const p = object.properties || {};
        if (p.community_name) return { html: `<b>${p.community_name}</b>` };
        if (p.name) return { html: `<b>${p.name}</b><br/>${p.category || p.type || ""}` };
        return null;
      },
      layers: [],
    });

    const [cityData, communityData, hcData, facData] = await Promise.all([
      fetch("/data/chicago/city_boundary.geojson").then(r => r.json()),
      fetch("/data/chicago/community_areas.geojson").then(r => r.json()),
      fetch("/data/chicago/health_centers.geojson").then(r => r.json()),
      fetch("/data/chicago/facilities.geojson").then(r => r.json()),
    ]);

    hcTotal       = hcData.features.length;
    facilityTotal = facData.features.length;

    const hcPoints  = hcData.features.map(f  => ({ position: f.geometry.coordinates, properties: f.properties }));
    const facPoints = facData.features.map(f  => ({ position: f.geometry.coordinates, properties: f.properties }));

    buildLayers = () => [
      showCityBoundary && new GeoJsonLayer({
        id: "city",
        data: cityData,
        stroked: true,
        filled: false,
        lineWidthMinPixels: 2,
        getLineColor: CITY_LINE,
      }),
      showCommunityAreas && new GeoJsonLayer({
        id: "communities",
        data: communityData,
        stroked: true,
        filled: true,
        lineWidthMinPixels: 1,
        getFillColor: COMMUNITY_FILL,
        getLineColor: COMMUNITY_LINE,
        pickable: true,
        autoHighlight: true,
        highlightColor: [74, 144, 217, 100],
      }),
      showHealthCenters && new ScatterplotLayer({
        id: "hc",
        data: hcPoints,
        getPosition: d => d.position,
        getRadius: 120,
        radiusMinPixels: 4,
        radiusMaxPixels: 12,
        getFillColor: HC_COLOR,
        getLineColor: [255, 255, 255, 200],
        lineWidthMinPixels: 1,
        stroked: true,
        pickable: true,
      }),
      showFacilities && new ScatterplotLayer({
        id: "fac",
        data: facPoints,
        getPosition: d => d.position,
        getRadius: 100,
        radiusMinPixels: 4,
        radiusMaxPixels: 10,
        getFillColor: FAC_COLOR,
        getLineColor: [255, 255, 255, 200],
        lineWidthMinPixels: 1,
        stroked: true,
        pickable: true,
      }),
    ].filter(Boolean);

    deck.setProps({ layers: buildLayers() });

    onDestroy(() => { deck.finalize(); map.remove(); });
  });
</script>

<svelte:head>
  <title>Chicago Healthcare Dashboard — Alaittin Kirtisoglu</title>
  <link rel="stylesheet" href="https://unpkg.com/maplibre-gl/dist/maplibre-gl.css" />
</svelte:head>

<div class="dashboard">

  <aside class="sidebar">
    <nav class="breadcrumb">
      <a href="/research/">Research</a>
      <span>›</span>
      <a href="/research/chicago-healthcare-network/">Chicago Healthcare</a>
    </nav>

    <h2 class="sidebar-title">Healthcare Dashboard</h2>
    <p class="sidebar-sub">Chicago, IL</p>

    <div class="divider"></div>

    <div class="section">
      <button class="section-header" on:click={() => filterOpen = !filterOpen}>
        {filterOpen ? "▼" : "▶"}&nbsp; Filter
      </button>
      {#if filterOpen}
        <div class="section-body">
          <div class="filter-group">
            <p class="filter-label">Boundary</p>
            <label class="toggle-row">
              <input type="checkbox" bind:checked={showCityBoundary} />
              <span>City outline</span>
            </label>
          </div>
          <div class="filter-group">
            <p class="filter-label">Neighborhoods</p>
            <label class="toggle-row">
              <input type="checkbox" bind:checked={showCommunityAreas} />
              <span>Community areas (77)</span>
            </label>
          </div>
          <div class="filter-group">
            <p class="filter-label">HRSA Health Centers</p>
            <label class="toggle-row">
              <input type="checkbox" bind:checked={showHealthCenters} />
              <span>Show all ({hcTotal || 213})</span>
            </label>
          </div>
          <div class="filter-group">
            <p class="filter-label">OSM Facilities</p>
            <label class="toggle-row">
              <input type="checkbox" bind:checked={showFacilities} />
              <span>Show all ({facilityTotal || 328})</span>
            </label>
          </div>
        </div>
      {/if}
    </div>

    <div class="divider"></div>

    <div class="legend">
      <p class="filter-label">Legend</p>
      <div class="legend-row"><span class="dot" style="background:#e63946"></span><span>HRSA Health Centers</span></div>
      <div class="legend-row"><span class="dot" style="background:#4f46e5"></span><span>OSM Facilities</span></div>
      <div class="legend-row"><span class="swatch"></span><span>Community Areas</span></div>
    </div>

    <div class="divider"></div>
    <p class="testing-note">⚠ Currently in testing. Some features may be incomplete.</p>
  </aside>

  <div class="map-wrap">
    <div bind:this={mapContainer} class="map-base"></div>
    <canvas bind:this={deckCanvas} class="deck-canvas"></canvas>
  </div>

</div>

<Head />

<style>
  :global(body) { margin: 0; overflow: hidden; }

  .dashboard {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  .sidebar {
    width: 260px;
    flex-shrink: 0;
    background: #f9fafb;
    border-right: 1px solid rgba(0,0,0,0.08);
    overflow-y: auto;
    padding: 1.25rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    box-sizing: border-box;
  }

  :global(.dark) .sidebar { background: #111827; border-right-color: rgba(255,255,255,0.07); }

  .breadcrumb {
    font-size: 0.72rem;
    color: #9ca3af;
    display: flex;
    gap: 0.35rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .breadcrumb a { color: #4f46e5; text-decoration: none; }
  .breadcrumb a:hover { text-decoration: underline; }
  :global(.dark) .breadcrumb a { color: #818cf8; }

  .sidebar-title { font-size: 1rem; font-weight: 700; color: #111827; margin: 0; }
  :global(.dark) .sidebar-title { color: #f9fafb; }

  .sidebar-sub { font-size: 0.78rem; color: #9ca3af; margin: 0; }

  .divider { height: 1px; background: rgba(0,0,0,0.07); margin: 0.25rem 0; }
  :global(.dark) .divider { background: rgba(255,255,255,0.07); }

  .section { display: flex; flex-direction: column; }

  .section-header {
    background: #e8ecf0;
    border: none;
    border-radius: 4px;
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: #1D3557;
    text-align: left;
    cursor: pointer;
    width: 100%;
  }

  :global(.dark) .section-header { background: rgba(255,255,255,0.06); color: #e5e7eb; }

  .section-body {
    background: #fff;
    border: 1px solid #d0d7de;
    border-top: none;
    border-radius: 0 0 4px 4px;
    padding: 0.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  :global(.dark) .section-body { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.08); }

  .filter-group { display: flex; flex-direction: column; gap: 0.25rem; }

  .filter-label {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #6b7280;
    margin: 0;
  }

  :global(.dark) .filter-label { color: rgba(255,255,255,0.4); }

  .toggle-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    color: #374151;
    cursor: pointer;
  }

  :global(.dark) .toggle-row { color: rgba(255,255,255,0.7); }

  .toggle-row input[type="checkbox"] { accent-color: #4f46e5; width: 14px; height: 14px; cursor: pointer; }

  .legend { display: flex; flex-direction: column; gap: 0.4rem; }

  .legend-row { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: #374151; }
  :global(.dark) .legend-row { color: rgba(255,255,255,0.65); }

  .dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

  .swatch {
    width: 14px;
    height: 10px;
    border-radius: 2px;
    flex-shrink: 0;
    background: rgba(74,144,217,0.2);
    border: 1px solid rgba(255,255,255,0.8);
    outline: 1px solid rgba(74,144,217,0.4);
  }

  .testing-note {
    font-size: 0.72rem;
    color: #92400e;
    background: #fef3c7;
    border: 1px solid #fde68a;
    border-radius: 5px;
    padding: 0.4rem 0.6rem;
    margin: 0;
    line-height: 1.5;
  }

  :global(.dark) .testing-note {
    color: #fde047;
    background: rgba(161,98,7,0.12);
    border-color: rgba(253,224,71,0.2);
  }

  .map-wrap { flex: 1; position: relative; overflow: hidden; }
  .map-base { position: absolute; inset: 0; }
  .deck-canvas { position: absolute; inset: 0; pointer-events: none; }
</style>
