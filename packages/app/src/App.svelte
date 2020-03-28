<script>
	import { onMount, onDestroy, getContext } from 'svelte'
	import { Router, Route, Link } from 'svelte-routing'
	import { ThemeWrapper } from 'svelte-themer'
	import GeoContext from './helpers/GeoContext.svelte'
	import GeoStore from './helpers/geo.store.js'
	import { themes } from './themes.js'
	import Layout from './components/Layout.svelte'
	import HomePage from './pages/index.svelte'
	import UserProfile from './pages/UserProfile.svelte'

	export let url = ""

	const user = getContext('user')
	
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

{#if $user && $user.geoEnabled}
	<GeoContext />
{/if}
<ThemeWrapper themes={themes} storageKey="twin-pines__theme">
	<Layout>
		<Router basepath="/" url={url}>
			<Route path="/"><HomePage /></Route>
			<Route path="/profile"><UserProfile /></Route>
		</Router>
	</Layout>
</ThemeWrapper>

<style>
	:global(body) {
		color: var(--theme-text);
		position: relative;
	}
</style>