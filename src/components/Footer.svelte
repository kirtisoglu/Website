<script>
    import { onMount } from 'svelte';
    import { annotate } from 'rough-notation';
    import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte';
    import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte';
    import FaGithub from 'svelte-icons/fa/FaGithub.svelte';

    export let lastUpdated = null;

    let element;
    let linkedIn = "https://www.linkedin.com/in/alaittin-kirtisoglu";
    let twitter = "https://x.com/kirtisoglu";
    let github = "https://github.com/kirtisoglu";

    onMount(() => {
      const annotation = annotate(element, { type: 'underline', color: '#4f46e5' });
      annotation.show();
    });
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
      text-decoration: none;
      color: #4f46e5;
      font-weight: 500;
    }

    :global(.dark) .chat a {
      color: #818cf8;
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
      transition: color 0.15s;
    }

    .icon:hover {
      color: #111827;
    }

    :global(.dark) .icon {
      color: rgba(255,255,255,0.35);
    }

    :global(.dark) .icon:hover {
      color: rgba(255,255,255,0.85);
    }

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
    <em>Let's <a bind:this={element}
       aria-label="Let's Talk Data on LinkedIn"
       target="_blank"
       href={linkedIn}>Talk Data</a></em>
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
    <a aria-label="LinkedIn" target="_blank" href={linkedIn} class="icon">
      <FaLinkedin />
    </a>
    <div class="divider" />
    <a aria-label="Twitter" target="_blank" class="icon" href={twitter}>
      <FaTwitter />
    </a>
    <div class="divider" />
    <a aria-label="GitHub" target="_blank" href={github} class="icon">
      <FaGithub />
    </a>
  </div>
</div>
