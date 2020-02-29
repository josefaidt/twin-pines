<script>
  import { onMount } from "svelte";
  export let data

  onMount(async () => {
    const res = await fetch('/api/mock/alerts')
    data = await res.json()
  });
</script>

<pre>
  {JSON.stringify(data, null, 2)}
</pre>