<script lang="ts">
	// using native button for accordion toggles to ensure reliable event handling

	const faqs = [
		{
			question: 'Qu’est-ce que Hacktoberfest ?',
			answer:
				"Hacktoberfest est un mois dédié à la célébration du logiciel open source, organisé par DigitalOcean en partenariat avec GitHub et d'autres entreprises."
		},
		{
			question: 'Faut-il être un développeur expérimenté pour participer ?',
			answer:
				'Non ! Hacktoberfest est ouvert à tous, quel que soit le niveau. C’est une excellente occasion d’apprendre et de contribuer à des projets open source.'
		},
		{
			question: 'Quels types d’événements auront lieu ?',
			answer:
				'Nous organiserons des des talks, des panels, des sessions de réseautage et des séances de codage collaboratif tout au long du mois.'
		}
	];

	let openIndex: number | null = null;

	function toggle(i: number) {
		openIndex = openIndex === i ? null : i;
	}
</script>

<section class="bg-slate-800 py-12 md:py-20">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-8 text-center md:mb-16">
			<h2 class="mb-4 text-3xl font-bold text-white md:mb-6 md:text-4xl">
				Foire aux <span
					class="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent"
					>questions</span
				>
			</h2>
		</div>

		<div class="space-y-4">
			{#each faqs as faq, i}
				<div
					class="overflow-hidden rounded-lg border border-violet-500/20 bg-slate-700/30 backdrop-blur-md"
				>
					<div class="p-4 md:p-6">
						<div class="flex items-center justify-between">
							<h3 class="text-lg font-semibold text-white md:text-xl">{faq.question}</h3>
							<button
								type="button"
								class="ml-4 inline-flex cursor-pointer items-center justify-center rounded-lg border border-violet-500/20 bg-transparent px-3 py-1 font-semibold text-white transition-colors focus:ring-2 focus:ring-violet-500 focus:outline-none"
								on:click={() => toggle(i)}
								aria-expanded={openIndex === i}
								aria-controls={`faq-panel-${i}`}
							>
								{openIndex === i ? '−' : '+'}
							</button>
						</div>
						<div
							id={`faq-panel-${i}`}
							class={`mt-3 leading-relaxed text-gray-300 transition-all duration-200 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}
							aria-hidden={openIndex !== i}
						>
							<p class="pb-2">{faq.answer}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
