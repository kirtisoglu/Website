<script>
    import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte';
    import FaGithub from 'svelte-icons/fa/FaGithub.svelte';

    export let lastUpdated = null;

    let linkedIn = "https://www.linkedin.com/in/alaittin-kirtisoglu";
    let github = "https://github.com/kirtisoglu";
    let scholar = "https://scholar.google.com/citations?user=PLACEHOLDER";
    let researchgate = "https://www.researchgate.net/profile/Alaittin-Kirtisoglu";
</script>

<style>
    .chat {
      margin-top: 5rem;
      display: flex;
      justify-content: center;
      text-align: center;
    }

    .chat h3 {
      font-size: 1rem;
      font-weight: 400;
      color: #6b7280;
      margin: 0;
      letter-spacing: 0.01em;
    }

    :global(.dark) .chat h3 {
      color: rgba(255,255,255,0.45);
    }

    .chat a {
      color: #4f46e5;
      font-weight: 500;
      text-decoration: underline;
      text-decoration-color: #4f46e5;
      text-underline-offset: 3px;
    }

    :global(.dark) .chat a {
      color: #818cf8;
      text-decoration-color: #818cf8;
    }

    .footer {
      margin-top: 1.5rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 1.25rem 2rem;
      flex-wrap: wrap;
      gap: 1rem;
      border-top: 1px solid rgba(0,0,0,0.07);
    }

    :global(.dark) .footer {
      border-top-color: rgba(255,255,255,0.07);
    }

    .footer-left {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .copyright {
      font-size: 0.8rem;
      color: #6b7280;
      margin: 0;
      font-weight: 400;
    }

    :global(.dark) .copyright {
      color: rgba(255,255,255,0.4);
    }

    .updated {
      font-size: 0.72rem;
      color: #9ca3af;
      margin: 0;
    }

    :global(.dark) .updated {
      color: rgba(255,255,255,0.28);
    }

    .links {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
    }

    .divider {
      height: 1.2rem;
      width: 1px;
      background-color: #d1d5db;
    }

    :global(.dark) .divider {
      background-color: rgba(255,255,255,0.15);
    }

    .icon {
      width: 1.1rem;
      height: 1.1rem;
      display: flex;
      align-items: center;
      color: #9ca3af;
      transition: color 0.2s;
    }

    .svg-icon svg {
      width: 100%;
      height: 100%;
    }

    .icon:hover { color: #111827; }

    .icon.linkedin:hover  { color: #0a66c2; }
    .icon.scholar:hover   { color: #4285f4; }
    .icon.rgate:hover     { color: #00ccbb; }
    .icon.github:hover    { color: #24292e; }

    :global(.dark) .icon {
      color: rgba(255,255,255,0.35);
    }

    :global(.dark) .icon.linkedin:hover  { color: #4f9de8; }
    :global(.dark) .icon.scholar:hover   { color: #7fb3f5; }
    :global(.dark) .icon.rgate:hover     { color: #33ddcc; }
    :global(.dark) .icon.github:hover    { color: rgba(255,255,255,0.9); }

    @media (max-width: 40rem) {
      .footer {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 1.25rem 1rem;
      }
      .chat {
        margin-top: 3rem;
      }
    }
</style>

<div class="chat">
  <h3>
    <em>Let's <a aria-label="Let's Talk Data on LinkedIn" target="_blank" href={linkedIn}>Talk Data</a></em>
  </h3>
</div>

<div class="footer">
  <div class="footer-left">
    <p class="copyright">© {new Date().getFullYear()} Alaittin Kirtisoglu</p>
    {#if lastUpdated}
      <p class="updated">Last updated {lastUpdated}</p>
    {/if}
  </div>

  <div class="links">
    <a aria-label="LinkedIn" target="_blank" href={linkedIn} class="icon linkedin">
      <FaLinkedin />
    </a>
    <div class="divider" />
    <a aria-label="Google Scholar" target="_blank" href={scholar} class="icon svg-icon scholar">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 10a8 8 0 0 1 7.162 3.44L24 9.5z"/></svg>
    </a>
    <div class="divider" />
    <a aria-label="ResearchGate" target="_blank" href={researchgate} class="icon svg-icon rgate">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a12.39 12.39 0 0 0-.35 2.133 20.818 20.818 0 0 0-.059 1.055v.78c-.868-.015-1.71.014-2.527.09V5.55c0-.547-.043-1.244-.13-2.09-.085-.848-.333-1.598-.742-2.25C12.092.562 11.388.187 10.48.03 9.573-.127 8.523.015 7.332.44L0 3.217v17.8l7.332-2.9c1.19-.47 2.24-.612 3.148-.426.907.185 1.61.607 2.11 1.267.5.66.8 1.49.9 2.49H24V0h-4.414z"/></svg>
    </a>
    <div class="divider" />
    <a aria-label="GitHub" target="_blank" href={github} class="icon github">
      <FaGithub />
    </a>
  </div>
</div>
