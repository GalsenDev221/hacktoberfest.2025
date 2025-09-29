<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  export let id = '';
  export let value: string = '';
  export let className = '';
  export let placeholder: string = 'Select...';
  export let items: { value: string; label: string }[] = [];

  const dispatch = createEventDispatcher();

  let open = false;
  let active = -1;

  $: selected = items.find((it) => it.value === value) ?? null;

  function toggle() {
    open = !open;
    if (open) active = items.findIndex((it) => it.value === value);
  }

  function choose(i: number) {
    const it = items[i];
    if (!it) return;
    value = it.value;
    dispatch('change', { value });
    open = false;
  }

  function onKeydown(e: KeyboardEvent) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      open = true;
      active = items.findIndex((it) => it.value === value);
      e.preventDefault();
      return;
    }
    if (!open) return;
    if (e.key === 'ArrowDown') {
      active = Math.min(items.length - 1, active + 1);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      active = Math.max(0, active - 1);
      e.preventDefault();
    } else if (e.key === 'Enter' && active >= 0) {
      choose(active);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      open = false;
      e.preventDefault();
    }
  }

  // close on outside click
  let root: HTMLElement;
  function onDocClick(e: MouseEvent) {
    if (!root) return;
    if (!root.contains(e.target as Node)) open = false;
  }

  onMount(() => {
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  });
</script>

<div bind:this={root} class={`relative ${className}`} on:keydown={onKeydown} role="combobox" tabindex="0" aria-haspopup="listbox" aria-controls={id ? `${id}-list` : undefined} aria-expanded={open}>
  <button type="button" class="w-full text-left rounded-lg border border-violet-500/20 bg-slate-700/50 px-4 py-3 text-white flex items-center justify-between" on:click={toggle} aria-haspopup="listbox" aria-expanded={open} aria-controls={id ? `${id}-list` : undefined}>
    <span>{selected ? selected.label : placeholder}</span>
    <svg class="ml-2 h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>

  {#if open}
    <ul id={id ? `${id}-list` : undefined} role="listbox" tabindex="-1" class="absolute z-20 mt-2 w-full rounded-lg bg-slate-800 border border-violet-500/20 max-h-56 overflow-auto">
      {#each items as it, idx}
        <li role="option" aria-selected={value === it.value} class={`${active === idx ? 'bg-slate-700/50' : ''}`}>
          <button type="button" class="w-full text-left px-4 py-3 cursor-pointer text-white hover:bg-slate-700/50" on:click={() => choose(idx)} on:mouseenter={() => (active = idx)}>
            {it.label}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
