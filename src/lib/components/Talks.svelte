<script lang="ts">
  import Button from './ui/Button.svelte';
  export let talks : { title: string; description: string; date: string; time: string, image: string }[] = [];
</script>

<section id="events" class="py-12 md:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Scheduled Talks</h2>
      <p class="text-xl text-gray-300 max-w-3xl mx-auto">Join our expert speakers for insightful talks on open source development, best practices, and community building.</p>
    </div>

    <div class="flex flex-col gap-8">
      {#each talks as talk}
        <article class="flex flex-col md:flex-row items-center md:items-start gap-6 bg-slate-800/40 p-6 rounded-2xl hover:scale-105 transition-transform">
          <div class="flex-1">
            <h3 class="text-xl md:text-2xl font-bold text-white mb-2">{talk.title}</h3>
            <p class="text-sm md:text-base text-gray-300 mb-4">{talk.description}</p>
            <div class="flex flex-wrap items-center gap-4 text-sm text-orange-300">
              <span class="flex items-center gap-2">📅 <span>{talk.date}</span></span>
              <span class="flex items-center gap-2">🕒 <span>{talk.time}</span></span>
            </div>
          </div>

          <div class="w-full md:w-48 flex-shrink-0">
            <img class="rounded-lg w-full h-48 md:h-48 object-cover" src={talk.image} alt={talk.title} loading="lazy" />
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
