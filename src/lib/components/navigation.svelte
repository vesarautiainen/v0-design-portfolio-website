<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	let mobileMenuOpen = $state(false);

	const navItems = [
		{ label: 'Projects', href: '/projects' },
		{ label: 'Resume', href: '/resume' },
		//{ label: 'About', href: `/about` }
	];

	function isActive(href) {
		return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
	}

	// Theme toggle logic
	let theme = $state('light');
	if (typeof window !== 'undefined') {
		theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		setTheme(theme);
	}

	function setTheme(newTheme) {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.toggle('dark', newTheme === 'dark');
			localStorage.setItem('theme', newTheme);
		}
		theme = newTheme;
	}

	function toggleTheme() {
		setTheme(theme === 'dark' ? 'light' : 'dark');
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
			<!-- Theme toggle button -->
			<button
				class="ml-4 p-2 rounded border border-muted bg-muted text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
				aria-label="Toggle theme"
				title="Switch theme"
				onclick={toggleTheme}
			>
				{#if theme === 'dark'}
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <circle cx="12" cy="12" r="4" stroke-width="2" />
					  <g stroke-width="2">
						<line x1="12" y1="2" x2="12" y2="5"/>
						<line x1="12" y1="19" x2="12" y2="22"/>
						<line x1="2" y1="12" x2="5" y2="12"/>
						<line x1="19" y1="12" x2="22" y2="12"/>
						<line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
						<line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
						<line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
						<line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
					  </g>
					</svg>				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
				{/if}
			</button>
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
