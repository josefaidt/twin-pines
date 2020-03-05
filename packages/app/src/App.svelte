<script>
	import { onMount, onDestroy } from 'svelte'
	import { ThemeWrapper } from 'svelte-themer'
	import DataStore from './helpers/data.store.js'
	import GeoStore from './helpers/geo.store.js'
	import Header from './components/Header.svelte'
	import Footer from './components/Footer.svelte'
	import DataDump from './components/DataDump.svelte'
	import ParkCard from './components/Card/ParkCard.svelte'
	import Form from './components/Form/Form.svelte'
	let parkData = {
		data: []
	}
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
			const _geoWatch = navigator.geolocation.watchPosition(setGeo, console.error, settings)
		} else {
			GeoStore.set(false)
		}
	})
	const unsubscribe = DataStore.subscribe(d => {
		if (d.data) {
			parkData.data = d.data
		}
	})

	onDestroy(() => {
		unsubscribe()
		if (_geoWatch) {
			navigator.geolocation.clearWatch(_geoWatch)
		}
	})
</script>

<ThemeWrapper storageKey="twin-pines__theme">
	<Header />
	<main>
		<pre>{JSON.stringify($GeoStore, null, 2)}</pre>
		<Form />
		<div class="parks">
			{#each parkData.data as park}
				<ParkCard parkData={park} />
			{/each}
		</div>
	</main>
	<Footer />
</ThemeWrapper>

<style>
	:global(body) {
		color: var(--theme-text);
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;

		display: grid;
		grid-auto-flow: row;
		grid-gap: 2rem;
	}

	@media (min-width: 640px) {
		main {
			max-width: 60rem;
		}
	}

	.parks {
		display: grid;
		grid-auto-flow: row;
		grid-gap: 1rem;
	}
</style>