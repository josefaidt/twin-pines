<script>
	import { onMount, onDestroy } from 'svelte'
	import { ThemeWrapper } from 'svelte-themer'
	import DataStore from './helpers/data.store.js'
	import Header from './components/Header.svelte'
	import DataDump from './components/DataDump.svelte'
	import ParkCard from './components/Card/ParkCard.svelte'
	import Form from './components/Form/Form.svelte'
	let parkData = {
		data: []
	}

	// onMount(async () => {
	// 	const response = await fetch('/api/mock/parks')
	// 	parkData = await response.json()
	// })
	const unsubscribe = DataStore.subscribe(d => {
		if (d.data) {
			parkData.data = d.data
		}
	})

	onDestroy(unsubscribe)
</script>

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