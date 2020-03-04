<script>
  import { setContext, onMount } from 'svelte'
  import { default as store } from './data.store.js'
  setContext('data', DataStore)
</script>

<slot>
  <!-- nested content -->
</slot>