<script>
</script>

<button on:click>
  <slot>
  </slot>
</button>

<style>
  button {
    box-shadow: 
    0.3em 0.3em 0 0 var(--theme-primary),
    inset 0.3em 0.3em 0 0 var(--theme-primary);
    transition: 0.25s;
    cursor: pointer;
    background-color: transparent;
    padding: 0.5rem 1rem;
    color: var(--theme-text);
    text-transform: uppercase;
  }
  button:hover,
  button:focus {
    box-shadow: 
      0 0 0 0 var(--theme-primary),
      inset 6em 3.5em 0 0 var(--theme-primary);
    border-color: var(--theme-primary);
    color: var(--theme-background);
  }
</style>