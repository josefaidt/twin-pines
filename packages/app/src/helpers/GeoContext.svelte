<script>
  import { onMount, onDestroy } from 'svelte'
	import GeoStore from './geo.store.js'
  let _geoWatch

	onMount(async () => {
		if (navigator.geolocation) {
			const setGeo = p => GeoStore.update(g => 
				({ ...g, latitude: p.coords.latitude, longitude: p.coords.longitude }))
			const settings = {
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: Infinity,
			}
			_geoWatch = navigator.geolocation.watchPosition(setGeo, console.error, settings)
		} else {
			GeoStore.set(false)
		}
	})

	onDestroy(() => {
		if (_geoWatch) {
			navigator.geolocation.clearWatch(_geoWatch)
		}
	})
</script>

<slot>
  <!-- content goes here -->
</slot>