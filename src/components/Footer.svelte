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
      const annotation = annotate(element, { type: 'underline', color: 'red' });
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
    .chat a {
      text-decoration: none;
    }

    .footer {
      margin-top: 1rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      flex-wrap: wrap;
      gap: 1rem;
      border-top: 1px solid rgba(0,0,0,0.07);
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

    .updated {
      font-size: 0.75rem;
      color: #9ca3af;
      margin: 0;
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

    .icon {
      width: 1.1rem;
      height: 1.1rem;
      display: flex;
      align-items: center;
      color: #6b7280;
    }

    .icon:hover {
      color: #111827;
    }

    @media (max-width: 40rem) {
      .footer {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 1.5rem 1rem;
      }
      .chat {
        margin-top: 3rem;
      }
    }
</style>

<div class="chat">
  <h3>
    <em>Let's
      <a bind:this={element}
         aria-label="Let's Talk Data on LinkedIn"
         target="_blank"
         href={linkedIn}>
        Talk Data
      </a>
    </em>
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
