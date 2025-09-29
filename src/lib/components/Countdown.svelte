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
    hours = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
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

<div class=" text-center flex flex-col gap-12 py-12">
  <h2 class="text-3xl font-bold text-white">Countdown to Hacktoberfest</h2>
  <div class="flex   justify-center gap-4 md:gap-8">
    <div class="flex flex-col gap-2 items-center justify-center backdrop-blur-md border border-violet-500/20 rounded-lg p-4 md:p-6 min-w-[80px] md:w-full ">
      <div class="text-3xl md:text-5xl font-bold text-violet-400">{days}</div>
      <div class="text-gray-400 text-sm md:text-base">Days</div>
    </div>
    <div class="flex flex-col gap-2 items-center justify-center backdrop-blur-md border border-violet-500/20 rounded-lg p-4 md:p-6 min-w-[80px] md:w-full ">
      <div class="text-3xl md:text-5xl font-bold text-violet-400">{hours}</div>
      <div class="text-gray-400 text-sm md:text-base">Hours</div>
    </div>
    <div class="flex flex-col gap-2 items-center justify-center backdrop-blur-md border border-violet-500/20 rounded-lg p-4 md:p-6 min-w-[80px] md:w-full ">
      <div class="text-3xl md:text-5xl font-bold text-violet-400">{minutes}</div>
      <div class="text-gray-400 text-sm md:text-base">Minutes</div>
    </div>
    <div class="flex flex-col gap-2 items-center justify-center backdrop-blur-md border border-violet-500/20 rounded-lg p-4 md:p-6 min-w-[80px] md:w-full ">
      <div class="text-3xl md:text-5xl font-bold text-violet-400">{seconds}</div>
      <div class="text-gray-400 text-sm md:text-base">Seconds</div>
    </div>
  </div>
</div>
