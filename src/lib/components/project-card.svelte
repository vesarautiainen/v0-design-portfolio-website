<script>
	let { project } = $props();
</script>

<div class="group cursor-pointer overflow-hidden rounded-lg">
	<div class="relative h-72 md:h-96 overflow-hidden bg-muted">
		<img
			src={project.thumbnail || "/placeholder-tba.webp"}
			alt={project.title}
			class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
		/>
	</div>
	<div class="pt-6">
		<h3 class="text-xl font-bold mb-2 group-hover:text-muted-foreground transition-colors">
			{project.title}
		</h3>
		<p class="text-sm text-muted-foreground mb-3">{project.categories.join(', ')}</p>
		<p class="text-foreground text-sm leading-relaxed">{project.description}</p>
	</div>
</div>
