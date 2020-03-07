<script>
  import { getContext } from 'svelte'
  export let parkData
  let { theme } = getContext('theme')
</script>

<article class="card card--{theme.name}">
  <header>
    <h2>{parkData.fullName}</h2>
  </header>
  <section>
    <p>{parkData.description}</p>
  </section>
  <div class="tp--card--park-states__container">
  {#each parkData.states.split(',') as state}
    <span>{state}</span>
  {/each}
  </div>
</article>

<style>
  .card {
    background-color: var(--theme-background);
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid;
  }

  header h1,
  header h2,
  header h3 {
    margin: 0.5rem 0 1rem;
  }

  .card--light {
    color: var(--theme-light_text);
  }
</style>