<script lang="ts">
  // using native button for accordion toggles to ensure reliable event handling

  const faqs = [
    { question: 'What is Hacktoberfest?', answer: "Hacktoberfest is a month-long celebration of open source software run by DigitalOcean in partnership with GitHub and other companies." },
    { question: 'Do I need to be experienced developer to take Part?', answer: "No! Hacktoberfest is open to everyone, regardless of skill level. It's a great opportunity to learn and contribute to open source projects." },
    { question: 'What type of events will take place next?', answer: "We'll have workshops, talks, networking sessions, and collaborative coding sessions throughout the month." }
  ];

  let openIndex: number | null = null;

  function toggle(i: number) {
    openIndex = openIndex === i ? null : i;
  }
</script>

<section class="py-12 md:py-20 bg-slate-800">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-8 md:mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">Frequently Asked <span class="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">Questions</span></h2>
    </div>

    <div class="space-y-4">
      {#each faqs as faq, i}
        <div class="bg-slate-700/30 backdrop-blur-md border border-violet-500/20 rounded-lg overflow-hidden">
          <div class="p-4 md:p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-lg md:text-xl font-semibold text-white">{faq.question}</h3>
              <button
                type="button"
                class="ml-4 cursor-pointer inline-flex items-center justify-center rounded-lg px-3 py-1 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 bg-transparent border border-violet-500/20 text-white"
                on:click={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-panel-${i}`}
              >
                {openIndex === i ? '−' : '+'}
              </button>
            </div>
            <div id={`faq-panel-${i}`} class={`mt-3 text-gray-300 leading-relaxed transition-all duration-200 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`} aria-hidden={openIndex !== i}>
              <p class="pb-2">{faq.answer}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
