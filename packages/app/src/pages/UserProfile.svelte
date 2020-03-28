<script>
  import { getContext } from 'svelte'

  let user = getContext('user')
</script>

<slot>
  <section>
    <!-- <h1>{$user.name}</h1> -->
    <header>
      <h1>User Profile</h1>
    </header>
    <div>
      <p>Hello, {$user.nickname}</p>
      <p>Verified? {$user.email_verified}</p>
      <p>Geo Enabled? {$user.geoEnabled}</p>
      <img src={$user.picture} alt="profile picture">
    </div>
  </section>
</slot>