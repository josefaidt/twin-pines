<script>
  import { onMount, setContext, getContext } from 'svelte'
  import { createAuth } from './auth.store';

  // Go to Auth0 to get the values and set everything up.
  // Make sure all callback urls are set correctly.
  const config = {
    domain: process.env.AUTH0_DOMAIN,
    client_id: process.env.AUTH0_CLIENT_ID,
    // audience: 'https://twin-pines.now.sh'
  };

  const {
    isLoading,
    isAuthenticated,
    login,
    logout,
    authToken,
    authError,
    userInfo
  } = createAuth(config);

  $: state = {
    isLoading: $isLoading,
    isAuthenticated: $isAuthenticated,
    authError: $authError,
    userInfo: $userInfo ? $userInfo.name : null,
    authToken: $authToken.slice(0, 20)
  };

  $: setContext('auth', { login, logout, isAuthenticated })
</script>

<pre>{JSON.stringify(state, null, 2)}</pre>
<slot>
  <!-- content -->
</slot>