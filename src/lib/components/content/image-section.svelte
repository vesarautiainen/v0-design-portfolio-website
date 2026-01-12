
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { marked } from 'marked';
  export let title: string = "";
  export let image: string;
  export let alt: string = "";
  export let caption: string = "";
  export let align: 'left' | 'right' | 'below' = 'left';
  export let text: string = "";

  const dispatch = createEventDispatcher();
</script>



<section class="my-12">
  {#if align === 'below'}
    <div class="flex flex-col items-start">
      {#if title}
        <h2 class="text-xl font-semibold mb-2">{title}</h2>
      {/if}
      {#if text}
        <p class="mb-4 text-base leading-relaxed" style="white-space: pre-line;">{@html marked(text)}</p>
      {/if}
      {#if image}
        <div class="w-full mt-4">
          <button type="button" class="block mx-auto p-0 bg-transparent border-none" style="box-shadow:none" aria-label="Open image in carousel"
            on:click={() => dispatch('mediaClick', { type: 'ImageSection', src: image, alt, caption })}
            on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && dispatch('mediaClick', { type: 'ImageSection', src: image, alt, caption })}
          >
            <img
              src={image}
              alt={alt}
              class="rounded shadow w-full h-auto mx-auto cursor-pointer"
            />
          </button>
          {#if caption}
            <div class="text-xs text-muted-foreground mt-2 text-center">{caption}</div>
          {/if}
        </div>
      {/if}
    </div>
  {:else if align === 'right'}
    <div class="flex flex-col md:flex-row-reverse items-start gap-8">
      <div class="md:w-1/2 w-full flex-shrink-0">
        {#if image}
          <button type="button" class="block p-0 bg-transparent border-none" style="box-shadow:none" aria-label="Open image in carousel"
            on:click={() => dispatch('mediaClick', { type: 'ImageSection', src: image, alt, caption })}
          >
            <img
              src={image}
              alt={alt}
              class="rounded shadow max-w-full h-auto cursor-pointer"
            />
          </button>
          {#if caption}
            <div class="text-xs text-muted-foreground mt-2 text-left">{caption}</div>
          {/if}
        {/if}
      </div>
      <div class="w-full md:w-1/2 flex-shrink-0 md:pl-6">
        {#if title}
          <h2 class="text-xl font-semibold mb-2">{title}</h2>
        {/if}
        {#if text}
          <p class="mb-4 text-base leading-relaxed" style="white-space: pre-line;">{@html marked(text)}</p>
        {/if}
      </div>
    </div>
  {:else} <!-- align === 'left' or fallback -->
    <div class="flex flex-col md:flex-row items-start gap-8">
      <div class="md:w-1/2 w-full flex-shrink-0">
        {#if image}
          <button type="button" class="block p-0 bg-transparent border-none" style="box-shadow:none" aria-label="Open image in carousel"
            on:click={() => dispatch('mediaClick', { type: 'ImageSection', src: image, alt, caption })}
          >
            <img
              src={image}
              alt={alt}
              class="rounded shadow max-w-full h-auto cursor-pointer"
            />
          </button>
          {#if caption}
            <div class="text-xs text-muted-foreground mt-2 text-left">{caption}</div>
          {/if}
        {/if}
      </div>
      <div class="w-full md:w-1/2 flex-shrink-0 md:pr-6">
        {#if title}
          <h2 class="text-xl font-semibold mb-2">{title}</h2>
        {/if}
        {#if text}
          <p class="mb-4 text-base leading-relaxed" style="white-space: pre-line;">{@html marked(text)}</p>
        {/if}
      </div>
    </div>
  {/if}
</section>

<style>
  /* Ensure vertical top alignment for image and text sections */
  .flex,
  .flex-col,
  .md\:flex-row,
  .md\:flex-row-reverse {
    align-items: flex-start !important;
  }
</style>
