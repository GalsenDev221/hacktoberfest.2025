<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let variant: 'default' | 'ghost' = 'default';
  export let disabled = false;
  export let className = '';
  export let ariaExpanded: boolean | undefined = undefined;
</script>

<button
  {type}
  {disabled}
  aria-expanded={ariaExpanded}
  class={`inline-flex items-center cursor-pointer justify-center rounded-lg px-4 py-2 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${variant === 'ghost' ? 'bg-transparent border border-violet-500/20 text-white' : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white'} ${className}`}
>
  <slot />
</button>
