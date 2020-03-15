<script>
  import App from './App.svelte'
  import CacheDB from './helpers/CacheDB.svelte'
  import AuthContext from './helpers/AuthContext.svelte'
</script>

<CacheDB>
  <AuthContext>
    <App />
  </AuthContext>
</CacheDB>