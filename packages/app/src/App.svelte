<script>
	import { onMount, onDestroy, getContext } from 'svelte'
	import { Router, Route } from 'svelte-routing'
	import { ThemeWrapper } from 'svelte-themer'
	import { themes } from './themes.js'
	import Layout from './components/Layout.svelte'
	import HomePage from './pages/index.svelte'

	export let url = ""
</script>

<ThemeWrapper themes={themes} storageKey="twin-pines__theme">
	<Layout>
		<Router url={url}>
			<Route path="/"><HomePage /></Route>
		</Router>
	</Layout>
</ThemeWrapper>

<style>
	:global(body) {
		color: var(--theme-text);
		position: relative;
	}

	.parks {
		display: grid;
		grid-auto-flow: row;
		grid-gap: 1rem;
	}
</style>