<script lang="ts">
  export let title: string;
  export let images: { src: string; alt: string; caption: string }[] = [];
</script>

<section class="image-gallery">
  {#if title}
    <h2 class="gallery-title">{title}</h2>
  {/if}
  <div class="gallery-grid">
    {#each images as image (image.src)}
      <figure class="gallery-item">
        <img src={image.src} alt={image.alt} loading="lazy" />
        {#if image.caption}
          <figcaption>{image.caption}</figcaption>
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
    margin-top: 0.5rem;
    font-size: 0.95rem;
    color: #555;
    text-align: center;
  }
</style>