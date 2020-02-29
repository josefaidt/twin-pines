<script>
  export let title = 'Twin Pines'
</script>

<header>
  <h1>{title}</h1>
  <nav>
    <a href="#">Home</a>
  </nav>
</header>

<style>
  h1 {
		color: #01796f;
		text-transform: uppercase;
		font-size: 4em;
    font-weight: 100;
    margin: 0;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  @media (min-width: 66rem) {
    header {
      max-width: 80%;
      margin: auto;
    }
  }
</style>