<script>
  import { setContext, onMount, onDestroy } from 'svelte'
  import { writable } from 'svelte/store'
  import merge from 'deepmerge'
  export let db = 'twin-pines'
  export let key = 'tpdb'
  export let version = 1
  const store = localStorage
  const structure = {
    db,
    version,
    settings: {
      geoEnabled: false,
    }
  }
  let Store = writable(structure)
  const setStore = () => store.setItem(key, JSON.stringify($Store))

  const toggleGeo = bool => {
    Store.update(s => merge(s, { settings: { geoEnabled: bool || !s.settings.geoEnabled }}))
    setStore()
    // Store.update(s => ({ ...s, geoEnabled: bool || !s.geoEnabled }))
  }

  onMount(() => {
    const raw = store.getItem('tpdb')
    if (raw) {
      let parsed
      try {
        parsed = JSON.parse(raw)
      } catch(e) {
        // womp womp
      } finally {
        if (!parsed.version) {
          console.warn('Error parsing DB version')
          setStore()
        } else {
          Store.set(parsed)
        }
      }
    } else {
      setStore()
    }
  })

  setContext('user', {
    Store,
    toggleGeo,
  })

  onDestroy(() => {
    // write out
    setStore()
  })
</script>

<slot>
  <!-- content goes here -->
</slot>