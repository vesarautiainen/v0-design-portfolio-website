<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	let mobileMenuOpen = $state(false);

	const navItems = [
		{ label: 'Projects', href: '/projects' },
		{ label: 'CV', href: '/cv' },
		//{ label: 'About', href: `/about` }
	];

	function isActive(href) {
		return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
	}
</script>

<nav class="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-muted">
	<div class="px-6 md:px-12 py-6 max-w-6xl mx-auto flex items-center justify-between">
		<a href="{base}/" class="flex items-center text-xl font-bold hover:text-muted-foreground transition-colors">
			<img src="/favicon.svg" alt="Logo" class="w-8 h-8 mr-2" />
			<span style="font-family: 'Fira Sans', sans-serif; font-weight: 100;">vesa</span>
			<span style="font-family: 'Fira Sans', sans-serif; font-weight: 1000;">rautiainen</span>
		</a>

		<!-- Desktop menu - hidden on mobile -->
		<div class="hidden md:flex items-center gap-8">
			{#each navItems as item}
				<a
					href={item.href}
					class="text-sm transition-colors {isActive(item.href)
						? 'text-foreground font-semibold'
						: 'text-muted-foreground hover:text-foreground'}"
				>
					{item.label}
				</a>
			{/each}
		</div>

		<!-- Mobile Menu Button - only visible on narrow screens -->
		<button
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			class="md:hidden text-foreground hover:text-muted-foreground"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>
	</div>

	<!-- Mobile menu dropdown -->
	{#if mobileMenuOpen}
		<div class="md:hidden px-6 py-4 border-t border-muted bg-background">
			<div class="flex flex-col gap-4">
				{#each navItems as item}
					<a
						href={item.href}
						onclick={() => (mobileMenuOpen = false)}
						class="text-sm transition-colors {isActive(item.href)
							? 'text-foreground font-semibold'
							: 'text-muted-foreground hover:text-foreground'}"
					>
						{item.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>
