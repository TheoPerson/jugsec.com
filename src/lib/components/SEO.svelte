<script lang="ts">
	import { page } from '$app/stores';

	export let title = 'FrameForge | Ultimate PC Optimization for Gamers';
	export let description = 'AI-powered PC optimization. Unlock every frame, reduce input lag, and dominate your matches with game-specific profiles.';
	export let image = 'https://frameforge.gg/og-image.jpg';
	export let type = 'website';

	$: url = $page.url.origin + $page.url.pathname;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- OpenGraph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />

	<!-- Canonical -->
	<link rel="canonical" href={url} />
</svelte:head>
