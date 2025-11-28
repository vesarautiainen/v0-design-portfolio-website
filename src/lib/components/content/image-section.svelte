
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TextSection from './text-section.svelte';
  export let title: string = "";
  export let image: string;
  export let alt: string = "";
  export let caption: string = "";
  export let align: 'left' | 'right' | 'center' = 'left';
  export let text: string = "";

  const dispatch = createEventDispatcher();
</script>


<section class="my-8">
  <div class="flex flex-col md:flex-row {align === 'right' ? 'md:flex-row-reverse' : ''} items-center gap-6">
    <div class="md:w-1/2 w-full flex-shrink-0">
      {#if image}
        <button type="button" class="block mx-auto p-0 bg-transparent border-none" style="box-shadow:none" aria-label="Open image in carousel"
          on:click={() => dispatch('mediaClick', { type: 'ImageSection', src: image, alt, caption })}
          on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && dispatch('mediaClick', { type: 'ImageSection', src: image, alt, caption })}
        >
          <img
            src={image}
            alt={alt}
            class="rounded shadow max-w-full h-auto mx-auto cursor-pointer"
          />
        </button>
        {#if caption}
          <div class="text-xs text-muted-foreground mt-2 text-center">{caption}</div>
        {/if}
      {/if}
    </div>
    <TextSection {title} {text} />
  </div>
</section>

<style>
  @media (max-width: 768px) {
    .flex-row, .flex-row-reverse {
      flex-direction: column !important;
    }
  }
</style>
