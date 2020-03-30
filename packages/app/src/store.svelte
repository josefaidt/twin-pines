<script>
  import AuthContext from './helpers/AuthContext.svelte'
	import GeoContext from './helpers/GeoContext.svelte'
</script>

<AuthContext>
  <slot></slot>
</AuthContext>