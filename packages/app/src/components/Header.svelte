<script>
  import { getContext } from 'svelte'
  import { link, Router } from 'svelte-routing'
  import { ThemeToggle } from 'svelte-themer'
  import NavLink from './NavLink.svelte'
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
      <Router>
        <NavLink to="/">Home</NavLink>
        {#if $isAuthenticated}
          <NavLink to="profile">Profile</NavLink>
          <Button on:click={() => logout()}>Logout</Button>
        {:else}
          <Button on:click={() => login()}>Login</Button>
        {/if}
      </Router>
      <div class="nav--divider"></div>
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

  .nav__container .nav--divider {
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
</style>