<script>
	import List from './List.svelte'
	export let name;
</script>

<main>
	<h1>Twin Pines</h1>
	<p>asdfasdfasdfasdfasdfsfa</p>
	<List />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: 60rem;
		}
	}
</style>