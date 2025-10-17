<script lang="ts">
	import { onMount } from 'svelte';

	export let target: number;

	let days = '120';
	let hours = '00';
	let minutes = '00';
	let seconds = '00';

	const update = () => {
		if (!target) return;
		const now = Date.now();
		const distance = target - now;
		if (distance <= 0) {
			days = hours = minutes = seconds = '00';
			return;
		}
		days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
		hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(
			2,
			'0'
		);
		minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
		seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
	};

	let interval: number | undefined;
	onMount(() => {
		update();
		interval = setInterval(update, 1000) as unknown as number;
		return () => clearInterval(interval);
	});
</script>

<div class=" flex flex-col gap-8 py-8 text-center md:py-12">
	<h2 class="text-2xl font-bold text-white md:text-3xl">Compte à rebours avant le jour-j ⏳</h2>
	<div class="flex flex-wrap justify-center gap-4 md:gap-8">
		<div
			class="flex min-w-[72px] flex-col items-center justify-center gap-2 rounded-lg border border-violet-500/20 p-4 backdrop-blur-md md:w-auto md:p-6"
		>
			<div class="text-3xl font-bold text-violet-400 md:text-5xl">{days}</div>
			<div class="text-sm text-gray-400 md:text-base">Jours</div>
		</div>
		<div
			class="flex min-w-[72px] flex-col items-center justify-center gap-2 rounded-lg border border-violet-500/20 p-4 backdrop-blur-md sm:min-w-[80px] md:w-auto md:p-6"
		>
			<div class="text-3xl font-bold text-violet-400 md:text-5xl">{hours}</div>
			<div class="text-sm text-gray-400 md:text-base">Heures</div>
		</div>
		<div
			class="flex min-w-[72px] flex-col items-center justify-center gap-2 rounded-lg border border-violet-500/20 p-4 backdrop-blur-md sm:min-w-[80px] md:w-auto md:p-6"
		>
			<div class="text-3xl font-bold text-violet-400 md:text-5xl">{minutes}</div>
			<div class="text-sm text-gray-400 md:text-base">Minutes</div>
		</div>
		<div
			class="flex min-w-[72px] flex-col items-center justify-center gap-2 rounded-lg border border-violet-500/20 p-4 backdrop-blur-md sm:min-w-[80px] md:w-auto md:p-6"
		>
			<div class="text-3xl font-bold text-violet-400 md:text-5xl">{seconds}</div>
			<div class="text-sm text-gray-400 md:text-base">Secondes</div>
		</div>
	</div>
</div>
