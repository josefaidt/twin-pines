<script>
  import { getContext } from 'svelte'
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
      <Button on:click={toggle}>{$theme.name}</Button>
      {#if $isAuthenticated}
        <Button on:click={() => logout()}>Logout</Button>
      {:else}
        <Button on:click={() => login()}>Login</Button>
      {/if}
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

  nav {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 1.5rem;
    font-family: Cabin;
  }
</style>