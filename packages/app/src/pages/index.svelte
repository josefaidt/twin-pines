<script>
  import Form from '../components/Form/Form.svelte'
</script>

<slot>
  <Form />
  <div class="parks">
    <!-- {#each parkData.data as park}
      <ParkCard parkData={park} />
    {/each} -->
  </div>
</slot>