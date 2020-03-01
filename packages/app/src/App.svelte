<script>
	import Header from './components/Header.svelte'
	import DataDump from './components/DataDump.svelte'
	import ParkCard from './components/Card/ParkCard.svelte'
	import ThemeWrapper from './components/ThemeWrapper.svelte'
	import { onMount } from 'svelte'
	let parkData = {
		data: []
	}

	onMount(async () => {
		const response = await fetch('/api/mock/parks')
		parkData = await response.json()
	})
</script>

<ThemeWrapper>
	<Header />
	<main>
		<div class="parks">
			{#each parkData.data as park}
				<ParkCard parkData={park} />
			{/each}
		</div>
		<DataDump />
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