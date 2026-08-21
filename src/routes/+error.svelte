<script lang="ts">
	import { page } from '$app/stores';
	import { Home, AlertTriangle } from '@lucide/svelte';
</script>

<div class="min-h-screen bg-void flex items-center justify-center p-4 relative overflow-hidden">
	<div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-danger/10 blur-[100px] rounded-full pointer-events-none"></div>

	<div class="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto space-y-8">
		<div class="space-y-4">
			<div class="relative inline-block">
				<h1 class="text-8xl md:text-9xl font-mono font-black tracking-tighter text-text-primary drop-shadow-[0_0_15px_rgba(255,51,102,0.5)]">
					{$page.status}
				</h1>
				<span class="block absolute inset-0 text-8xl md:text-9xl font-mono font-black tracking-tighter text-accent -translate-x-[2px] translate-y-[2px] opacity-70 mix-blend-screen animate-pulse pointer-events-none" aria-hidden="true">
					{$page.status}
				</span>
				<span class="block absolute inset-0 text-8xl md:text-9xl font-mono font-black tracking-tighter text-danger translate-x-[2px] -translate-y-[2px] opacity-70 mix-blend-screen animate-pulse pointer-events-none" aria-hidden="true" style="animation-delay: 150ms;">
					{$page.status}
				</span>
			</div>

			<div class="flex items-center justify-center gap-2 text-danger">
				<AlertTriangle class="w-6 h-6" />
				<h2 class="text-2xl font-bold uppercase tracking-widest">System Error</h2>
			</div>
		</div>

		<div class="bg-surface-1 border border-border-strong rounded-xl p-6 shadow-2xl relative overflow-hidden w-full">
			<div class="absolute top-0 left-0 w-full h-1 bg-danger"></div>
			<p class="text-text-secondary text-lg font-mono">
				{$page.error?.message || 'An unexpected error occurred during execution.'}
			</p>
		</div>

		<a
			href="/"
			class="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-void bg-accent rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
		>
			<div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
			<Home class="w-5 h-5 relative z-10" />
			<span class="relative z-10">Return to Base</span>
		</a>
	</div>
</div>
