<script>
  import { setContext, onMount, onDestroy } from 'svelte'
  import { writable } from 'svelte/store'
  import merge from 'deepmerge'
  export let contextKey = 'cachedb'
  export let db = 'cachedb'
  export let key = 'svelte-cachedb'
  export let version = 1
  const store = localStorage
  const structure = {
    db,
    version,
  }
  let Store = writable(structure)
  const setStore = () => store.setItem(key, JSON.stringify($Store))
  
  $: if ($Store) setStore()
  $: setContext(contextKey, {
    Store,
  })
  // ALWAYS SET STRUCTURE
  $: if (!$Store.db || !$Store.version) {
    Store.update(s => ({ ...s, ...structure }))
  }

  onMount(() => {
    const raw = store.getItem(key)
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

  onDestroy(() => {
    // write out
    setStore()
  })
</script>

<slot>
  <!-- content goes here -->
</slot>