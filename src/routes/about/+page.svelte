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
  });
</script>

{#if data.error}
  <p>Error: {data.error}</p>
{:else}
  <div class="container">
    <div class="intro-container">
      <div class="text-content">
        <h1
          in:fly={{ delay: 500, y: 50, duration: 500 }}
          out:fly={{ y: 50, duration: 300 }}>
          {data.intro.title}
          {#if data.intro.emoji}
            <Emoji symbol={data.intro.emoji} />
          {/if}
        </h1>
        <div
          in:fly={{ delay: 800, y: 50, duration: 500 }}
          out:fly={{ y: 50, duration: 300 }}>
          {@html data.intro.html}
        </div>
      </div>
      {#if data.intro.image}
        <img 
          src={data.intro.image} 
          alt="Portrait"
          in:fade={{ duration: 500, delay: 600 }}
          class="portrait-image"
        />
      {/if}
    </div>
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
  .intro-container {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
  }
  .text-content {
    flex: 1;
  }
  .portrait-image {
    max-width: 40%;
    height: auto;
  }
  @media (max-width: 768px) {
    .intro-container {
      flex-direction: column;
    }
    .portrait-image {
      max-width: 100%;
    }
  }
</style>