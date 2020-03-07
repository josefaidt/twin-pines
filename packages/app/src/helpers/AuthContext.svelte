<script>
  import { onMount, setContext, getContext } from 'svelte'
  import { writable, readable } from 'svelte/store'
  import createAuth0Client from '@auth0/auth0-spa-js'
  // const _auth = {
  //   login: async () => await $Auth.loginWithRedirect({
  //           redirect_uri: window.location.origin
  //         }),
  // }

  const setup = async set => {
    set(
      await createAuth0Client({
        domain: process.env.AUTH0_DOMAIN,
        client_id: process.env.AUTH0_CLIENT_ID,
        redirect_uri: window.location.origin,
      })
    )
    return () => {}
  }

  let authState = readable(null, setup)
  // onMount(async () => {})
  
  setContext('auth', {
    Auth: $authState,
    login: async () => {}
  })
</script>

<slot>
  <!-- content -->
</slot>