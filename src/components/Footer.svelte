<script>
    import { onMount } from 'svelte';
    import Emoji from "./Emoji.svelte";
    import { annotate } from 'rough-notation';
    import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte';
    import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte';
    import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
    import LazyLoad from "./LazyLoad.svelte";
  
    let element;
    let date = new Date();
    let year = date.getFullYear().toString().slice(-2);
    let month = date.toLocaleString('default', { month: 'long' });
    let day = date.getDate().toString().padStart(2, '0');
    let linkedIn = "https://www.linkedin.com/in/alaittin-kirtisoglu";
    let twitter = "https://x.com/kirtisoglu";
    let github = "https://github.com/alaittinkirtisoglu";
  
    onMount(() => {
      const annotation = annotate(element, { type: 'underline', color: 'red' });
      annotation.show();
    });
  </script>
  
  <style>
      .footer {
        position: relative;
        margin-top: 1rem;
        height: 8rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 2rem;
        padding-right: 2rem;
        font-weight: 300;
      }
      .footer p {
        margin-right: 1.5rem;
      }
      .links {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 10rem;
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
      }
      .chat {
        margin-top: 6rem;
        display: flex;
        justify-content: center;
      }
      .chat a {
        /* text-decoration: underline;
        text-decoration-color: rgb(255, 62, 0);
        text-decoration-thickness: 0.11em; */
        text-decoration: none;
      }
      @media (max-width: 40rem) {
        .links {
          width: 8rem;
        }
        .chat {
          margin-top: 4rem;
        }
      }
    </style>
  
  <div class="chat">
        <h3>
          <em>Let's
            <a bind:this={element}
               aria-label="Let's Talk Data on LinkedIn"
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
        Last updated
        <a
          aria-label="{month}
          {day}, {year}"
          href="https://www.onthisday.com/events/{month}/{day}">
          {month} {day}, '{year}
        </a>
      </p>
      
      <div class="links">
        <a
          aria-label="LinkedIn"
          href={linkedIn}
          class="icon">
          <FaLinkedin />
        </a>
        <div class="divider" />
        <a
          aria-label="twitter"
          class="icon"
          href={twitter}>
          <FaTwitter />
        </a>
        <div class="divider" />
        <a
          aria-label="Github"
          href={github}
          class="icon">
          <FaGithub />
        </a>
      </div>
    </div>