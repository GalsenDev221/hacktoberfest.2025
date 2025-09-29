<script lang="ts">
  import Button from './ui/Button.svelte';
  export let talks : { title: string; description: string; date: string; time: string, image: string }[] = [];
</script>

<section id="events" class="py-20 ">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Scheduled Talks</h2>
      <p class="text-xl text-gray-300 max-w-3xl mx-auto">Join our expert speakers for insightful talks on open source development, best practices, and community building.</p>
    </div>

    <div class="flex flex-col gap-12">
      {#each talks as talk}
        <article class="flex max-h-62 rounded-2xl hover:transform hover:scale-101 transition-all">
          <div class="flex flex-1 items-center space-x-4">
            <div class="w-full">
              <h3 class="text-2xl font-bold text-white mb-2">{talk.title}</h3>
              <p class="text-gray-300 mb-4">{talk.description}</p>
              <div class="flex items-center space-x-4 text-sm text-orange-300">
                <span>📅 {talk.date}</span>
                <span>🕒 {talk.time}</span>
              </div>
              <Button className="mt-4" variant="ghost">View Details</Button>
            </div>
          </div>
          <div class="flex-1">

            <img class="rounded-lg h-full w-full" src={talk.image} alt={talk.title} loading="lazy">
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
