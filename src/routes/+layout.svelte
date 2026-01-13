<script>
	import '../app.css';
	import Navigation from '$lib/components/navigation.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>

<div class="min-h-screen bg-background text-foreground flex flex-col">
	<Navigation />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
