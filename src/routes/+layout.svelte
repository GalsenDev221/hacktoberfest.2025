<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta charset="utf-8" />
</svelte:head>

<!-- Add top padding to account for the fixed nav (py on small screens, larger on md+) -->
<div class="min-h-screen bg-slate-900 pt-16 md:pt-20">
	<slot />
</div>
