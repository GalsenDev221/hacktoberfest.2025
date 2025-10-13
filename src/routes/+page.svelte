<script lang="ts">
	import { onMount } from 'svelte';

	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Countdown from '$lib/components/Countdown.svelte';
	import RegistrationForm from '$lib/components/RegistrationForm.svelte';
	import Talks from '$lib/components/Talks.svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import Partners from '$lib/components/Partners.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PartnerForm from '$lib/components/PartnerForm.svelte';

	const targetDate = new Date('2025-10-25T00:00:00').getTime();

	const talks = [
		{
			title: 'Introduction to Open Source',
			description:
				'Learn the fundamentals of open source development, how to find projects to contribute to, and make your first pull request.',
			date: 'October 5, 205',
			time: '2:00 PM GMT',
			image:
				'https://thumbs.dreamstime.com/b/arrosez-l-%C3%A9claboussure-dans-la-forme-de-couronne-et-baisse-en-avec-image-terre-goutte-pluie-bleue-eau-%C3%A9claboussent-140453719.jpg'
		},
		{
			title: 'Advanced Git Techniques',
			description:
				'Master advanced Git workflows, learn about rebasing, squashing commits, and collaborating effectively with teams.',
			date: 'October 12, 205',
			time: '3:00 PM GMT',
			image:
				'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
		}
	];

	const partners = {
		gold: [
			{
				name: 'Socium',
				logo: 'https://waya.media/wp-content/uploads/sites/3/2024/11/Senegals-HRtech-Startup-Socium-Secures-USD-5-M-Seed-Funding-1024x576.png'
			},
			{
				name: 'Senegal Bitcoin',
				logo: 'https://www.cointribune.com/app/uploads/2022/10/removebg-preview.png'
			},
			{
				name: 'Socium',
				logo: 'https://waya.media/wp-content/uploads/sites/3/2024/11/Senegals-HRtech-Startup-Socium-Secures-USD-5-M-Seed-Funding-1024x576.png'
			},
			{
				name: 'Senegal Bitcoin',
				logo: 'https://www.cointribune.com/app/uploads/2022/10/removebg-preview.png'
			}
		],
		silver: [
			{
				name: 'Galsen AI',
				logo: 'https://galsen.ai/wp-content/uploads/2023/05/android-chrome-512x512-1-2.png'
			},
			{
				name: 'Xarala',
				logo: 'https://www.xarala.co/assets/images/logo.jpg'
			},
		],
		community: [
			{
				name: 'jetBrains',
				logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/08/JetBrains_beam_logo.svg/2048px-JetBrains_beam_logo.svg.png'
			},
			{
				name: 'GitHub',
				logo: 'https://pngimg.com/d/github_PNG23.png'
			},
			{
				name: 'jetBrains',
				logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/08/JetBrains_beam_logo.svg/2048px-JetBrains_beam_logo.svg.png'
			},
		]
	};
</script>

<svelte:head>
	<title>Hacktoberfest 205 - GalsenDev</title>
	<meta
		name="description"
		content="Join GalsenDev for Hacktoberfest 205 - A month-long celebration of open source software"
	/>
</svelte:head>

<Nav siteName="GalsenDev" />

<main class="container mx-auto lg:mt-16 flex flex-col gap-20 md:pt-24">
	<Hero title="Hacktoberfest" year="2025" />
	<Countdown target={targetDate} />

	<section class="rounded-xl bg-slate-800 py-20" id="register">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-16 text-center">
				<h2 class="mb-6 text-4xl font-bold text-white md:text-5xl">
					Register for <span
						class="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent"
						>Hacktoberfest 2025</span
					>
				</h2>
				<p class="mx-auto max-w-3xl text-xl text-gray-300">
					Join thousands of developers worldwide in contributing to open source projects. Register
					now to get started on your Hacktoberfest journey.
				</p>
			</div>

			<div class="flex flex-col items-center">

				<a
				href="https://luma.com/3icfjnbc"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-block rounded-lg bg-purple-600 px-8 py-4 text-xl font-semibold text-white shadow-lg transition hover:bg-purple-700"
				>
				Register Now
			</a>
		</div>
		</div>
	</section>

	<Talks {talks} />
	<FAQ />
	<Partners {partners} />
	<PartnerForm on:partnerRequest={(e) => console.log('Partner request:', e.detail)} />

	<Footer />
</main>
