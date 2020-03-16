<script>  
  import Header from './Header.svelte'
	import Footer from './Footer.svelte'
</script>

<Header />
<main>
  <slot>
    <!-- children -->
  </slot>
</main>
<Footer />

<style>
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
</style>