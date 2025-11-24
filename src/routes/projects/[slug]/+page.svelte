<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import projects from '$lib/data/projects.json';

	let project = null;
	let isLoading = true;

	// onMount(async () => {
	// 	const response = await fetch(`${base}/api/projects/${$page.params.slug}`);
	// 	project = await response.json();
	// 	isLoading = false;
	// });

	$:
	if ($page) {
		const slug = $page.params.slug;

		// find the project by slug
		project = projects.find(p => p.slug === slug);
		isLoading = false;
	}

</script>

<svelte:head>
	<title>{project?.title || 'Project'} | Design Portfolio</title>
	<meta name="description" content={project?.description} />
</svelte:head>

<article class="px-6 md:px-12 py-20 max-w-4xl mx-auto">
	{#if isLoading}
		<div class="space-y-6">
			<div class="h-10 bg-muted rounded w-1/3 animate-pulse" />
			<div class="h-96 bg-muted rounded-lg animate-pulse" />
			<div class="space-y-3">
				<div class="h-4 bg-muted rounded w-full animate-pulse" />
				<div class="h-4 bg-muted rounded w-5/6 animate-pulse" />
			</div>
		</div>
	{:else if project}
		<div class="space-y-8">
			<!-- Header -->
			<div>
				<a href="/projects" class="text-muted-foreground hover:text-foreground mb-4 inline-block">
					← Back to Projects
				</a>
				<h1 class="text-4xl md:text-5xl font-bold mb-3">{project.title}</h1>
				<p class="text-lg text-muted-foreground">{project.description}</p>
			</div>

			<!-- Meta Info -->
			<div class="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-muted">
				<div>
					<p class="text-sm text-muted-foreground mb-1">Category</p>
					<p class="font-semibold">{project.categories.join(', ')}</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground mb-1">Year</p>
					<p class="font-semibold">{project.year}</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground mb-1">Role</p>
					<p class="font-semibold">{project.role}</p>
				</div>
				<div>
					<p class="text-sm text-muted-foreground mb-1">Client</p>
					<p class="font-semibold">{project.client}</p>
				</div>
			</div>

			<!-- Featured Image -->
			<img
				src={project.featured_image || "/placeholder.svg"}
				alt={project.title}
				class="w-full h-96 object-cover rounded-lg"
			/>

			<!-- Content -->
			<div class="prose prose-invert max-w-none">
				<h2 class="text-2xl font-bold mt-8 mb-4">Project Overview</h2>
				<p class="text-foreground leading-relaxed">{project.content}</p>

				{#if project.images && project.images.length > 0}
					<h2 class="text-2xl font-bold mt-8 mb-4">Gallery</h2>
					<div class="grid md:grid-cols-2 gap-6">
						{#each project.images as image}
							<img
								src={image || "/placeholder.svg"}
								alt="Project screenshot"
								class="w-full rounded-lg object-cover"
							/>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Navigation -->
			<div class="flex justify-between mt-16 pt-8 border-t border-muted">
				{#if project.prev_project}
					<a href="/projects/{project.prev_project.slug}" class="group">
						<p class="text-sm text-muted-foreground mb-1">← Previous</p>
						<p class="font-semibold group-hover:text-muted-foreground transition-colors">
							{project.prev_project.title}
						</p>
					</a>
				{/if}
				{#if project.next_project}
					<a href="/projects/{project.next_project.slug}" class="group text-right">
						<p class="text-sm text-muted-foreground mb-1">Next →</p>
						<p class="font-semibold group-hover:text-muted-foreground transition-colors">
							{project.next_project.title}
						</p>
					</a>
				{/if}
			</div>
		</div>
	{:else}
		<div class="text-center py-20">
			<p class="text-lg text-muted-foreground">Project not found</p>
			<a href="/projects" class="text-foreground hover:text-muted-foreground mt-4 inline-block">
				Back to Projects
			</a>
		</div>
	{/if}
</article>
