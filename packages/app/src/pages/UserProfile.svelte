<script>
  import { getContext } from 'svelte'

  let user = getContext('auth')
</script>

<slot>
  <section>
    <!-- <h1>{$user.name}</h1> -->
    <h1>User Profile</h1>
  </section>
</slot>