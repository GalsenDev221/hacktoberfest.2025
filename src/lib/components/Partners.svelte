<script lang="ts">
	export let partners: {
		name: string;
		logo: string;
	}[] = [];
</script>

<section id="partners" class="py-12 md:py-20">
	<div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
		<div class="mb-8 text-center md:mb-16">
			<h2 class="mb-4 text-3xl font-bold text-white md:mb-6 md:text-4xl">Nos partenaires</h2>
			<p class="mx-auto max-w-3xl text-base text-gray-300 md:text-xl">
				Merci à nos partenaires pour cette édition 2025.
			</p>
		</div>

		<div class="flex flex-col gap-4">
			<div class="flex flex-wrap items-center justify-center gap-6">
				{#each partners as partner}
					<div
						class="flex h-40 w-full items-center justify-center overflow-hidden rounded-lg border border-yellow-500/20 bg-white/70 backdrop-blur-md sm:w-44 md:w-64"
					>
						{#if partner.logo}<img
								src={partner.logo}
								alt={partner.name}
								class="h-full w-full object-contain p-2"
							/>{:else}<span class="font-bold text-yellow-400">{partner.name}</span>{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
