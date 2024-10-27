<script>
  import { onMount } from 'svelte';
  import '../app.css';
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";
  export let segment;
  let h = 1000;
  let y = 0;

  onMount(() => {
    if (typeof renderMathInElement === 'function') {
      renderMathInElement(document.body);
    }
  });
</script>


<style>

  main {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-left: 2rem;
    padding-right: 2rem;
    min-height: 80vh;
  }
</style>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Mukta&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
  

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css"
    integrity="sha384-R4558gYOUz8mP9YWpZJjofhk+zx0AS11p36HnD2ZKj/6JR5z27gSSULCNHIRReVs" crossorigin="anonymous">
  <link rel="manifest" href="%sveltekit.assets%/manifest.json" crossorigin="use-credentials" />
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.js"
    integrity="sha384-z1fJDqw8ZApjGO3/unPWUPsIymfsJmyrDVWC8Tv/a1HeOtGmkwNd/7xUS0Xcnvsx"
    crossorigin="anonymous"></script>

  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/contrib/auto-render.min.js"
    integrity="sha384-+XBljXPPiv+OzfbB3cVmLHf4hdUFHlWNZN5spNQ7rmHTXpd7WvJum6fIACpNNfIR" crossorigin="anonymous"></script>
</svelte:head>

<svelte:window bind:scrollY={y} />

<Nav {segment} />

<main bind:clientHeight={h}>
  <slot/>
</main>
<Footer {h} {y} />


