<script lang="ts">
	import Button from './ui/Button.svelte';
	export let talks: {
		title: string;
		description: string;
		date: string;
		time: string;
		image: string;
		name: string;
		bio: string;
	}[] = [];
</script>

<section id="program" class="py-12 md:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-bold text-white md:text-5xl">Le programme</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-300">
				Rejoignez nos intervenants pour des talks inspirants sur le développement et l’open source,
				et bien plus encore.
			</p>
		</div>

		<div class="flex flex-col gap-8">
			{#each talks as talk}
				<article
					class="flex flex-col items-center gap-6 rounded-2xl bg-slate-800/40 p-6 transition-transform hover:scale-105 md:flex-row md:items-start"
				>
					<div class="flex-1">
						<h3 class="mb-2 text-xl font-bold text-white md:text-2xl">{talk.title}</h3>
						<p class="mb-4 text-sm text-gray-300 md:text-base">{talk.description}</p>
						<div class="flex flex-wrap items-center gap-4 text-sm text-orange-300">
							<span class="flex items-center gap-2">📅 <span>{talk.date}</span></span>
							<span class="flex items-center gap-2">🕒 <span>{talk.time}</span></span>
						</div>
						<h2 class="mt-4 text-xl font-bold text-white md:text-xl">{talk.name}</h2>
						<p class="my-2 text-sm text-gray-300 md:text-base">{talk.bio}</p>
					</div>

					<div class="w-full flex-shrink-0 md:w-48">
						<img
							class="h-48 w-full rounded-lg object-cover md:h-48"
							src={talk.image}
							alt={talk.title}
							loading="lazy"
						/>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
