<script>
  import Form from '../components/Form/Form.svelte'
  import ParkCard from '../components/Card/ParkCard.svelte'
  import DataStore from '../helpers/data.store.js'
</script>

<slot>
  <Form />
  <div class="parks">
  {#if $DataStore.data}
    {#each $DataStore.data as park}
      <ParkCard parkData={park} />
    {/each}
  {/if}
  </div>
</slot>

<style>
  .parks {
		display: grid;
		grid-auto-flow: row;
		grid-gap: 1rem;
	}
</style>