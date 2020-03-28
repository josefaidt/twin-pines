<script>
  import { onMount, setContext, getContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { createAuth } from './auth.store';

  // Go to Auth0 to get the values and set everything up.
  // Make sure all callback urls are set correctly.
  const config = {
    domain: 'twin-pines.auth0.com',
    client_id: process.env.AUTH_CLIENT_ID,
    // audience: 'https://twin-pines.now.sh'
  };

  const {
    isLoading,
    isAuthenticated,
    login,
    logout,
    authToken,
    idToken,
    authError,
    userInfo
  } = createAuth(config);

  let tpData = writable({})

  $: state = {
    isLoading: $isLoading,
    isAuthenticated: $isAuthenticated,
    authError: $authError,
    userInfo: $userInfo ? $userInfo.name : null,
    authToken: $authToken.slice(0, 20)
  };

  let user = writable({ ...userInfo, ...tpData })

  $: setContext('auth', { login, logout, isAuthenticated, userInfo, tpData })
  $: user.update(u => ({ ...$userInfo, ...$tpData }))
  $: setContext('user', user)

  const userQuery = `
    query($id: String!) {
      user(id: $id) {
        geoEnabled
        isAdmin
      }
    }
  `

  $: if ($idToken && $userInfo && $userInfo.sub) {
    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${$idToken}`,
      },
      body: JSON.stringify({
        query: userQuery,
        variables: { id: $userInfo.sub },
      })
    })
      .then(r => r.json())
      .then(({ data }) => tpData.set(data.user));
  }
</script>

<!-- <pre>{JSON.stringify(state, null, 2)}</pre> -->
<slot>
  <!-- content -->
</slot>