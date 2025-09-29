<script lang="ts">
  export let id: string = '';
  export let disabled: boolean = false;
  export let checked: boolean = false;
  export let className: string = '';
</script>

<label class={`inline-flex items-center gap-3 ${className}`}>
  <input id={id} type="checkbox" bind:checked disabled={disabled} class="h-5 w-5 rounded border border-violet-500/20 bg-slate-700 text-white focus:ring-violet-500" />
  <slot />
 </label>
