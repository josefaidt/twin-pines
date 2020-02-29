<script>
  import { setContext, onMount } from 'svelte'
  export let themes = []
  let _current = 0

  let base = {
    colors: {
      base_text: '#311D2A',
    },
    prefix: 'base',
  }
  themes = [
    {
      name: 'light',
      colors: {
        background: '#f1f1f1',
        text: '#311D2A',
      }
    },
    {
      name: 'dark',
      colors: {
        background: '#311D2A',
        text: '#f1f1f1',
      }
    },
  ]

  setContext("theme", {
    theme: themes[_current],
    toggle: () => {
      _current = _current === themes.length - 1 ? 0 : (_current += 1);
      setRootColors(themes[_current]);
    }
  });

  onMount(() => {
    setRootColors(base)
    setRootColors(themes[_current]);
  });

  const setRootColors = theme => {
    for (let [prop, color] of Object.entries(theme.colors)) {
      let varString = `--theme-${prop}`
      if (theme.prefix) {
        varString = `--theme-${theme.prefix}-${prop}`
      }
      document.documentElement.style.setProperty(varString, color);
    }
  };
</script>

<style>
  :global(html) {
    background-color: var(--theme-background);
    color: var(--theme-text);
  }
</style>

<slot>
  <!-- children -->
</slot>