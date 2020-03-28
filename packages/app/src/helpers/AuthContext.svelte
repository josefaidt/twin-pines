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
  $: setContext('auth', { login, logout, isAuthenticated })

  // SET UP USER CONTEXT
  let user = writable({ ...userInfo, ...tpData })
  $: user.update(u => ({ isAuthenticated, isLoading, ...$userInfo, ...$tpData }))
  $: setContext('user', user)

  // SET UP USER QUERIES
  const userQuery = `
    query($id: String!) {
      user(id: $id) {
        _id
        geoEnabled
        isAdmin
      }
    }
  `

  // SET UP BASE QUERY FN WRAPPER
  let query = async ({ token, payload }) => {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    return data
  }

  // OVERWRITE QUERY WITH TOKEN ONCE AVAILABLE
  //  BY DOING SO IT WILL NOT BLOCK THE USER CALL
  $: if ($idToken) {
    query = async ({ payload }) => {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${$idToken}`,
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      return data
    }
  }
  // SET QUERY CLIENT TO CONTEXT FOR CONSUMPTION
  $: setContext('query', query)

  // GET USER DETAILS FROM FAUNA GRAPHQL
  $: if ($idToken && $userInfo && $userInfo.sub) {
    query({ token: $idToken, payload: {
        query: userQuery,
        variables: { id: $userInfo.sub },
      }})
      .then(({ data }) => {
        if (data.user !== null) {
          tpData.set(data.user)
        } else {
          query({ token: $idToken, payload: {
            query: createUserMutation,
            variables: {
              id: $userInfo.sub,
              geoEnabled: false,
              isAdmin: false,
            }
          }})
          .then(({ data }) => {
            tpData.set(data.createUser)
          })
        }
      });
  }
</script>

<!-- <pre>{JSON.stringify(state, null, 2)}</pre> -->
<slot>
  <!-- content -->
</slot>