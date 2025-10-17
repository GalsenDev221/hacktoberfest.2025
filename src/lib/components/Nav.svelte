<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import logo from '$lib/assets/images/hf25.png';
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
					<img class="h-8 w-16 rounded-lg" src={logo} alt="logo" />
					<!-- <div class="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg" aria-hidden="true"></div> -->
					<span class="text-xl font-bold text-white">{siteName}</span>
				</a>
			</div>

			<div class="hidden space-x-8 md:flex" role="menubar" aria-label="Main navigation">
				<a href="#" class="text-white transition-colors hover:text-violet-300" role="menuitem"
					>Accueil</a
				>
				<a href="#about" class="text-white transition-colors hover:text-violet-300" role="menuitem"
					>A propos</a
				>
				<a
					href="#program"
					class="text-white transition-colors hover:text-violet-300"
					role="menuitem">Programme</a
				>
				<a
					href="#partners"
					class="text-white transition-colors hover:text-violet-300"
					role="menuitem">Partenaires</a
				>
			</div>

			<div class="flex items-center gap-3">
				<a
					href="https://luma.com/3icfjnbc"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-block rounded-lg bg-purple-600 px-8 py-2 font-semibold text-white shadow-lg transition hover:bg-purple-700"
					>S'inscrire</a
				>
			</div>
		</div>

		{#if open}
			<div class="border-t border-violet-500/10 bg-slate-900/90 md:hidden">
				<div class="space-y-2 px-4 py-3">
					<a href="#" class="block text-white">Accueil</a>
					<a href="#about" class="block text-white">A propos</a>
					<a href="#program" target="_blank" class="block text-white">Programme</a>
					<a href="#partners" class="block text-white">Partenaires</a>
				</div>
			</div>
		{/if}
	</div>
</nav>
