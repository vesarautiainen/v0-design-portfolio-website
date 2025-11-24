
<script lang="ts">
  export let title: string = "";
  export let image: string;
  export let alt: string = "";
  export let caption: string = "";
  export let align: 'left' | 'right' | 'center' = 'left';
  export let text: string = "";
</script>


<section class="my-8">
  {#if title}
    <h2 class="text-2xl font-bold mb-4">{title}</h2>
  {/if}
  <div class="flex flex-col md:flex-row {align === 'right' ? 'md:flex-row-reverse' : ''} items-center gap-6">
    <div class="md:w-1/2 w-full flex-shrink-0">
      {#if image}
        <img src={image} alt={alt} class="rounded shadow max-w-full h-auto mx-auto" />
        {#if caption}
          <div class="text-xs text-muted-foreground mt-2 text-center">{caption}</div>
        {/if}
      {/if}
    </div>
    <div class="md:w-1/2 w-full">
      <p class="text-base leading-relaxed">{text}</p>
    </div>
  </div>
</section>

<style>
  @media (max-width: 768px) {
    .flex-row, .flex-row-reverse {
      flex-direction: column !important;
    }
  }
</style>
