<script>
</script>

<svelte:head>
	<title>About | Design Portfolio</title>
	<meta name="description" content="Learn more about my design background and experience." />
</svelte:head>

<section class="px-6 md:px-12 py-20 max-w-4xl mx-auto">
	<div class="space-y-8">
		<div>
			<h1 class="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
			<p class="text-lg text-muted-foreground leading-relaxed">
				I'm a passionate designer dedicated to creating beautiful, functional digital experiences. With a background in both design and development, I bring a unique perspective to every project.
			</p>
		</div>

		<div class="space-y-6 border-t border-muted pt-8">
			<div>
				<h2 class="text-2xl font-bold mb-3">Experience</h2>
				<div class="space-y-4">
					<div>
						<h3 class="text-lg font-semibold">Senior Designer</h3>
						<p class="text-muted-foreground">Creative Studio Co. • 2021 - Present</p>
						<p class="mt-2 text-foreground">Leading design initiatives and mentoring junior designers.</p>
					</div>
					<div>
						<h3 class="text-lg font-semibold">Product Designer</h3>
						<p class="text-muted-foreground">Digital Agency Inc. • 2019 - 2021</p>
						<p class="mt-2 text-foreground">Designed user experiences for web and mobile applications.</p>
					</div>
				</div>
			</div>

			<div>
				<h2 class="text-2xl font-bold mb-3">Skills</h2>
				<div class="flex flex-wrap gap-2">
					{#each ['UI Design', 'UX Research', 'Prototyping', 'Figma', 'Web Design', 'Design Systems', 'Accessibility', 'Branding'] as skill}
						<span class="px-3 py-1 bg-muted text-foreground rounded-full text-sm">
							{skill}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
