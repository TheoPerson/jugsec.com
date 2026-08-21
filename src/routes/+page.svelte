<script lang="ts">
	import {
		Zap,
		Shield,
		Target,
		Clock,
		TrendingUp,
		Gamepad2,
		ChevronDown,
		Menu,
		X,
		ArrowRight,
		Cpu,
		MonitorSpeaker,
		Gauge,
		ListChecks,
		History,
		Sparkles
	} from '@lucide/svelte';
	import { page } from '$app/stores';

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);
	let activeFaq = $state<number | null>(null);

	function toggleFaq(index: number) {
		activeFaq = activeFaq === index ? null : index;
	}

	const faqs = [
		{
			q: 'Is this optimization safe?',
			a: 'Yes, absolutely. JUGSEC only recommends safe, tested settings and never suggests overclocking or modifying critical system files that could damage your hardware.'
		},
		{
			q: 'Do I need to install anything?',
			a: 'Our web platform performs basic analysis, but for our full suite of optimizations and one-click profile applications, we provide a lightweight, non-intrusive desktop application.'
		},
		{
			q: 'Which games are supported?',
			a: 'We currently support over 50 top competitive titles including Valorant, CS2, Fortnite, Apex Legends, League of Legends, Overwatch 2, and Call of Duty: Warzone.'
		},
		{
			q: 'Can this actually improve my FPS?',
			a: 'Yes! Most users see a 20-50% improvement in 1% low framerates and a 10-30% boost in average FPS, depending on their hardware and how unoptimized their system was initially.'
		},
		{
			q: 'How does the remote session work?',
			a: 'Our proprietary engine scans your specific hardware combination, drivers, and OS version, then cross-references it with a database of millions of optimal configurations to find your exact bottlenecks.'
		}
	];
</script>

<svelte:window onscroll={() => (isScrolled = window.scrollY > 20)} />

