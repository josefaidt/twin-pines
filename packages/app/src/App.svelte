<script>
	import List from './components/List.svelte'
	import Header from './components/Header.svelte'
	import DataDump from './components/DataDump.svelte'
</script>

<Header />
<main>
	<DataDump />
</main>

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
</style>