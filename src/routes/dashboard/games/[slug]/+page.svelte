<script lang="ts">
	import { ArrowLeft, Cpu, Gpu, LayoutList, CheckCircle2, ChevronDown, Activity } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import type { PageData } from './$types';
	import { slide } from 'svelte/transition';

	let { data }: { data: PageData } = $props();
	const game = data.game;

	// Gestion des optimisations appliquées et des cards étendues
	let appliedOptimizations = $state<Set<string>>(new Set());
	let expandedOptimizations = $state<Set<string>>(new Set());

	function toggleExpanded(id: string) {
		const newSet = new Set(expandedOptimizations);
		if (newSet.has(id)) {
			newSet.delete(id);
		} else {
			newSet.add(id);
		}
		expandedOptimizations = newSet;
	}

	function toggleApplied(id: string, event: Event) {
		event.stopPropagation();
		const newSet = new Set(appliedOptimizations);
		if (newSet.has(id)) {
			newSet.delete(id);
		} else {
			newSet.add(id);
		}
		appliedOptimizations = newSet;
	}

	let totalOptimizations = $derived(game.optimizations.length);
	let highImpactCount = $derived(game.optimizations.filter((o) => o.impact === 'high').length);

	function getImpactBadgeClass(impact: string) {
		switch (impact) {
			case 'high':
				return 'bg-danger/10 text-danger border-danger/20';
			case 'medium':
				return 'bg-warning/10 text-warning border-warning/20';
			case 'low':
				return 'bg-neon/10 text-neon border-neon/20';
			default:
				return 'bg-surface-3 text-text-secondary border-border-subtle';
		}
	}
</script>

