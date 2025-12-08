<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let title: string;
  export let images: { src: string; alt: string; caption: string }[] = [];
  const dispatch = createEventDispatcher();
</script>

<section class="image-gallery">
  {#if title}
    <h2 class="gallery-title">{title}</h2>
  {/if}
  <div class="gallery-grid">
    {#each images as image, idx (image.src)}
      <figure class="gallery-item">
        <button type="button" class="block p-0 bg-transparent border-none" style="box-shadow:none" aria-label="Open image in carousel"
          on:click={() => dispatch('mediaClick', { type: 'ImageGallery', src: image.src, alt: image.alt, caption: image.caption, index: idx })}
          on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && dispatch('mediaClick', { type: 'ImageGallery', src: image.src, alt: image.alt, caption: image.caption, index: idx })}
        >
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            class="cursor-pointer"
          />
        </button>
        {#if image.caption}
          <figcaption class="text-xs text-muted-foreground mt-2 text-left">{image.caption}</figcaption>
        {/if}
      </figure>
    {/each}
  </div>
</section>

<style>
  .image-gallery {
    margin: 2rem 0;
  }
  .gallery-title {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }
  .gallery-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .gallery-item img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    background: #f8f8f8;
  }
  .gallery-item figcaption {
    /* Style moved to utility classes in markup */
  }
</style>