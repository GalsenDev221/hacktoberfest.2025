<script lang="ts">
  export let id = '';
  export let value = '';
  export let placeholder = '';
  export let rows = 4;
  export let className = '';
</script>

<textarea id={id} bind:value rows={rows} class={`w-full rounded-lg border border-violet-500/20 bg-slate-700/50 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-violet-500 ${className}`} placeholder={placeholder}></textarea>
