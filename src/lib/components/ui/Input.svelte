<script lang="ts">
  export let id = '';
  export let value = '';
  export let type = 'text';
  export let placeholder = '';
  export let required = false;
  export let ariaDescribedby = '';
  export let className = '';
  export let name = '';
</script>

<input id={id} name={name} bind:value class={`w-full rounded-lg border border-violet-500/20 bg-slate-700/50 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-violet-500 ${className}`} {type} {placeholder} {required} aria-describedby={ariaDescribedby} />
