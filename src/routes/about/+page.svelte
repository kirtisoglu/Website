<script>
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import Head from "../../components/Head.svelte";
  import Emoji from "../../components/Emoji.svelte";
  import HiddenLinks from "../../components/HiddenLinks.svelte";

  export let data;
  let visible = true;

  onMount(() => {
    console.log('Component mounted');
    console.log('Intro data:', data.intro); // For debugging
  });
</script>

{#if data.error}
  <p>Error: {data.error}</p>
{:else}
  <div class="container">
    <span>
      <div class="intro">
        <h1
          in:fly={{ delay: 500, y: 50, duration: 500 }}
          out:fly={{ y: 50, duration: 300 }}>
          {data.intro.title}
          {#if data.intro.emoji}
            <Emoji symbol={data.intro.emoji} />
          {/if}
        </h1>
        {#if data.intro.image}
          <img 
            src={data.intro.image} 
            alt="Portrait"
            in:fade={{ duration: 500, delay: 600 }}
          />
        {/if}
        <div
          in:fly={{ delay: 800, y: 50, duration: 500 }}
          out:fly={{ y: 50, duration: 300 }}>
          {@html data.intro.html}
        </div>
      </div>
    </span>
    <div
      in:fade={{ delay: 1100, duration: 500 }}
      out:fly={{ y: 50, duration: 300 }}>
      {@html data.content.html}
    </div>
  </div>

  <div class="container">
    <span>
      {@html data.booklist.html}
    </span>
  </div>
{/if}

<Head/>
<HiddenLinks/>

<style>
  img {
    max-width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }
  .intro {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
</style>