<script>
  import { ThemeToggle } from 'svelte-themer'
  export let title = 'Twin Pines'
</script>

<header>
  <h1>{title}</h1>
  <ThemeToggle />
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
    align-items: center;
  }
  
  @media (min-width: 66rem) {
    header {
      max-width: 66rem;
      margin: auto;
    }
  }
</style>