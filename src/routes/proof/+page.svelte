<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { ArrowRight, Activity, Zap, Shield, CheckCircle2 } from '@lucide/svelte';
</script>

<SEO 
	title="Benchmarks & Proof | FrameForge" 
	description="See real-world performance gains achieved by our competitive gaming community." 
/>

<div class="min-h-screen bg-base pt-24 pb-32">
	<div class="container max-w-5xl">
		<div class="text-center mb-16 space-y-4">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-muted border border-border-accent text-accent text-sm font-semibold mb-4">
				<Activity class="w-4 h-4" /> Real Data. Real Frames.
			</div>
			<h1 class="text-5xl md:text-7xl font-mono font-black tracking-tighter text-text-primary">
				DATA DOESN'T LIE
			</h1>
			<p class="text-xl text-text-secondary max-w-2xl mx-auto">
				We tracked over 10,000 optimizations across different hardware configurations. Here is the average competitive advantage gained by FrameForge users.
			</p>
		</div>

		<!-- Main Benchmark Card -->
		<div class="bg-surface-1 border border-border-strong rounded-2xl p-8 mb-12 shadow-2xl relative overflow-hidden">
			<div class="absolute top-0 right-0 w-64 h-64 bg-neon/5 blur-[80px] rounded-full pointer-events-none"></div>
			
			<h2 class="text-2xl font-bold mb-8 flex items-center gap-3">
				<Zap class="text-neon w-6 h-6" /> Valorant 1% Lows (Stutter Reduction)
			</h2>

			<div class="space-y-6">
				<!-- Before -->
				<div>
					<div class="flex justify-between text-sm mb-2 text-text-secondary">
						<span>Before FrameForge (Stock PC)</span>
						<span class="font-mono">112 FPS</span>
					</div>
					<div class="w-full bg-surface-3 rounded-full h-4 overflow-hidden">
						<div class="bg-text-tertiary h-full rounded-full" style="width: 45%"></div>
					</div>
				</div>

				<!-- After -->
				<div>
					<div class="flex justify-between text-sm mb-2 font-bold text-text-primary">
						<span>After FrameForge Optimization</span>
						<span class="font-mono text-neon">224 FPS (+100%)</span>
					</div>
					<div class="w-full bg-surface-3 rounded-full h-4 overflow-hidden relative">
						<div class="bg-neon h-full rounded-full absolute top-0 left-0" style="width: 85%"></div>
						<!-- Glow -->
						<div class="bg-neon h-full rounded-full absolute top-0 left-0 blur-sm opacity-50" style="width: 85%"></div>
					</div>
				</div>
			</div>
		</div>

		<!-- Testimonials Grid -->
		<div class="grid md:grid-cols-2 gap-6 mb-16">
			<div class="bg-surface-1 border border-border-subtle p-6 rounded-xl hover:border-border-default transition">
				<div class="flex gap-1 text-neon mb-4">
					{#each Array(5) as _}
						<CheckCircle2 class="w-5 h-5" />
					{/each}
				</div>
				<p class="text-text-primary text-lg mb-4">"I thought my PC was just old. Turns out Windows 11 was parking my cores and my XMP was off. I went from Radiant hardstuck to hitting Radiant top 500 purely because I stopped losing 1v1s to micro-stutters."</p>
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-full bg-surface-3 flex items-center justify-center font-bold">K</div>
					<div>
						<div class="font-bold text-sm">Kezz</div>
						<div class="text-xs text-text-tertiary">Valorant Immortal/Radiant</div>
					</div>
				</div>
			</div>

			<div class="bg-surface-1 border border-border-subtle p-6 rounded-xl hover:border-border-default transition">
				<div class="flex gap-1 text-neon mb-4">
					{#each Array(5) as _}
						<CheckCircle2 class="w-5 h-5" />
					{/each}
				</div>
				<p class="text-text-primary text-lg mb-4">"The CS2 profile alone is worth it. It found 4 obscure NVIDIA control panel settings I had wrong. Input lag feels completely non-existent now."</p>
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-full bg-surface-3 flex items-center justify-center font-bold">M</div>
					<div>
						<div class="font-bold text-sm">m0nsta</div>
						<div class="text-xs text-text-tertiary">CS2 FaceIt Lvl 10</div>
					</div>
				</div>
			</div>
		</div>

		<div class="text-center">
			<a href="/auth/register" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-void font-bold rounded-lg hover:bg-accent-hover transition-colors shadow-glow-cyan">
				Join 50k+ Optimized Players <ArrowRight class="w-5 h-5" />
			</a>
		</div>
	</div>
</div>
