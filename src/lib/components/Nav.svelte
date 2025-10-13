<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import logo from '$lib/assets/images/galsendev221_logo.jpeg';
	import Button from './ui/Button.svelte';

	const dispatch = createEventDispatcher();

	export let siteName: string = 'GalsenDev';
	let open = false;
</script>

<nav class="fixed top-0 z-50 w-full border-b border-violet-500/20 bg-slate-900/80 backdrop-blur-md">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between py-4">
			<div class="flex items-center space-x-2">
				<a href="#home" class="inline-flex items-center gap-3">
					<img class="h-8 w-8 rounded-lg" src={logo} alt="logo" />
					<!-- <div class="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg" aria-hidden="true"></div> -->
					<span class="text-xl font-bold text-white">{siteName}</span>
				</a>
			</div>

			<div class="hidden space-x-8 md:flex" role="menubar" aria-label="Main navigation">
				<a href="#home" class="text-white transition-colors hover:text-violet-300" role="menuitem"
					>Home</a
				>
				<a href="#about" class="text-white transition-colors hover:text-violet-300" role="menuitem"
					>About</a
				>
				<a href="#events" class="text-white transition-colors hover:text-violet-300" role="menuitem"
					>Events</a
				>
				<a
					href="https://galsen.dev"
          target="_blank"
					class="text-white transition-colors hover:text-violet-300"
					role="menuitem">Community</a
				>
				<a
					href="#sponsors"
					class="text-white transition-colors hover:text-violet-300"
					role="menuitem">Sponsors</a
				>
			</div>

			<div class="flex items-center gap-3">
				<a href="https://luma.com/3icfjnbc" target="_blank" rel="noopener noreferrer" class="inline-block rounded-lg bg-purple-600 px-8 py-2 font-semibold text-white shadow-lg transition hover:bg-purple-700">Register</a>
		</div>
	</div>

	{#if open}
		<div class="border-t border-violet-500/10 bg-slate-900/90 md:hidden">
			<div class="space-y-2 px-4 py-3">
				<a href="#home" class="block text-white">Home</a>
				<a href="#about" class="block text-white">About</a>
				<a href="https://galsen.dev" target="_blank" class="block text-white">Events</a>
				<a href="#community" class="block text-white">Community</a>
				<a href="#sponsors" class="block text-white">Sponsors</a>
			</div>
		</div>
	{/if}
</nav>
