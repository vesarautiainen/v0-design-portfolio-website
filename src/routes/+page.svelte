<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import ProjectCard from '$lib/components/project-card.svelte';
	import projects from '$lib/data/projects.json';
	

	//let projects = [];
	let isLoading = false;

	// onMount(async () => {
	// 	const response = await fetch(`${base}/api/projects`);
	// 	console.log('Fetching projects from:', `${base}/api/projects`);
	// 	console.log('Response status:', response.status);
	// 	projects = await response.json();
	// 	isLoading = false;
	// });

	$: featuredProjects = projects.filter(p => p.featured === true);
</script>


<svelte:head>
	<title>Design Portfolio | Showcasing Creative Design Work</title>
	<meta name="description" content="Explore my design projects and creative work." />
</svelte:head>

<!-- Hero Section -->
<section class="px-6 md:px-12 py-20 md:py-32 max-w-6xl mx-auto">
	<div class="space-y-4">
		<h1 class="text-4xl md:text-6xl font-bold text-balance">
			Product Development Creativity Unleashed
		</h1>
		<p class="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty">
			I turn complex problems into intuitive, user-centered solutions. I bring a blend of UX, developer skills, and product thinking to shape ideas into polished digital experiences. I love combining practicality with creativity to push the design forward.
		</p>
	</div>
</section>

<!-- Featured Projects -->
<section class="px-6 md:px-12 py-16 max-w-6xl mx-auto">
	<h2 class="text-2xl md:text-3xl font-bold mb-12">Selected Work</h2>

	{#if isLoading}
		<div class="grid md:grid-cols-2 gap-8">
			{#each Array(4) as _}
				<div class="h-96 bg-muted rounded-lg animate-pulse" />
			{/each}
		</div>
	{:else}
		<div class="grid md:grid-cols-2 gap-8">
			{#each featuredProjects as project (project.id)}
				<a href="/projects/{project.slug}" class="group">
					<ProjectCard {project} />
				</a>
			{/each}
		</div>
	{/if}

	<div class="mt-12 text-center">
		<a href="{base}/projects" class="inline-block px-6 py-2 bg-foreground text-background rounded hover:bg-muted-foreground transition-colors">
			View All Projects
		</a>
	</div>
</section>
