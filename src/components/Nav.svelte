<script>
    import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte';
    import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte';
    import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
    import FaNewspaper from 'svelte-icons/fa/FaNewspaper.svelte';
    import FaPencilAlt from 'svelte-icons/fa/FaPencilAlt.svelte';
    import FaUser from 'svelte-icons/fa/FaUser.svelte';
    export let segment;
    let linkedIn = "https://www.linkedin.com/in/alaittin-kirtisoglu";
    let twitter = "https://x.com/kirtisoglu";
    let github = "https://github.com/kirtisoglu";
</script>

<nav>
    <a
      rel="prefetch"
      aria-label="Home"
      aria-current={segment === undefined ? 'page' : undefined}
      href=".">
      Alaittin Kirtisoglu
    </a>
    <div class="links">
      <a
      aria-label="Home"
      href=".">
      Home
    </a>
      <a
        aria-label="Resume"
        target="_blank"
        href="alaittin-kirtisoglu-resume.pdf">
        <span class="hideIcons icon">
          <FaNewspaper />
        </span>
        <span class="hideLinks">Resume</span>
      </a>
      <a
      aria-label="Blog"
      rel="prefetch"
      aria-current={segment === 'blog' ? 'page' : undefined}
      href="blog/">
      <span class="hideIcons icon">
        <FaPencilAlt aria-label="blog" />
      </span>
      <span class="hideLinks">Blog</span>
    </a>
    <a
      aria-label="About"
      rel="prefetch"
      aria-current={segment === 'about' ? 'page' : undefined}
      href="about/">
      <span class="hideIcons icon">
        <FaUser aria-label="about" />
      </span>
      <span class="hideLinks">About</span>
    </a>
    <div class="divider" />
      <a
        aria-label="LinkedIn"
        target="_blank"
        class="icon"
        href={linkedIn}>
        <FaLinkedin aria-label="linked in" />
      </a>
      <a
        aria-label="twitter"
        target="_blank"
        class="icon"
        href={twitter}>
        <FaTwitter aria-label="twitter" />
      </a>
      <a
        aria-label="github"
        target="_blank"
        class="icon"
        href={github}>
        <FaGithub aria-label="GitHub" />
      </a>
    </div>
</nav>


<style>
    nav {
      position: sticky;
      top: 0;
      height: 4rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-left: 2rem;
      padding-right: 2rem;
      font-weight: 300;
      z-index: 3;
      background-color: white;
    }
  
    .links {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 20.5rem;
      
    }

    .icon {
      width: 1.2rem;
      height: 1.2rem;
    }
    a {
      text-decoration: none;
    }
  
    .hideIcons {
      display: none;
    }
  
    @media (max-width: 40rem) {
      .links {
        width: 9.5rem;
      }
      .hideLinks {
        display: none;
      }
      .hideIcons {
        display: block;
      }
    }
  
    [aria-current] {
      color: rgb(255, 62, 0);
      position: relative;
      display: inline-block;
      font-size: 20px;
      
    }
    .divider {
      height: 1.5rem;
      width: 1px;
      background-color: #333;
      opacity: 0.3;
    }

</style>


