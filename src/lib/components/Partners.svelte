<script lang="ts">
  export let partners : {
    gold: { name: string; logo?: string }[];
    silver: { name: string; logo?: string }[];
    community: { name: string; logo?: string }[];
  } = { gold: [], silver: [], community: [] };
</script>

<section id="sponsors" class="py-12 md:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
    <div class="text-center mb-8 md:mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">Our Partners</h2>
      <p class="text-base md:text-xl text-gray-300 max-w-3xl mx-auto">Thanks to our amazing partners who make Hacktoberfest 205 possible.</p>
    </div>

    <div class="flex flex-col gap-4">
      <h3 class="text-2xl font-bold text-yellow-400 text-center ">Gold Partners</h3>
      <div class="flex flex-wrap items-center justify-center gap-6">
        {#each partners.gold as p}
          <div class="bg-white/70 backdrop-blur-md border border-yellow-500/20 rounded-lg flex items-center justify-center overflow-hidden w-full sm:w-44 md:w-64 h-40">{#if p.logo}<img src={p.logo} alt={p.name} class="w-full h-full object-contain p-2" />{:else}<span class="text-yellow-400 font-bold">{p.name}</span>{/if}</div>
        {/each}
      </div>
    </div>
    
    <div class="flex flex-col gap-4">
      <h3 class="text-2xl font-bold text-violet-400 text-center">Platinum Partners</h3>
      <div class="flex flex-wrap items-center justify-center gap-6">
        {#each partners.community as p}
          <div class="bg-white/70 backdrop-blur-md border border-violet-500/20 rounded-lg flex items-center justify-center overflow-hidden w-full sm:w-44 md:w-64 h-40">{#if p.logo}<img src={p.logo} alt={p.name} class="w-full h-full object-contain p-2" />{:else}<span class="text-violet-400 font-bold">{p.name}</span>{/if}</div>
        {/each}
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <h3 class="text-2xl font-bold text-gray-300 text-center ">Silver Partners</h3>
      <div class="flex flex-wrap items-center justify-center gap-6">
        {#each partners.silver as p}
          <div class="bg-white/70 backdrop-blur-md border border-gray-500/20 rounded-lg flex items-center justify-center overflow-hidden w-full sm:w-44 md:w-64 h-40">{#if p.logo}<img src={p.logo} alt={p.name} class="w-full h-full object-contain p-2" />{:else}<span class="text-gray-300 font-bold">{p.name}</span>{/if}</div>
        {/each}
      </div>
    </div>

  </div>
</section>
