<script>
  import { getContext } from 'svelte'
  import { link } from 'svelte-routing'
  import { ThemeToggle } from 'svelte-themer'
  import Button from './Button.svelte'
  import logo from '../img/logo_theme.svg'
  let title = 'Twin Pines'

  const { login, logout, isAuthenticated } = getContext('auth')
  const { theme, toggle } = getContext('theme')
  // let login = async () => await $Auth.loginWithRedirect({
  //   redirect_uri: window.location.origin 
  // })
  // console.log('login', $Auth)
</script>

<header>
  <!-- <h1>{title}</h1> -->
  <div class="logo__container">
    {@html logo}
  </div>
  <div class="nav__container">
    <nav>
      <a href="/" use:link>Home</a>
      {#if $isAuthenticated}
        <a href="profile" use:link>Profile</a>
        <Button on:click={() => logout()}>Logout</Button>
      {:else}
        <Button on:click={() => login()}>Login</Button>
      {/if}
      <div class="nav__divider"></div>
      <div class="nav--theme__container">
        <Button on:click={toggle}>{$theme.name}</Button>
      </div>
      <!-- <Button on:click={login()}>Login</Button> -->
    </nav>
  </div>
  <!-- <nav>
    <a href="#">Home</a>
  </nav> -->
</header>

<style>
  h1 {
		color: var(--theme-primary);
		/* text-transform: uppercase; */
		font-size: 4em;
    font-weight: 100;
    margin: 0;

    align-self: flex-start;
  }

  .logo__container {
    width: 20rem;
  }

  .logo__container svg {
    width: 100%;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 66rem) {
    header {
      max-width: 66rem;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .nav__container {
    /* background-color: color(var(--theme-background) blackness(+ 80%)); */
    background-color: color(var(--theme-background) tint(- 80%));
    border-radius: 0.5rem;
  }

  .nav__container .nav__divider {
    width: 2px;
    background-color: var(--theme-text);
    margin: -0.2rem 0;
  }

  .nav--theme__container {
    display: flex;
    justify-content: flex-start;
    min-width: 6rem;
  }

  nav {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 1.5rem;
    font-family: Cabin;
  }

  nav a {
    box-shadow: 
    0.3em 0.3em 0 0 var(--theme-primary),
    inset 0.3em 0.3em 0 0 var(--theme-primary);
    transition: 0.25s;
    cursor: pointer;
    background-color: transparent;
    padding: 0.5rem 1rem;
    color: var(--theme-text);
    text-transform: uppercase;
    text-decoration: none;
    margin-bottom: 0.5em;
    padding: 0.5rem 1rem;
  }

  nav a {
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-top-color: rgb(204, 204, 204);
    border-top-style: solid;
    border-top-width: 1px;
    border-right-color: rgb(204, 204, 204);
    border-right-style: solid;
    border-right-width: 1px;
    border-bottom-color: rgb(204, 204, 204);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-left-color: rgb(204, 204, 204);
    border-left-style: solid;
    border-left-width: 1px;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
    border-radius: 2px;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
  }
  nav a:hover,
  nav a:focus {
    box-shadow: 
      0 0 0 0 var(--theme-primary),
      inset 6em 3.5em 0 0 var(--theme-primary);
    border-color: var(--theme-primary);
    color: var(--theme-background);
  }
</style>