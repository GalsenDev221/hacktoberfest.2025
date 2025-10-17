<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta charset="utf-8" />

	<!-- OG Meta Tags -->
	<meta property="og:url" content="https://hfest25.galsen.dev" />
	<meta property="og:type" content="website" />
	<meta
		property="og:image"
		content="https://res.cloudinary.com/degyjrpjj/image/upload/v1760667394/galsendev/hfest25/og_image.png"
	/>
	<meta property="og:title" content="Hacktoberfest 2025 | Galsen DEV" />
	<meta
		property="og:description"
		content="Rejoignez-nous pour célébrer la cinquième édition du Hacktoberfest avec Galsen DEV !"
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="hfest25.galsen.dev" />
	<meta property="twitter:url" content="https://hfest25.galsen.dev" />
	<meta name="twitter:title" content="Hacktoberfest 2025 | Galsen DEV" />
	<meta
		name="twitter:description"
		content="Rejoignez-nous pour célébrer la cinquième édition du Hacktoberfest avec Galsen DEV !"
	/>
	<meta
		name="twitter:image"
		content="https://res.cloudinary.com/degyjrpjj/image/upload/v1760667394/galsendev/hfest25/og_image.png"
	/>
</svelte:head>

<!-- Add top padding to account for the fixed nav (py on small screens, larger on md+) -->
<div class="min-h-screen bg-slate-900 pt-16 md:pt-20">
	<slot />
</div>
