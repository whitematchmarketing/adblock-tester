<script>
	import { createEventDispatcher } from 'svelte';

  export let id = "";
  export let checked = false;
  export let small = false;
  export let noLabel = false;

  const dispatch = createEventDispatcher();
  function handleChange() {
    dispatch('change', { checked: !checked });
  }
</script>

{#if noLabel}
<div class="switcher" data-small={!!small}>
  <input type="checkbox" checked={checked} on:click={handleChange} id={id} />
  <div class="slider round" />
</div>
{:else}
<label class="switcher" data-small={!!small}>
  <input type="checkbox" checked={checked} on:click={handleChange} id={id} />
  <div class="slider round" />
</label>
{/if}


<style lang="scss">
  .switcher {
    --switcher-height: 1.5rem;
    --switcher-width: calc(var(--switcher-height) * 1.8);
    --switcher-space: 3px;
    --switcher-bullet-height: calc(var(--switcher-height) - (var(--switcher-space) * 2));
  }
  [data-small="true"] {
    --switcher-height: 1.25rem;
    --switcher-space: 2.5px;
  }

  @media (max-width: 768px) {
    .switcher {
      --switcher-height: 1.25rem;
      --switcher-space: 2.5px;
    }

    [data-small="true"] {
      --switcher-height: 1rem;
      --switcher-space: 2px;
    }
  }

  .switcher {
    display: block;
    position: relative;
    z-index: 100;
    width: var(--switcher-width);
    height: var(--switcher-height);
    user-select: none;
    cursor: pointer;
  }

  .switcher input {
    display: none;
  }

  .slider {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--text-color);
    transition: background-color var(--speed-quick) ease;
  }

  .slider:before {
    position: absolute;
    bottom: var(--switcher-space);
    left: var(--switcher-space);
    width: var(--switcher-bullet-height);
    height: var(--switcher-bullet-height);
    background-color: var(--bg-color);
    content: "";
    transition: background-color var(--speed-quick) ease, transform var(--speed-quick) ease;
  }

  input:checked + .slider {
    background-color: var(--color-green);
  }

  input:checked + .slider:before {
    transform: translateX(var(--switcher-bullet-height));
  }

  .slider.round {
    border-radius: var(--switcher-height);
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
