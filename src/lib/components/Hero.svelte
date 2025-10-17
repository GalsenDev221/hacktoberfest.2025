<script lang="ts">
	export let title = 'Hacktoberfest';
	export let year = '2025';
</script>

<section
	id="about"
	class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 md:rounded-xl"
>
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
		<div class="text-center">
			<h1 class="mb-4 text-4xl font-bold text-white md:mb-6 md:text-6xl lg:text-8xl">
				{title}
				<span class="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent"
					>{year}</span
				>
			</h1>
			<p
				class="mx-auto mb-6 max-w-3xl text-base leading-relaxed text-gray-300 md:mb-8 md:text-xl lg:text-2xl"
			>
				Rejoignez Galsen DEV pour une journée de célébration de l’open source. Que vous soyez
				développeur expérimenté ou débutant, cet événement est fait pour vous.
			</p>
			<div class="mb-12 flex justify-center">
				<a
					href="#register"
					class="transform cursor-pointer rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:from-violet-600 hover:to-purple-700"
				>
					Rejoignez le mouvement
				</a>
			</div>
		</div>
	</div>
</section>
