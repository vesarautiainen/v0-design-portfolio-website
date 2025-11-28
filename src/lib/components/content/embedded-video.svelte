<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let url: string;
  export let caption: string = '';

  // Extract Vimeo video ID from URL (supports query params and various formats)
  let videoId = '';
  $: {
    // Handles URLs like https://vimeo.com/123456789, https://vimeo.com/123456789?param=value, etc.
    const match = url.match(/vimeo\.com\/(\d+)/) || url.match(/player\.vimeo\.com\/video\/(\d+)/);
    videoId = match ? match[1] : '';
  }
  const dispatch = createEventDispatcher();
</script>

{#if videoId}
  <button type="button" class="block w-full aspect-video rounded-lg overflow-hidden mb-2 p-0 bg-transparent border-none cursor-pointer" aria-label="Open video in carousel"
    on:click={() => dispatch('mediaClick', { type: 'EmbeddedVideo', url, caption })}
    on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && dispatch('mediaClick', { type: 'EmbeddedVideo', url, caption })}
  >
    <iframe
      src={`https://player.vimeo.com/video/${videoId}`}
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen
      class="w-full h-full"
      title="Vimeo video"
      tabindex="-1"
    ></iframe>
  </button>
  {#if caption}
    <div class="text-xs text-muted-foreground text-center mt-2">{caption}</div>
  {/if}
{:else}
  <div class="text-red-500">Invalid Vimeo URL</div>
{/if}
