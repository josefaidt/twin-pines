<script>
  import { getContext } from 'svelte'
  import { ThemeToggle } from 'svelte-themer'
  import logo from '../img/logo_theme.svg'
  let title = 'Twin Pines'

  const { login, logout, isAuthenticated } = getContext('auth')
  // let login = async () => await $Auth.loginWithRedirect({
  //   redirect_uri: window.location.origin 
  // })
  // console.log('login', $Auth)
</script>

<header>
  <!-- <h1>{title}</h1> -->
  {@html logo}
  <nav>
    <ThemeToggle />
    {#if $isAuthenticated}
      <button on:click={() => logout()}>Logout</button>
    {:else}
      <button on:click={() => login()}>Login</button>
    {/if}
    <!-- <button on:click={login()}>Login</button> -->
  </nav>
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
</style>