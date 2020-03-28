<script>
  import CacheDB from 'svelte-cachedb'
  import AuthContext from './helpers/AuthContext.svelte'
	import GeoContext from './helpers/GeoContext.svelte'
</script>

<CacheDB>
  <AuthContext>
    <slot></slot>
  </AuthContext>
</CacheDB>