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
          class:title={true}
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
  .container {
    max-width: 1200px; /* Set a maximum width for the container */
    margin: auto; /* Center the container */
    padding: 0 20px; /* Add some padding on the sides */
    /* Optional for better visual spacing */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem; /* Space between sections */
  }

  .intro-container {
    display: flex;
    align-items: flex-start;
    width: 100%; /* Ensure it takes full width of container */
    max-width: inherit; /* Inherit max-width from container */
    padding-top: 3rem; /* Add some space at the top */
    padding-bottom: 2rem; /* Add some space at the bottom */
    justify-content: center; /* Center content with gaps on sides */
  }

  .text-content {
    flex: 1;
    max-width: 55%; /* Limit text width and leave space for image */
    margin-right: auto; /* Push text to the left side */
  }

  .portrait-image {
    max-width: 50%; /* Set maximum width for the image */
    height: auto; 
    max-height: 600px; /* Limit height to make it shorter */
    object-fit: cover; /* Maintain aspect ratio while cropping if necessary */
    margin-right: auto; /* Center image horizontally if there's space */
    margin-left: -1rem;
  }

  .title {
    font-size: 30px;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    .intro-container {
      flex-direction: column; /* Stack vertically on smaller screens */
      align-items: center; /* Center items in column layout */
      text-align: center; /* Center text alignment */
    }
    
    .portrait-image {
      max-width:100%; /* Make image responsive on smaller screens */
      max-height:none; /* Remove height limit on small screens */
    }
    
    .text-content {
      max-width:none; /* Allow full width for text on small screens */
      margin-right:auto; /* Reset margin to avoid spacing issues */
    }
  }
</style>