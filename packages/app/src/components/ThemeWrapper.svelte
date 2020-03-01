<script>
  import { setContext, onMount } from 'svelte'
  import { writable } from 'svelte/store'
  // setup initial theming
  export let themes = [
    {
      name: 'light',
      colors: {
        primary: '#01796f',
        primary_dark: '#016159',
        secondary: '#562931',
        invert: '#fe8690',
        background: '#f1f1f1',
        text: '#282230',
        accent: '#B5B169',
        shadow: '#AF965F',
      }
    },
    {
      name: 'dark',
      colors: {
        primary: '#01978b',
        primary_dark: '#00887c',
        secondary: '#562931',
        background: '#27323a',
        text: '#f1f1f1',
        accent: '#B5B169',
        shadow: '#435055',
      }
    },
  ]
  // internal state, useful for quickly setting CSS vars without subscribing
  let _current = 0

  let base = {
    colors: {
      base_text: '#282230',
    },
    prefix: 'base',
  }

  let Theme = writable(themes[_current])

  setContext("theme", {
    theme: Theme,
    toggle: () => {
      // update internal state
      _current = _current === themes.length - 1 ? 0 : (_current += 1)
      // update Theme store
      Theme.update(t => themes[_current]);
      // updatte cached theme choice
      localStorage.setItem('__twinpines-theme', _current)
      // update CSS vars
      setRootColors(themes[_current]);
    }
  })



  onMount(() => {
    let storedThemeChoice = localStorage.getItem('__twinpines-theme')
    if (storedThemeChoice) {
      // update Theme store with cached theme choice
      Theme.update(t => themes[parseInt(storedThemeChoice)])
    } else {
      // set default internal state if cached choice does not exist
      localStorage.setItem('__twinpines-theme', _current)
    }
    // set CSS vars on mount
    setRootColors(base)
    setRootColors(themes[_current])
  })

  // sets CSS vars for easy use in components
  // ex: var(--theme-background)
  const setRootColors = theme => {
    for (let [prop, color] of Object.entries(theme.colors)) {
      let varString = `--theme-${prop}`
      if (theme.prefix) {
        varString = `--theme-${theme.prefix}-${prop}`
      }
      document.documentElement.style.setProperty(varString, color);
    }
  }
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