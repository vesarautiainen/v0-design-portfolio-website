<script>
	import { onMount } from 'svelte';
	import ProjectCard from '$lib/components/project-card.svelte';
	import { base } from '$app/paths';
	import projects from '$lib/data/projects.json';


	//let projects = [];
	let isLoading = false;
	let filter = 'all';

	// onMount(async () => {
	// 	const response = await fetch(`${base}/api/projects`);
	// 	projects = await response.json();
	// 	isLoading = false;
	// });

	$: filteredProjects = filter === 'all'
		? projects
		: projects.filter(p => Array.isArray(p.categories) 
			? p.categories.includes(filter)
			: p.categories === filter);
</script>

<svelte:head>
	<title>Projects | Design Portfolio</title>
	<meta name="description" content="Browse all my design projects and case studies." />
</svelte:head>

<section class="px-6 md:px-12 py-20 max-w-6xl mx-auto">
	<h1 class="text-4xl md:text-5xl font-bold mb-12">Projects</h1>

	<!-- Filter Buttons -->
	<div class="flex flex-wrap gap-3 mb-12">
		{#each ['all', 'UX Design', 'Prototyping', 'AI', 'Accessibility', 'User Research', 'UI Development'] as cat}
			<button
				on:click={() => (filter = cat)}
				class="px-4 py-2 rounded transition-colors {filter === cat
					? 'bg-foreground text-background'
					: 'bg-muted text-foreground hover:bg-muted-foreground'}"
			>
				{cat === 'all' ? 'All Projects' : cat}
			</button>
		{/each}
	</div>

	<!-- Projects Grid -->
	{#if isLoading}
		<div class="grid md:grid-cols-2 gap-16">
			{#each Array(6) as _}
				<div class="h-96 bg-muted rounded-lg animate-pulse" />
			{/each}
		</div>
	{:else}
		<div class="grid md:grid-cols-2 gap-16">
			{#each filteredProjects as project (project.id)}
				<a href="/projects/{project.slug}" class="group">
					<ProjectCard {project} />
				</a>
			{/each}
		</div>
	{/if}
</section>