<div class="space-y-8 pb-12">
	<!-- Navigation -->
	<div>
		<a
			href="/dashboard/games"
			class="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
		>
			<ArrowLeft class="w-4 h-4" />
			Back to Game Profiles
		</a>
	</div>

	<!-- Header -->
	<header class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
		<div class="space-y-2">
			<div class="flex items-center gap-3">
				<h1 class="text-4xl font-bold text-text-primary tracking-tight">{game.name}</h1>
				<span class="px-3 py-1 rounded-full text-xs font-semibold bg-surface-2 border border-border-strong text-text-primary uppercase tracking-wider">
					{game.category}
				</span>
			</div>
			<p class="text-lg text-text-secondary">{game.publisher}</p>
			{#if game.description}
				<p class="text-text-tertiary max-w-3xl mt-4">{game.description}</p>
			{/if}
		</div>

		<!-- Summary Stats -->
		<div class="flex gap-4 md:flex-col md:gap-3 bg-surface-1 p-4 rounded-xl border border-border-subtle shrink-0">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-surface-2 rounded-lg">
					<LayoutList class="w-5 h-5 text-accent" />
				</div>
				<div>
					<p class="text-sm text-text-secondary">Total Tweaks</p>
					<p class="font-bold text-text-primary text-lg">{totalOptimizations}</p>
				</div>
			</div>
			<div class="w-px bg-border-subtle md:w-full md:h-px"></div>
			<div class="flex items-center gap-3">
				<div class="p-2 bg-surface-2 rounded-lg">
					<Activity class="w-5 h-5 text-danger" />
				</div>
				<div>
					<p class="text-sm text-text-secondary">High Impact</p>
					<p class="font-bold text-text-primary text-lg">{highImpactCount}</p>
				</div>
			</div>
		</div>
	</header>

	<!-- System Requirements -->
	{#if game.recommendedSpecs}
		<section class="space-y-4">
			<h2 class="text-xl font-bold text-text-primary flex items-center gap-2">
				<Cpu class="w-5 h-5 text-accent" />
				System Requirements
			</h2>
			<div class="overflow-x-auto rounded-xl border border-border-subtle bg-surface-1">
				<table class="w-full text-left text-sm whitespace-nowrap">
					<thead class="bg-surface-2 border-b border-border-subtle text-text-secondary">
						<tr>
							<th class="px-6 py-4 font-medium">Requirement</th>
							<th class="px-6 py-4 font-medium">Minimum</th>
							<th class="px-6 py-4 font-medium">Recommended</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border-subtle text-text-primary">
						<tr class="hover:bg-surface-2/50 transition-colors">
							<td class="px-6 py-4 font-medium text-text-secondary">CPU</td>
							<td class="px-6 py-4">{game.recommendedSpecs.minCpu}</td>
							<td class="px-6 py-4">{game.recommendedSpecs.recCpu}</td>
						</tr>
						<tr class="hover:bg-surface-2/50 transition-colors">
							<td class="px-6 py-4 font-medium text-text-secondary">GPU</td>
							<td class="px-6 py-4">{game.recommendedSpecs.minGpu}</td>
							<td class="px-6 py-4">{game.recommendedSpecs.recGpu}</td>
						</tr>
						<tr class="hover:bg-surface-2/50 transition-colors">
							<td class="px-6 py-4 font-medium text-text-secondary">RAM</td>
							<td class="px-6 py-4">{game.recommendedSpecs.minRamGb} GB</td>
							<td class="px-6 py-4">{game.recommendedSpecs.recRamGb} GB</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	{/if}

	<!-- Optimizations List -->
	<section class="space-y-4">
		<h2 class="text-xl font-bold text-text-primary">Optimizations</h2>
		<div class="space-y-3">
			{#each game.optimizations as opt}
				{@const isExpanded = expandedOptimizations.has(opt.id)}
				{@const isApplied = appliedOptimizations.has(opt.id)}
				<div
					class={cn(
						'border rounded-xl bg-surface-1 overflow-hidden transition-colors',
						isApplied ? 'border-neon/30' : 'border-border-subtle',
						isExpanded ? 'bg-surface-2' : 'hover:border-border-strong'
					)}
				>
					<div tabindex="0" role="button" onkeydown={(e) => e.key === "Enter" && toggleExpanded(opt.id)} onclick={() => toggleExpanded(opt.id)} 
						class="w-full px-6 py-4 flex items-start sm:items-center justify-between gap-4 text-left"
						 
					>
						<div class="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
							<div class="space-y-1">
								<h3 class={cn('font-semibold text-lg', isApplied ? 'text-text-primary' : 'text-text-primary')}>
									{opt.title}
								</h3>
								<p class="text-sm text-text-secondary line-clamp-1">{opt.description}</p>
							</div>
							
							<div class="flex flex-wrap items-center gap-2 sm:ml-auto">
								<span class="px-2.5 py-1 rounded-md text-xs font-medium bg-surface-3 text-text-secondary border border-border-strong capitalize">
									{opt.category}
								</span>
								<span class={cn('px-2.5 py-1 rounded-md text-xs font-medium border capitalize', getImpactBadgeClass(opt.impact))}>
									{opt.impact} Impact
								</span>
							</div>
						</div>

						<div class="flex items-center gap-3 shrink-0">
							<button
								class={cn(
									'p-2 rounded-lg border transition-colors flex items-center gap-2 text-sm font-medium',
									isApplied 
										? 'bg-neon/10 text-neon border-neon/30 hover:bg-neon/20' 
										: 'bg-surface-3 text-text-secondary border-border-strong hover:bg-surface-1 hover:text-text-primary'
								)}
								onclick={(e) => toggleApplied(opt.id, e)}
							>
								<CheckCircle2 class="w-4 h-4" />
								<span class="hidden sm:inline">{isApplied ? 'Applied' : 'Mark Applied'}</span>
							</div>
							<div class="p-1 rounded text-text-tertiary">
								<ChevronDown class={cn('w-5 h-5 transition-transform duration-200', isExpanded && 'rotate-180')} />
							</div>
						</div>
					</div>

					{#if isExpanded}
						<div class="px-6 pb-6 pt-2 border-t border-border-subtle/50" transition:slide={{ duration: 200 }}>
							<h4 class="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">
								Instructions
							</h4>
							<ol class="space-y-3">
								{#each opt.steps as step, i}
									<li class="flex gap-3 text-text-primary">
										<span class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-surface-3 text-xs font-medium text-text-secondary border border-border-strong">
											{i + 1}
										</span>
										<span class="mt-0.5 leading-relaxed">{step}</span>
									</li>
								{/each}
							</ol>
						</div>
					{/if}`n			{/each}
		</div>
	</section>
</div>






