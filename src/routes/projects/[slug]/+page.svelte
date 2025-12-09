<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import projects from '$lib/data/projects.json';

	import { contentComponentMap } from '$lib/components/content/registry';
	import MediaCarouselOverlay from '$lib/components/content/media-carousel-overlay.svelte';



	let project = null;
	let isLoading = true;

	let showCarousel = false;
	let carouselItems = [];
	let carouselInitialIndex = 0;

	// Extract all images and videos from project.content
	function extractMediaItems(content) {
		const items = [];
		if (!content) return items;
		content.forEach((block) => {
			if (block.type === 'ImageSection' && block.image) {
				items.push({
					type: 'ImageSection',
					src: block.image,
					alt: block.alt,
					caption: block.caption || '',
				});
			} else if (block.type === 'ImageGallery' && Array.isArray(block.images)) {
				block.images.forEach(img => {
					items.push({
						type: 'ImageGallery',
						src: img.src,
						alt: img.alt,
						caption: img.caption || '',
					});
				});
			} else if (block.type === 'EmbeddedVideo' && block.url) {
				items.push({
					type: 'EmbeddedVideo',
					url: block.url,
					caption: block.caption || '',
				});
			}
		});
		return items;
	}

	// onMount(async () => {
	// 	const response = await fetch(`${base}/api/projects/${$page.params.slug}`);
	// 	project = await response.json();
	// 	isLoading = false;
	// });


	$:
	if ($page) {
		const slug = $page.params.slug;
		project = projects.find(p => p.slug === slug);
		isLoading = false;
		if (project && project.content) {
			carouselItems = extractMediaItems(project.content);
		} else {
			carouselItems = [];
		}
	}

</script>

<svelte:head>
	<title>{project?.title || 'Project'} | Design Portfolio</title>
	<meta name="description" content={project?.description} />
</svelte:head>

<article class="px-6 md:px-12 py-20 max-w-5xl mx-auto">
	{#if showCarousel && carouselItems.length > 0}
		<MediaCarouselOverlay
			items={carouselItems}
			initialIndex={carouselInitialIndex}
			onClose={() => (showCarousel = false)}
		/>
	{/if}
	{#if isLoading}
		<div class="space-y-6">
			   <div class="h-10 bg-muted rounded w-1/3 animate-pulse"></div>
			   <div class="h-96 bg-muted rounded-lg animate-pulse"></div>
			   <div class="space-y-3">
				   <div class="h-4 bg-muted rounded w-full animate-pulse"></div>
				   <div class="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
			   </div>
		</div>
	{:else if project}
		<div class="space-y-8">
			<!-- Header -->
			<div>
				<a href="/projects" class="text-muted-foreground hover:text-foreground mb-8 inline-block">
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
				class="block mx-auto rounded-lg cursor-pointer"
				style="max-width:100%; max-height:480px; object-fit:contain; display:block;"
				/>

			<!-- Content -->
			<div class="prose prose-invert max-w-none">
				{#each project.content as contentBlock, blockIdx}
					{#if contentBlock.type === 'ImageSection'}
						<svelte:component
							this={contentComponentMap['ImageSection']}
							{...contentBlock}
							on:mediaClick={(e) => {
								showCarousel = true;
								const idx = carouselItems.findIndex(item => item.type === 'ImageSection' && item.src === contentBlock.image);
								carouselInitialIndex = idx;
							}}
						/>
					{:else if contentBlock.type === 'ImageGallery'}
						<svelte:component
							this={contentComponentMap['ImageGallery']}
							{...contentBlock}
							on:mediaClick={(e) => {
								showCarousel = true;
								// Use src and type to find correct index
								const idx = carouselItems.findIndex(item => item.type === 'ImageGallery' && item.src === e.detail.src);
								carouselInitialIndex = idx;
							}}
						/>
					{:else if contentBlock.type === 'EmbeddedVideo'}
						<svelte:component
							this={contentComponentMap['EmbeddedVideo']}
							{...contentBlock}
							on:mediaClick={(e) => {
								showCarousel = true;
								const idx = carouselItems.findIndex(item => item.type === 'EmbeddedVideo' && item.url === contentBlock.url);
								carouselInitialIndex = idx;
							}}
						/>
					{:else}
						{#if contentComponentMap[contentBlock.type]}
							<svelte:component this={contentComponentMap[contentBlock.type]} {...contentBlock} />
						{/if}
					{/if}
				{/each}

				{#if project.images && project.images.length > 0}
					<h2 class="text-2xl font-bold mt-8 mb-4">Gallery</h2>
					<div class="grid md:grid-cols-2 gap-6">
						{#each project.images as image}
							<button type="button" class="block w-full p-0 bg-transparent border-none" aria-label="Open image in carousel"
								on:click={() => {
									showCarousel = true;
									carouselInitialIndex = carouselItems.findIndex(item => item.src === image);
								}}
							>
								<img
									src={image || "/placeholder.svg"}
									alt="Project screenshot"
									class="w-full rounded-lg object-cover cursor-pointer"
								/>
							</button>
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
