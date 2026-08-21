<script lang="ts">
	import { 
		History, 
		Cpu, 
		MonitorSpeaker, 
		CircuitBoard, 
		HardDrive, 
		Wifi, 
		Monitor, 
		Gamepad2,
		ArrowRight
	} from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedCategory = $state('All');

	const categories = ['All', 'CPU', 'GPU', 'RAM', 'Storage', 'Network', 'OS', 'Game'];

	function getCategoryIcon(category: string) {
		const cat = category.toLowerCase();
		if (cat === 'cpu') return Cpu;
		if (cat === 'gpu') return MonitorSpeaker;
		if (cat === 'ram') return CircuitBoard;
		if (cat === 'storage') return HardDrive;
		if (cat === 'network') return Wifi;
		if (cat === 'os') return Monitor;
		if (cat === 'game') return Gamepad2;
		return History;
	}

	function getCategoryColor(category: string) {
		const cat = category.toLowerCase();
		if (cat === 'cpu') return 'text-accent border-accent/20 bg-accent/10';
		if (cat === 'gpu') return 'text-neon border-neon/20 bg-neon/10';
		if (cat === 'ram') return 'text-warning border-warning/20 bg-warning/10';
		if (cat === 'game') return 'text-danger border-danger/20 bg-danger/10';
		return 'text-text-primary border-border-strong bg-surface-2';
	}

	let filteredHistory = $derived(
		selectedCategory === 'All'
			? data.history
			: data.history.filter((h) => h.category.toLowerCase() === selectedCategory.toLowerCase())
	);

	// Grouper par date (ex: '2023-10-15')
	let groupedHistory = $derived.by(() => {
		const groups: Record<string, typeof data.history> = {};
		for (const item of filteredHistory) {
			// On suppose que appliedAt est soit une string ISO, soit un objet Date.
			const dateObj = new Date(item.appliedAt);
			const dateKey = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(dateObj);
			if (!groups[dateKey]) {
				groups[dateKey] = [];
			}
			groups[dateKey].push(item);
		}
		return groups;
	});
</script>

<div class="space-y-8">
	<!-- Header -->
	<header class="flex flex-col gap-2">
		<h1 class="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-3">
			<History class="w-8 h-8 text-accent" />
			Optimization History
		</h1>
		<p class="text-text-secondary text-lg max-w-2xl">
			Track all system modifications, tweaks, and optimizations applied to your gaming setup.
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

	<!-- History Timeline -->
	{#if filteredHistory.length === 0}
		{#if selectedCategory === 'All' && data.history.length === 0}
			<div class="p-12 text-center bg-surface-1 border border-border-subtle rounded-xl flex flex-col items-center gap-4">
				<History class="w-12 h-12 text-text-tertiary" />
				<div class="space-y-2">
					<h3 class="text-xl font-semibold text-text-primary">No optimizations yet</h3>
					<p class="text-text-secondary">Run your first scan to start tracking improvements.</p>
				</div>
				<a
					href="/dashboard/scan"
					class="mt-4 inline-flex justify-center items-center gap-2 bg-accent hover:bg-accent/90 text-void py-2.5 px-6 rounded-lg font-bold transition-colors"
				>
					Run System Scan
					<ArrowRight class="w-4 h-4" />
				</a>
			</div>
		{:else}
			<div class="p-12 text-center border border-border-subtle border-dashed rounded-xl">
				<p class="text-text-secondary">No history found for this category.</p>
			</div>
		{/if}
	{:else}
		<div class="relative border-l-2 border-border-subtle ml-4 sm:ml-6 md:ml-8 space-y-12 pb-8">
			{#each Object.entries(groupedHistory) as [date, items]}
				<div class="relative">
					<!-- Date marker -->
					<div class="absolute -left-3 sm:-left-[1.35rem] md:-left-[1.85rem] mt-1.5 flex items-center justify-center">
						<div class="w-6 h-6 rounded-full bg-surface-2 border-2 border-border-strong flex items-center justify-center">
							<div class="w-2 h-2 rounded-full bg-text-tertiary"></div>
						</div>
					</div>
					
					<div class="pl-8 sm:pl-10 md:pl-12">
						<h3 class="text-lg font-bold text-text-primary mb-6 pt-1">{date}</h3>
						
						<div class="space-y-4">
							{#each items as item}
								{@const Icon = getCategoryIcon(item.category)}
								{@const colorClass = getCategoryColor(item.category)}
								<div class="bg-surface-1 border border-border-subtle rounded-xl p-5 hover:border-border-strong transition-colors">
									<div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
										<div class="flex gap-4">
											<div class={cn('shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border', colorClass)}>
												<Icon class="w-5 h-5" />
											</div>
											<div>
												<div class="flex items-center gap-2 mb-1">
													<span class="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
														{new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(item.appliedAt))}
													</span>
													<span class="w-1 h-1 rounded-full bg-border-strong"></span>
													<span class={cn('text-xs font-medium uppercase tracking-wider', colorClass.split(' ')[0])}>
														{item.category}
													</span>
												</div>
												<h4 class="text-text-primary font-medium text-base leading-snug">
													{item.action}
												</h4>
											</div>
										</div>
										
										{#if item.beforeValue || item.afterValue}
											<div class="flex items-center gap-3 bg-surface-2 px-4 py-2 rounded-lg border border-border-subtle sm:ml-auto">
												{#if item.beforeValue}
													<span class="text-text-secondary text-sm font-mono strike-through line-through opacity-70">{item.beforeValue}</span>
													<ArrowRight class="w-4 h-4 text-text-tertiary" />
												{/if}
												<span class="text-neon text-sm font-mono font-medium">{item.afterValue || 'Applied'}</span>
											</div>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>

		{#if data.history.length === 50}
			<div class="flex justify-center pt-4">
				<button type="button" class="px-6 py-2.5 rounded-lg border border-border-strong bg-surface-2 hover:bg-surface-3 text-text-primary font-medium transition-colors">
					Load More
				</button>
			</div>
		{/if}
	{/if}
</div>

