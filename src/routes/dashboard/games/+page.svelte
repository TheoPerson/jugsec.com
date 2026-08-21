<script lang="ts">
	import { Gamepad2, Settings2, ArrowRight } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedCategory = $state('All');

	let filteredGames = $derived(
		selectedCategory === 'All'
			? data.games
			: data.games.filter((g) => g.category.toLowerCase() === selectedCategory.toLowerCase())
	);

	const categories = ['All', 'FPS', 'Battle Royale', 'MOBA'];

	// Helper pour la couleur des badges/bordures
	function getCategoryColorClass(category: string) {
		const cat = category.toLowerCase();
		if (cat === 'fps') return 'text-danger border-danger';
		if (cat === 'battle royale' || cat === 'battle-royale') return 'text-warning border-warning';
		if (cat === 'moba') return 'text-accent border-accent';
		return 'text-neon border-neon';
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<header class="flex flex-col gap-2">
		<h1 class="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-3">
			<Gamepad2 class="w-8 h-8 text-accent" />
			Game Profiles
		</h1>
		<p class="text-text-secondary text-lg max-w-2xl">
			Discover optimized presets for your favorite titles. These profiles tune your system dynamically for maximum performance.
		</p>
	</header>

	<!-- Filter Tabs -->
	<div class="flex flex-wrap gap-2">
		{#each categories as category}
			<button
				type="button"
				onclick={() => (selectedCategory = category)}
				class={cn(
					'px-4 py-2 rounded-full font-medium text-sm transition-colors duration-200 border',
					selectedCategory === category
						? 'bg-surface-3 text-text-primary border-border-strong'
						: 'bg-transparent text-text-secondary border-border-subtle hover:bg-surface-2 hover:text-text-primary'
				)}
			>
				{category}
			</button>
		{/each}
	</div>

	<!-- Games Grid -->
	{#if filteredGames.length === 0}
		<div class="p-12 text-center bg-surface-1 border border-border-subtle rounded-xl flex flex-col items-center gap-4">
			<Gamepad2 class="w-12 h-12 text-text-tertiary" />
			<div class="space-y-1">
				<h3 class="text-xl font-semibold text-text-primary">No games found</h3>
				<p class="text-text-secondary">Try selecting a different category.</p>
			</div>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredGames as game (game.slug)}
				<div
					class="flex flex-col bg-surface-1 border border-border-subtle rounded-xl overflow-hidden hover:border-border-strong transition-colors relative"
				>
					<!-- Colored top bar -->
					<div
						class={cn(
							'h-1 w-full',
							getCategoryColorClass(game.category).split(' ')[0].replace('text-', 'bg-')
						)}
					></div>

					<div class="p-6 flex flex-col flex-1 gap-4">
						<div class="flex justify-between items-start gap-4">
							<div class="space-y-1">
								<h2 class="text-xl font-bold text-text-primary leading-tight line-clamp-1">
									{game.name}
								</h2>
								<p class="text-sm text-text-tertiary">
									{game.publisher}
								</p>
							</div>
							<span
								class={cn(
									'px-2.5 py-1 text-xs font-semibold rounded-md bg-surface-2 border border-border-subtle whitespace-nowrap',
									getCategoryColorClass(game.category).split(' ')[0]
								)}
							>
								{game.category.toUpperCase()}
							</span>
						</div>

						<p class="text-text-secondary text-sm line-clamp-2 flex-1">
							{game.description}
						</p>

						<div class="flex items-center gap-2 text-sm text-text-secondary mt-2">
							<Settings2 class="w-4 h-4" />
							<span>{game.optimizationCount} optimizations available</span>
						</div>

						<a
							href="/dashboard/games/{game.slug}"
							class="mt-4 w-full inline-flex justify-center items-center gap-2 bg-surface-2 hover:bg-surface-3 text-text-primary py-2.5 px-4 rounded-lg font-medium transition-colors border border-border-subtle"
						>
							View Profile
							<ArrowRight class="w-4 h-4" />
						</a>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

