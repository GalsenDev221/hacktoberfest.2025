<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta charset="utf-8" />
</svelte:head>

<div class="min-h-screen bg-slate-900">
	<slot />
</div>
