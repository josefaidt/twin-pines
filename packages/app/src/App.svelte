<script>
	import { onMount, onDestroy } from 'svelte'
	import { ThemeWrapper } from 'svelte-themer'
	import DataStore from './helpers/data.store.js'
	import GeoStore from './helpers/geo.store.js'
	import GeoContext from './helpers/GeoContext.svelte'
	import Header from './components/Header.svelte'
	import Footer from './components/Footer.svelte'
	import DataDump from './components/DataDump.svelte'
	import ParkCard from './components/Card/ParkCard.svelte'
	import Form from './components/Form/Form.svelte'
	let parkData = {
		data: []
	}
	let locationData = {}

	const unsubscribe = DataStore.subscribe(d => {
		if (d.data) {
			parkData.data = d.data
		}
	})

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

	onDestroy(() => unsubscribe() && unsubscribeFromGeo())
</script>

<GeoContext />
<ThemeWrapper storageKey="twin-pines__theme">
	<Header />
	<main>
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
		position: relative;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		margin-bottom: 3rem;

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