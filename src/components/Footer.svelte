<script>
  export let lastUpdated = null;
</script>

<footer>
  <div class="inner">
    <span>© {new Date().getFullYear()} Alaittin Kirtisoglu</span>
    {#if lastUpdated}<span>Updated {lastUpdated}</span>{/if}
  </div>
</footer>

<style>
  footer {
    margin-top: 2rem;
    border-top: 1px solid rgba(0,0,0,0.07);
  }
  :global(.dark) footer { border-top-color: rgba(255,255,255,0.07); }

  .inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.25rem 1rem;
    max-width: 1100px;
    margin: 0 auto;
    padding: 1.25rem 1.5rem;
    box-sizing: border-box;
    font-size: 0.8rem;
    color: #6b7280;
  }
  :global(.dark) .inner { color: rgba(255,255,255,0.4); }

  @media (max-width: 40rem) {
    .inner { padding: 1.25rem 1rem; }
  }
</style>
