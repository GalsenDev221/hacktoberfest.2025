<script lang="ts">
	import { onMount } from 'svelte';

	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Countdown from '$lib/components/Countdown.svelte';
	// import RegistrationForm from '$lib/components/RegistrationForm.svelte';
	import Talks from '$lib/components/Talks.svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import Partners from '$lib/components/Partners.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PartnerForm from '$lib/components/PartnerForm.svelte';

	const targetDate = new Date('2025-10-25T00:00:00').getTime();

	const talks = [
		{
			title: 'Hack Session 01',
			description:
				'Comprendre l’esprit du Hacktoberfest et apprendre à contribuer à un projet open source de manière simple et efficace.',
			date: 'October 18, 2025',
			time: '16:00 GMT',
			image: 'speakers/@daoodaba975.png',
			name: 'Daouda BA',
			bio: 'Développeur Full Stack, Lead @ Galsen DEV & Open Source Enthusiast.'
		},
		{
			title: 'Hack Session 02',
			description:
				'Comprendre l’esprit du Hacktoberfest et apprendre à contribuer à un projet open source de manière simple et efficace.',
			date: 'October 19, 2025',
			time: '15:00 GMT',
			image: 'speakers/@bakemono.png',
			name: 'Mouhamadou Moustapha DIAGNE',
			bio: 'Développeur Full Stack & Tech Manager @ Galsen DEV.'
		}
	];

	const partners = [
		{
			name: 'JetBrains',
			logo: 'partners/jetbrains.png'
		},
		{
			name: 'Université Cheikh-Anta-Diop',
			logo: 'partners/ucad.png'
		}
	];
</script>

<svelte:head>
	<title>Hacktoberfest 2025 - Galsen DEV</title>
	<meta
		name="description"
		content="Rejoignez Galsen DEV pour Hacktoberfest 2025 - Un mois dédié à la célébration de l'open source"
	/>
</svelte:head>

<Nav siteName="Hacktoberfest 2025" />

<main class="container mx-auto flex flex-col gap-20 md:pt-24 lg:mt-16">
	<Hero title="Hacktoberfest" year="2025" />
	<Countdown target={targetDate} />

	<section class="rounded-xl bg-slate-800 py-20" id="register">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-6 text-4xl font-bold text-white md:text-5xl">
					Inscrivez-vous à <span
						class="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent"
						>Hacktoberfest 2025</span
					>
				</h2>
				<p class="mx-auto max-w-3xl text-xl text-gray-300">
					Rejoignez-nous pour célébrer la cinquième édition du Hacktoberfest 2025. <br /> Inscrivez-vous
					dès maintenant pour commencer votre aventure.
				</p>
			</div>

			<div class="flex flex-col items-center">
				<a
					href="https://luma.com/3icfjnbc"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-block rounded-lg bg-purple-600 px-8 py-4 text-xl font-semibold text-white shadow-lg transition hover:bg-purple-700"
				>
					S'inscrire maintenant
				</a>
			</div>
		</div>
	</section>

	<Talks {talks} />
	<FAQ />
	<Partners {partners} />
	<PartnerForm />
	<!-- on:partnerRequest={(e) => console.log('Partner request:', e.detail)} -->

	<Footer />
</main>
