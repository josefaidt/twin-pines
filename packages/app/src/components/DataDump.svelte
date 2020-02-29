<script>
  import { onMount } from "svelte";
  export let data


  onMount(async () => {
    const res = await fetch('/api/mock/parks')
    data = await res.json()
  });
</script>

<pre>
  {JSON.stringify(data, null, 2)}
</pre>

<style>
  pre {
    padding: 0.5rem;
    max-width: 100%;
    background-color: whitesmoke;
    white-space: pre-wrap;    
    text-align: left;
  }
</style>