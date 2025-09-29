<script lang="ts">
  export let forId = '';
  export let className = '';
</script>

<label for={forId} class={`mb-2 block text-sm font-medium text-gray-300 ${className}`}><slot /></label>
