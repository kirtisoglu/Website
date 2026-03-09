<script>
    import { onMount } from 'svelte';
    import Emoji from "./Emoji.svelte";
    import { annotate } from 'rough-notation';
    import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte';
    import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte';
    import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
    import LazyLoad from "./LazyLoad.svelte";

    export let lastUpdated = null; // e.g. "March 08, '26" from git, or null

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
        position: relative;
        margin-top: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem;
        font-weight: 300;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .footer p {
        margin: 0;
      }

      .links {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
      }

      .divider {
        height: 1.5rem;
        width: 1px;
        background-color: #333;
        opacity: 0.3;
      }

      .icon {
        width: 1.2rem;
        height: 1.2rem;
        display: flex;
        align-items: center;
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
    <p>
      <Emoji symbol="👨‍🎨" />
      +
      <Emoji symbol="👷‍♂️" />
      by me
      <br />
      {#if lastUpdated}
        Last updated {lastUpdated}
      {/if}
    </p>

    <div class="links">
      <a aria-label="LinkedIn" target="_blank" href={linkedIn} class="icon">
        <FaLinkedin />
      </a>
      <div class="divider" />
      <a aria-label="twitter" target="_blank" class="icon" href={twitter}>
        <FaTwitter />
      </a>
      <div class="divider" />
      <a aria-label="Github" target="_blank" href={github} class="icon">
        <FaGithub />
      </a>
    </div>
  </div>
