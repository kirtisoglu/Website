<script>
    import { onMount } from 'svelte';
    export let status = 500; // Default to 500 if not provided
    export let error = { message: 'An unknown error occurred' }; // Default error object

    const dev = import.meta.env.DEV; // Use Vite's env variable instead of process.env

    onMount(() => {
        if (!dev && error) {
            // Log error to your error tracking service
            console.error('Error:', status, error.message);
        }
    });
</script>

<style>
    /* Your existing styles */
</style>

<svelte:head>
    <title>{status}</title>
</svelte:head>

<h1>{status}</h1>

{#if status === 404}
    <p>The page you're looking for doesn't exist.</p>
{:else if status === 500}
    <p>An internal server error occurred. Please try again later.</p>
{:else}
    <p>{error?.message || 'An unknown error occurred'}</p>
{/if}

{#if dev && error?.stack}
    <pre>{error.stack}</pre>
{/if}