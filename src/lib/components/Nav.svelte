<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import logo from '$lib/assets/images/galsendev221_logo.jpeg';
  import Button from './ui/Button.svelte';

  const dispatch = createEventDispatcher();

  export let siteName: string = 'GalsenDev';
  let open = false;
</script>

<nav class="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-violet-500/20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center py-4">
      <div class="flex items-center space-x-2">
        <a href="#home" class="inline-flex items-center gap-3">
          <img class="w-8 h-8 rounded-lg" src={logo} alt="logo">
          <!-- <div class="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg" aria-hidden="true"></div> -->
          <span class="text-white font-bold text-xl">{siteName}</span>
        </a>
      </div>

      <div class="hidden md:flex space-x-8" role="menubar" aria-label="Main navigation">
        <a href="#home" class="text-white hover:text-violet-300 transition-colors" role="menuitem">Home</a>
        <a href="#about" class="text-white hover:text-violet-300 transition-colors" role="menuitem">About</a>
        <a href="#events" class="text-white hover:text-violet-300 transition-colors" role="menuitem">Events</a>
        <a href="#community" class="text-white hover:text-violet-300 transition-colors" role="menuitem">Community</a>
        <a href="#sponsors" class="text-white hover:text-violet-300 transition-colors" role="menuitem">Sponsors</a>
      </div>

    <div class="flex items-center gap-3">
  <Button on:click={() => dispatch('openRegister')} className="px-4 py-1 text-sm md:px-6 md:py-2">Register</Button>
          <button class="md:hidden text-gray-200" aria-label="Toggle menu" aria-expanded={open} on:click={() => (open = !open)}>
            {#if open}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            {/if}
          </button>
      </div>
    </div>
  </div>

  {#if open}
    <div class="md:hidden bg-slate-900/90 border-t border-violet-500/10">
      <div class="px-4 py-3 space-y-2">
        <a href="#home" class="block text-white">Home</a>
        <a href="#about" class="block text-white">About</a>
        <a href="#events" class="block text-white">Events</a>
        <a href="#community" class="block text-white">Community</a>
        <a href="#sponsors" class="block text-white">Sponsors</a>
      </div>
    </div>
  {/if}
</nav>
