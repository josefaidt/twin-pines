<script>
  import { onDestroy, setContext } from 'svelte'
  import App from './App.svelte'
  import CacheDB from './helpers/CacheDB.svelte'
  import AuthContext from './helpers/AuthContext.svelte'
  import GeoStore from './helpers/geo.store.js'
	import GeoContext from './helpers/GeoContext.svelte'
  import SettingsContext from './helpers/SettingsContext.svelte'
	import Settings from './helpers/settings.store.js'
  
  // prevent geo multiple calls
	let _geoCalled = false
	const unsubscribeFromGeo = GeoStore.subscribe(async g => {
		if (g.longitude && g.latitude && !_geoCalled) {
			_geoCalled = true
			const res = await fetch(`/api/service/reverse-geocode?longitude=${g.longitude}&latitude=${g.latitude}`)
			const data = await res.json()
			if (data.error) {
				console.warn('Reverse Geocode has failed')
			}
			locationData = data
		}
  })

  onDestroy(() => unsubscribeFromGeo())
</script>

<CacheDB>
  <AuthContext>
    <SettingsContext>
      {#if $Settings.geo}
        <GeoContext />
      {/if}
      <App />
    </SettingsContext>
  </AuthContext>
</CacheDB>