<div class="min-h-screen bg-base text-text-primary font-sans overflow-x-hidden selection:bg-accent/30">
	<!-- Navbar -->
	<header
		class="fixed top-0 w-full z-50 transition-all duration-300 {isScrolled
			? 'bg-base/90 backdrop-blur-md border-b border-border-subtle py-4'
			: 'bg-transparent py-6'}"
	>
		<div class="container mx-auto px-6 md:px-12 flex justify-between items-center max-w-7xl">
			<a href="/" class="flex items-center gap-2 group">
				<div class="relative w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:bg-accent/20 transition-colors">
					<Zap class="w-5 h-5 text-accent" />
				</div>
				<span class="text-xl font-black tracking-tight">JUGSEC</span>
			</a>

			<!-- Desktop Nav -->
			<nav class="hidden md:flex items-center gap-8">
				<a href="#features" class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Features</a>
				<a href="#games" class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Games</a>
				<a href="#pricing" class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Pricing</a>
				<a href="#faq" class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">FAQ</a>
			</nav>

			<div class="hidden md:flex items-center gap-4">
				{#if $page.data.user}
					<a href="/dashboard" class="px-5 py-2.5 rounded-lg bg-surface-2 border border-border-subtle hover:border-border-strong text-sm font-semibold transition-all">
						Dashboard
					</a>
				{:else}
					<a href="/login" class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Login</a>
					<a href="/register" class="px-5 py-2.5 rounded-lg bg-accent text-void font-bold text-sm shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all">
						Get Started
					</a>
				{/if}
			</div>

			<!-- Mobile Menu Toggle -->
			<button class="md:hidden text-text-secondary hover:text-text-primary" onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}>
				{#if isMobileMenuOpen}
					<X class="w-6 h-6" />
				{:else}
					<Menu class="w-6 h-6" />
				{/if}
			</button>
		</div>

		<!-- Mobile Nav -->
		{#if isMobileMenuOpen}
			<div class="absolute top-full left-0 w-full bg-base/95 backdrop-blur-xl border-b border-border-subtle p-6 flex flex-col gap-4 md:hidden shadow-2xl">
				<a href="#features" class="text-lg font-medium text-text-secondary hover:text-text-primary" onclick={() => (isMobileMenuOpen = false)}>Features</a>
				<a href="#games" class="text-lg font-medium text-text-secondary hover:text-text-primary" onclick={() => (isMobileMenuOpen = false)}>Games</a>
				<a href="#pricing" class="text-lg font-medium text-text-secondary hover:text-text-primary" onclick={() => (isMobileMenuOpen = false)}>Pricing</a>
				<a href="#faq" class="text-lg font-medium text-text-secondary hover:text-text-primary" onclick={() => (isMobileMenuOpen = false)}>FAQ</a>
				<div class="h-px bg-border-subtle my-2"></div>
				{#if $page.data.user}
					<a href="/dashboard" class="w-full text-center px-5 py-3 rounded-lg bg-surface-2 border border-border-subtle text-sm font-semibold">Dashboard</a>
				{:else}
					<a href="/login" class="w-full text-center text-lg font-medium text-text-secondary">Login</a>
					<a href="/register" class="w-full text-center px-5 py-3 rounded-lg bg-accent text-void font-bold text-lg shadow-[0_0_20px_rgba(0,212,255,0.3)]">Get Started</a>
				{/if}
			</div>
		{/if}
	</header>

	<main>
		<!-- Hero Section -->
		<section class="relative pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center justify-center min-h-[90vh] text-center overflow-hidden">
			<!-- Background Effects -->
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neon/10 rounded-full blur-[80px] pointer-events-none translate-x-[20%]"></div>
			
			<div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50"></div>

			<div class="container relative z-10 px-6 mx-auto max-w-4xl">
				<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-2 border border-border-default text-xs font-semibold text-text-secondary mb-8">
					<Sparkles class="w-4 h-4 text-neon" />
					<span>JUGSEC AI Engine v2.0 is live</span>
				</div>
				
				<h1 class="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
					Unlock Your PC's <br class="hidden md:block" />
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-accent to-neon">True Power</span>
				</h1>
				
				<p class="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
					Premium 1-on-1 PC optimization service. Deep manual BIOS and OS tuning for competitive players who need absolute zero input lag and maximum frames.
				</p>
				
				<div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
					<a href="/register" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent text-void font-bold text-lg shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_50px_rgba(0,212,255,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
						Book Your Session
						<ArrowRight class="w-5 h-5" />
					</a>
					<a href="#how-it-works" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-surface-1 border border-border-default hover:border-border-strong text-lg font-semibold hover:bg-surface-2 transition-all flex items-center justify-center">
						See How It Works
					</a>
				</div>
				
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-border-subtle max-w-3xl mx-auto">
					<div class="flex flex-col items-center">
						<span class="text-3xl font-black text-text-primary mb-1">147%</span>
						<span class="text-sm font-medium text-text-secondary">Avg FPS Gain</span>
					</div>
					<div class="flex flex-col items-center">
						<span class="text-3xl font-black text-text-primary mb-1">&lt; 2min</span>
						<span class="text-sm font-medium text-text-secondary">Setup Time</span>
					</div>
					<div class="flex flex-col items-center">
						<span class="text-3xl font-black text-text-primary mb-1">50K+</span>
						<span class="text-sm font-medium text-text-secondary">Active Gamers</span>
					</div>
				</div>
			</div>
		</section>

		<!-- Social Proof -->
		<section class="py-10 border-y border-border-subtle bg-surface-1/50 overflow-hidden">
			<div class="container mx-auto px-6 text-center">
				<p class="text-sm font-semibold text-text-tertiary mb-6 uppercase tracking-wider">Trusted by competitive gamers across</p>
				<div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
					<div class="flex items-center gap-2 text-xl font-black text-text-primary"><Target class="w-6 h-6 text-accent" /> FPS</div>
					<div class="flex items-center gap-2 text-xl font-black text-text-primary"><Shield class="w-6 h-6 text-neon" /> MOBA</div>
					<div class="flex items-center gap-2 text-xl font-black text-text-primary"><Gamepad2 class="w-6 h-6 text-warning" /> BATTLE ROYALE</div>
				</div>
			</div>
		</section>

		<!-- Problem Section -->
		<section class="py-20 md:py-32 relative">
			<div class="container mx-auto px-6 max-w-6xl">
				<div class="text-center mb-16">
					<h2 class="text-3xl md:text-5xl font-black mb-4">Your PC Is Leaving <span class="text-danger">Performance</span> on the Table</h2>
					<p class="text-lg text-text-secondary max-w-2xl mx-auto">Windows isn't built for gaming out of the box. You're losing frames to background services, bad driver configs, and unoptimized settings.</p>
				</div>
				
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div class="bg-surface-1 border border-border-subtle rounded-2xl p-8 hover:border-danger/30 transition-all">
						<div class="w-12 h-12 bg-danger/10 rounded-xl flex items-center justify-center mb-6">
							<MonitorSpeaker class="w-6 h-6 text-danger" />
						</div>
						<h3 class="text-xl font-bold mb-3">Hidden Settings</h3>
						<p class="text-text-secondary leading-relaxed">Crucial performance toggles are buried deep in your BIOS, drivers, and Windows registry, invisible to normal users.</p>
					</div>
					<div class="bg-surface-1 border border-border-subtle rounded-2xl p-8 hover:border-danger/30 transition-all">
						<div class="w-12 h-12 bg-danger/10 rounded-xl flex items-center justify-center mb-6">
							<Clock class="w-6 h-6 text-danger" />
						</div>
						<h3 class="text-xl font-bold mb-3">Hours of Research</h3>
						<p class="text-text-secondary leading-relaxed">Wasting time scrolling through outdated Reddit threads, Discord servers, and clickbait YouTube tutorials.</p>
					</div>
					<div class="bg-surface-1 border border-border-subtle rounded-2xl p-8 hover:border-danger/30 transition-all">
						<div class="w-12 h-12 bg-danger/10 rounded-xl flex items-center justify-center mb-6">
							<Shield class="w-6 h-6 text-danger" />
						</div>
						<h3 class="text-xl font-bold mb-3">Risk of Breaking Things</h3>
						<p class="text-text-secondary leading-relaxed">Following the wrong guide or changing the wrong registry key can lead to blue screens and corrupted Windows installs.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Solution / Features Section -->
		<section id="features" class="py-20 md:py-32 bg-surface-1/30 relative">
			<div class="container mx-auto px-6 max-w-6xl">
				<div class="text-center mb-16">
					<h2 class="text-3xl md:text-5xl font-black mb-4">JUGSEC Handles <span class="text-accent">Everything</span></h2>
					<p class="text-lg text-text-secondary max-w-2xl mx-auto">Our platform automates the complex optimization process, giving you pro-level performance safely and quickly.</p>
				</div>
				
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div class="bg-surface-1 border border-border-subtle hover:border-border-strong rounded-2xl p-8 group transition-all">
						<Cpu class="w-8 h-8 text-accent mb-6 group-hover:scale-110 transition-transform" />
						<h3 class="text-xl font-bold mb-3">1-on-1 Expert Audit</h3>
						<p class="text-text-secondary text-sm leading-relaxed">Scans your unique hardware specs and identifies specific bottlenecks holding back your framerates.</p>
					</div>
					<div class="bg-surface-1 border border-border-subtle hover:border-border-strong rounded-2xl p-8 group transition-all">
						<Gamepad2 class="w-8 h-8 text-accent mb-6 group-hover:scale-110 transition-transform" />
						<h3 class="text-xl font-bold mb-3">Game-Specific Profiles</h3>
						<p class="text-text-secondary text-sm leading-relaxed">Apply one-click configurations tailored for top competitive titles to maximize visibility and FPS.</p>
					</div>
					<div class="bg-surface-1 border border-border-subtle hover:border-border-strong rounded-2xl p-8 group transition-all">
						<Gauge class="w-8 h-8 text-accent mb-6 group-hover:scale-110 transition-transform" />
						<h3 class="text-xl font-bold mb-3">Performance Scoring</h3>
						<p class="text-text-secondary text-sm leading-relaxed">Know exactly where your system stands with our 0-100 proprietary optimization rating system.</p>
					</div>
					<div class="bg-surface-1 border border-border-subtle hover:border-border-strong rounded-2xl p-8 group transition-all">
						<ListChecks class="w-8 h-8 text-accent mb-6 group-hover:scale-110 transition-transform" />
						<h3 class="text-xl font-bold mb-3">Step-by-Step Guides</h3>
						<p class="text-text-secondary text-sm leading-relaxed">Clear, risk-free instructions for manual tweaks. No guesswork, just results you can trust.</p>
					</div>
					<div class="bg-surface-1 border border-border-subtle hover:border-border-strong rounded-2xl p-8 group transition-all">
						<History class="w-8 h-8 text-accent mb-6 group-hover:scale-110 transition-transform" />
						<h3 class="text-xl font-bold mb-3">History & Tracking</h3>
						<p class="text-text-secondary text-sm leading-relaxed">Track your PC's performance improvements over time and quickly revert changes if needed.</p>
					</div>
					<div class="bg-surface-1 border border-border-subtle hover:border-border-strong rounded-2xl p-8 group transition-all">
						<TrendingUp class="w-8 h-8 text-accent mb-6 group-hover:scale-110 transition-transform" />
						<h3 class="text-xl font-bold mb-3">Custom Tuning</h3>
						<p class="text-text-secondary text-sm leading-relaxed">Tweaks are prioritized by actual impact on your frame times, not just random suggestions.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- How it Works -->
		<section id="how-it-works" class="py-20 md:py-32">
			<div class="container mx-auto px-6 max-w-5xl">
				<div class="text-center mb-16">
					<h2 class="text-3xl md:text-5xl font-black mb-4">How It Works</h2>
					<p class="text-lg text-text-secondary">Three steps to competitive advantage.</p>
				</div>
				
				<div class="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
					<div class="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-border-strong border-dashed"></div>
					
					<div class="relative flex flex-col items-center text-center">
						<div class="w-24 h-24 rounded-2xl bg-surface-2 border-2 border-accent flex items-center justify-center text-3xl font-black text-accent mb-6 z-10 shadow-[0_0_20px_rgba(0,212,255,0.2)]">1</div>
						<h3 class="text-2xl font-bold mb-3">Enter Your Specs</h3>
						<p class="text-text-secondary">Tell us your CPU, GPU, RAM, and monitor setup to build your base profile.</p>
					</div>
					
					<div class="relative flex flex-col items-center text-center">
						<div class="w-24 h-24 rounded-2xl bg-surface-2 border-2 border-accent flex items-center justify-center text-3xl font-black text-accent mb-6 z-10 shadow-[0_0_20px_rgba(0,212,255,0.2)]">2</div>
						<h3 class="text-2xl font-bold mb-3">Initial Spec Audit</h3>
						<p class="text-text-secondary">Our engine analyzes your configuration and identifies performance leaks.</p>
					</div>
					
					<div class="relative flex flex-col items-center text-center">
						<div class="w-24 h-24 rounded-2xl bg-accent flex items-center justify-center text-3xl font-black text-void mb-6 z-10 shadow-[0_0_30px_rgba(0,212,255,0.4)]">3</div>
						<h3 class="text-2xl font-bold mb-3">Remote Optimization</h3>
						<p class="text-text-secondary">Follow the guided optimizations, boost your FPS, and climb the ranks.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Games Preview -->
		<section id="games" class="py-20 md:py-32 bg-surface-1/50 border-y border-border-subtle">
			<div class="container mx-auto px-6 max-w-6xl">
				<div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
					<div>
						<h2 class="text-3xl md:text-5xl font-black mb-4">Optimized for the Games <span class="text-accent">That Matter</span></h2>
						<p class="text-lg text-text-secondary">Custom profiles designed to maximize competitive advantage.</p>
					</div>
					<a href="/games" class="text-accent font-semibold hover:text-white transition-colors flex items-center gap-2">
						View all supported games <ArrowRight class="w-4 h-4" />
					</a>
				</div>
				
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<!-- Game Cards (Visual Placeholders) -->
					{#each ['Valorant', 'Counter-Strike 2', 'Fortnite', 'Apex Legends'] as game, i}
						<div class="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface-2 border border-border-subtle cursor-pointer">
							<div class="absolute inset-0 bg-gradient-to-t from-base via-base/50 to-transparent z-10"></div>
							
							<!-- Abstract pattern instead of actual images -->
							<div class="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/40 via-surface-2 to-surface-2 flex items-center justify-center">
								<Gamepad2 class="w-20 h-20 text-accent/20 group-hover:scale-110 transition-transform duration-700" />
							</div>
							
							<div class="absolute inset-0 p-6 flex flex-col justify-end z-20">
								<h3 class="text-2xl font-black mb-1 transform group-hover:-translate-y-2 transition-transform duration-300">{game}</h3>
								<p class="text-sm text-neon font-mono font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">+25% Avg FPS Boost</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Pricing Section -->
		<section id="pricing" class="py-20 md:py-32">
			<div class="container mx-auto px-6 max-w-5xl">
				<div class="text-center mb-16">
					<h2 class="text-3xl md:text-5xl font-black mb-4">Simple, Transparent Pricing</h2>
					<p class="text-lg text-text-secondary">Start optimizing for free, upgrade when you need the serious power.</p>
				</div>
				
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					<!-- Free Tier -->
					<div class="bg-surface-1 border border-border-subtle rounded-3xl p-8 md:p-12 flex flex-col">
						<h3 class="text-2xl font-bold mb-2">Free</h3>
						<p class="text-text-secondary mb-6">Essential tweaks for casual gamers.</p>
						<div class="mb-8">
							<span class="text-5xl font-black">$0</span>
							<span class="text-text-secondary">/ forever</span>
						</div>
						<ul class="space-y-4 mb-10 flex-1">
							<li class="flex items-center gap-3"><Zap class="w-5 h-5 text-text-secondary" /> <span>Basic System Scan</span></li>
							<li class="flex items-center gap-3"><Zap class="w-5 h-5 text-text-secondary" /> <span>5 Performance Recommendations</span></li>
							<li class="flex items-center gap-3"><Zap class="w-5 h-5 text-text-secondary" /> <span>2 Game Profiles</span></li>
							<li class="flex items-center gap-3"><Zap class="w-5 h-5 text-text-secondary" /> <span>Basic Performance Score</span></li>
						</ul>
						<a href="/register" class="w-full py-4 rounded-xl bg-surface-2 border border-border-default hover:border-border-strong text-center font-bold transition-colors">Get Started Free</a>
					</div>
					
					<!-- Pro Tier -->
					<div class="relative bg-surface-1 border-2 border-accent rounded-3xl p-8 md:p-12 flex flex-col shadow-[0_0_40px_rgba(0,212,255,0.15)]">
						<div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent text-void px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wide">Most Popular</div>
						<h3 class="text-2xl font-bold mb-2">Pro</h3>
						<p class="text-accent mb-6">Maximum performance for competitive players.</p>
						<div class="mb-8">
							<span class="text-5xl font-black">$9.99</span>
							<span class="text-text-secondary">/ month</span>
						</div>
						<ul class="space-y-4 mb-10 flex-1">
							<li class="flex items-center gap-3"><Zap class="w-5 h-5 text-accent" /> <span class="font-medium">Unlimited Deep Scans</span></li>
							<li class="flex items-center gap-3"><Zap class="w-5 h-5 text-accent" /> <span class="font-medium">All Expert Recommendations</span></li>
							<li class="flex items-center gap-3"><Zap class="w-5 h-5 text-accent" /> <span class="font-medium">All Game Profiles</span></li>
							<li class="flex items-center gap-3"><Zap class="w-5 h-5 text-accent" /> <span class="font-medium">Advanced AI Analysis</span></li>
							<li class="flex items-center gap-3"><Zap class="w-5 h-5 text-accent" /> <span class="font-medium">Performance History Tracking</span></li>
							<li class="flex items-center gap-3"><Zap class="w-5 h-5 text-accent" /> <span class="font-medium">Priority Support</span></li>
						</ul>
						<a href="/register?plan=pro" class="w-full py-4 rounded-xl bg-accent text-void text-center font-bold shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] transition-all">Upgrade to Pro</a>
					</div>
				</div>
			</div>
		</section>

		<!-- FAQ Section -->
		<section id="faq" class="py-20 md:py-32 bg-surface-1/30">
			<div class="container mx-auto px-6 max-w-3xl">
				<div class="text-center mb-16">
					<h2 class="text-3xl md:text-5xl font-black mb-4">Frequently Asked Questions</h2>
				</div>
				
				<div class="space-y-4">
					{#each faqs as faq, i}
						<div class="bg-surface-1 border border-border-subtle rounded-2xl overflow-hidden transition-all duration-300 {activeFaq === i ? 'border-border-strong shadow-lg' : ''}">
							<button 
								class="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
								onclick={() => toggleFaq(i)}
							>
								<span class="font-semibold text-lg">{faq.q}</span>
								<ChevronDown class="w-5 h-5 text-text-secondary transition-transform duration-300 {activeFaq === i ? 'rotate-180' : ''}" />
							</button>
							
							<div class="px-6 overflow-hidden transition-all duration-300 {activeFaq === i ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}">
								<p class="text-text-secondary leading-relaxed">{faq.a}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Final CTA -->
		<section class="py-24 md:py-40 relative overflow-hidden border-y border-border-subtle">
			<div class="absolute inset-0 bg-accent/5"></div>
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
			
			<div class="container mx-auto px-6 relative z-10 text-center">
				<h2 class="text-4xl md:text-6xl font-black mb-6">Ready to Unlock Your <br class="hidden md:block" />Full Potential?</h2>
				<p class="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">Stop letting bad settings hold back your rank. Join thousands of competitive players optimizing with JUGSEC.</p>
				<a href="/register" class="inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-accent text-void font-bold text-xl shadow-[0_0_40px_rgba(0,212,255,0.4)] hover:shadow-[0_0_60px_rgba(0,212,255,0.6)] hover:-translate-y-1 transition-all">
					Start Optimizing Now
					<Zap class="w-6 h-6" />
				</a>
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="bg-base pt-20 pb-10 border-t border-border-subtle">
		<div class="container mx-auto px-6 max-w-7xl">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
				<div class="col-span-1 md:col-span-1">
					<a href="/" class="flex items-center gap-2 mb-6">
						<div class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20">
							<Zap class="w-5 h-5 text-accent" />
						</div>
						<span class="text-xl font-black tracking-tight">JUGSEC</span>
					</a>
					<p class="text-text-secondary text-sm leading-relaxed mb-6">
						Premium PC optimization for competitive gamers. Maximize frames, minimize latency, dominate the lobby.
					</p>
				</div>
				
				<div>
					<h4 class="font-bold mb-6">Product</h4>
					<ul class="space-y-4">
						<li><a href="#features" class="text-sm text-text-secondary hover:text-accent transition-colors">Features</a></li>
						<li><a href="#games" class="text-sm text-text-secondary hover:text-accent transition-colors">Supported Games</a></li>
						<li><a href="#pricing" class="text-sm text-text-secondary hover:text-accent transition-colors">Pricing</a></li>
						<li><a href="/download" class="text-sm text-text-secondary hover:text-accent transition-colors">Download App</a></li>
					</ul>
				</div>
				
				<div>
					<h4 class="font-bold mb-6">Resources</h4>
					<ul class="space-y-4">
						<li><a href="/guides" class="text-sm text-text-secondary hover:text-accent transition-colors">Optimization Guides</a></li>
						<li><a href="#faq" class="text-sm text-text-secondary hover:text-accent transition-colors">FAQ</a></li>
						<li><a href="/blog" class="text-sm text-text-secondary hover:text-accent transition-colors">Blog</a></li>
						<li><a href="/support" class="text-sm text-text-secondary hover:text-accent transition-colors">Support</a></li>
					</ul>
				</div>
				
				<div>
					<h4 class="font-bold mb-6">Legal</h4>
					<ul class="space-y-4">
						<li><a href="/terms" class="text-sm text-text-secondary hover:text-accent transition-colors">Terms of Service</a></li>
						<li><a href="/privacy" class="text-sm text-text-secondary hover:text-accent transition-colors">Privacy Policy</a></li>
						<li><a href="/cookies" class="text-sm text-text-secondary hover:text-accent transition-colors">Cookie Policy</a></li>
					</ul>
				</div>
			</div>
			
			<div class="border-t border-border-subtle pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
				<p class="text-sm text-text-tertiary">
					&copy; {new Date().getFullYear()} JUGSEC. All rights reserved.
				</p>
				<div class="flex items-center gap-6">
					<!-- Social Links placeholders -->
					<a href="/" class="text-text-tertiary hover:text-accent transition-colors">Twitter</a>
					<a href="/" class="text-text-tertiary hover:text-accent transition-colors">Discord</a>
					<a href="/" class="text-text-tertiary hover:text-accent transition-colors">YouTube</a>
				</div>
			</div>
		</div>
	</footer>
</div>




