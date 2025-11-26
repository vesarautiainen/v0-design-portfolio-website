<script lang="ts">
  export let url: string;
  export let caption: string = '';

  // Extract Vimeo video ID from URL (supports query params and various formats)
  let videoId = '';
  $: {
    // Handles URLs like https://vimeo.com/123456789, https://vimeo.com/123456789?param=value, etc.
    const match = url.match(/vimeo\.com\/(\d+)/) || url.match(/player\.vimeo\.com\/video\/(\d+)/);
    videoId = match ? match[1] : '';
  }
</script>

{#if videoId}
  <div class="w-full aspect-video rounded-lg overflow-hidden mb-2">
    <iframe
      src={`https://player.vimeo.com/video/${videoId}`}
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen
      class="w-full h-full"
      title="Vimeo video"
    ></iframe>
  </div>
  {#if caption}
    <div class="text-xs text-muted-foreground text-center mt-2">{caption}</div>
  {/if}
{:else}
  <div class="text-red-500">Invalid Vimeo URL</div>
{/if}
