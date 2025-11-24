<script lang="ts">
export let title: string = "";
export let text: string;
</script>

<section class="my-8">
  {#if title !== ""}
    <h2 class="text-2xl font-bold mb-4">{title}</h2>
  {/if}
  <p class="mb-4 text-base leading-relaxed">{text}</p>
</section>
