<script>
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import Head from "../../components/Head.svelte";
  import Emoji from "../../components/Emoji.svelte";
  import HiddenLinks from "../../components/HiddenLinks.svelte";

  export let data;
  let visible = false;

  console.log('Initial data:', data);  // Add this line

  onMount(() => {
    console.log('Component mounted');  // Add this line
    visible = true;
    console.log('Visible set to true');  // Add this line
  });

  $: console.log('Data changed:', data);  // Add this reactive statement
</script>

<style>
  /* Your existing styles here */
</style>


{#if data.error}
  <p>Error: {data.error}</p>
{:else if !data}
  <p>Loading...</p>
{:else if visible}
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