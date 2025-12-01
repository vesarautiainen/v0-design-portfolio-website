<script lang="ts">
  import { onMount } from 'svelte';
  export let items: Array<{ type: string; src?: string; url?: string; alt?: string; caption?: string }>; // images/videos
  export let initialIndex: number = 0;
  export let onClose: () => void;

  let current = initialIndex;
  let overlayEl: HTMLDivElement;

  function next() {
    current = (current + 1) % items.length;
  }
  function prev() {
    current = (current - 1 + items.length) % items.length;
  }
  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  }
  onMount(() => {
    overlayEl.focus();
  });
</script>

<div
  class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
  tabindex="0"
  bind:this={overlayEl}
  on:keydown={handleKey}
  on:click={(e) => e.target === overlayEl && onClose()}
>
  <button class="absolute top-4 right-4 text-white text-3xl" on:click={onClose} aria-label="Close">&times;</button>
  <button class="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl" on:click={prev} aria-label="Previous">&#8592;</button>
  <button class="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl" on:click={next} aria-label="Next">&#8594;</button>

  <div class="max-w-5xl w-full flex flex-col items-center px-8 pb-4">
    {#if items[current].type === 'ImageSection' || items[current].type === 'ImageGallery'}
      <img src={items[current].src} alt={items[current].alt} class="max-h-[80vh] max-w-[85vw] rounded shadow-2xl" style="box-sizing: border-box;" />
    {:else if items[current].type === 'EmbeddedVideo'}
      {#if items[current].url && items[current].url.match(/vimeo\.com\/(\d+)/)}
        <iframe
          src={`https://player.vimeo.com/video/${items[current].url.match(/vimeo\.com\/(\d+)/)[1]}`}
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          class="w-full aspect-video max-h-[80vh] max-w-[85vw] rounded shadow-2xl"
          style="box-sizing: border-box;"
        ></iframe>
      {/if}
    {/if}
    {#if items[current].caption}
      <div class="text-xs text-muted-foreground text-center mt-2">{items[current].caption}</div>
    {/if}
  </div>
</div>

<style>
  .carousel-arrow {
    background: rgba(0,0,0,0.3);
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    cursor: pointer;
  }
</style>
