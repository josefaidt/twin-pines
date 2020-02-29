<script>
  import { getContext } from 'svelte'
  export let parkData
  let { theme } = getContext('theme')
</script>

<article class="card card--{theme.name}">
  <h2>{parkData.fullName}</h2>
  <div class="tp--card--park-states__container">
  {#each parkData.states.split(',') as state}
    <span>{state}</span>
  {/each}
  </div>
</article>

<style>
  .card {
    background-color: whitesmoke;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid;
  }

  .card--light {
    color: var(--theme-light_text);
  }
</style>