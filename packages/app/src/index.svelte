<script>
  import { onDestroy, setContext, getContext } from 'svelte'
  import App from './App.svelte'
  import Store from './store.svelte'
</script>

<Store>
  <App />
</Store>