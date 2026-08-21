<script lang="ts">
	import { page } from '$app/stores';

	export let title = 'JUGSEC | Premium 1-on-1 PC Optimization by Theo';
	export let description = 'Premium 1-on-1 PC optimization service by Theo. Custom BIOS, OS, and hardware tweaks applied manually for competitive esports.';
	export let image = 'https://jugsec.com/og-image.jpg';
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

