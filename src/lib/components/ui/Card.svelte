<script lang="ts">
  export let className = '';
</script>

<div class={`rounded-2xl border border-violet-500/20 p-6 bg-gradient-to-r from-violet-900/6 to-purple-900/6 ${className}`}>
  <slot />
</div>
