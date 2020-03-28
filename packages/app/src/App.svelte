<script>
	import { onMount, onDestroy, getContext } from 'svelte'
	import { Router, Route, Link } from 'svelte-routing'
	import { ThemeWrapper } from 'svelte-themer'
	import { themes } from './themes.js'
	import Layout from './components/Layout.svelte'
	import HomePage from './pages/index.svelte'
	import UserProfile from './pages/UserProfile.svelte'

	export let url = ""
</script>

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