<script>
	import { onMount } from 'svelte'
	import { ThemeWrapper } from 'svelte-themer'
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
</script>

<ThemeWrapper storageKey="twin-pines__theme">
	<Header />
	<main>
		<div class="parks">
			{#each parkData.data as park}
				<ParkCard parkData={park} />
			{/each}
		</div>
		<Form />
	</main>
</ThemeWrapper>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
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