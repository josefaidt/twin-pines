<script>
  import { getContext } from 'svelte'
  import Button from '../components/Button.svelte'

  let user = getContext('user')

  let stateValue = null
  let _error = false
  let geoToggleState = null
  let selected = new Map()

  function findState(input) {
    for (let [shortcode, name] of Object.entries(states)) {
      let r = new RegExp(input, 'i')
      if (input.length === 2) {
        if (r.test(shortcode)) {
          console.log(r.test(shortcode), 'found by shortcode', shortcode)
          selected = new Map([['shortcode', shortcode], ['name', name]])
          return true
        }
      } else {
        console.log(r.test(name), 'found by name', name)
        if (r.test(shortcode) || r.test(name)) {
          selected = new Map([['shortcode', shortcode], ['name', name]])
          return true
        } else {
          // do nothing
        }
      }
    }
  }

  function validate(e) {
    const { state } = e.target
    if (!stateValue || stateValue.trim().length === 0 || typeof stateValue !== 'string') {
      _error = true
      return false
    } else {
      if (_error) _error = false
      return true
    }
  }

  const save = () => user.update(u => ({ ...u }))
</script>

<slot>
  <section>
    <!-- <h1>{$user.name}</h1> -->
    <header>
      <img src={$user.picture} alt="profile picture">
      <h1>User Profile</h1>
    </header>
    <div>
      <p>Hello, {$user.nickname}</p>
      <p>Role: {$user.role}</p>
      <p>Verified? {$user.email_verified}</p>
      <p>Geo Enabled? {$user.geoEnabled}</p>
      <form 
        on:submit|preventDefault={save}
        on:invalid={validate}
        on:change={validate}
      >
      <div class="input-container">
        <input
          class={_error ? `form--error` : ''}
          aria-label="Toggle Geo Location access"
          type="text"
          placeholder={$user.geoEnabled ? 1 : 0}
          bind:value={geoToggleState}
          autocomplete="off"
        >
        {#if _error}
          <span>Error</span>
        {/if}
        <div style="justify-content: flex-end; font-size: 90%;">
          <Button type="submit" value="Submit">Submit</Button>
        </div>
      </div>
      </form>
    </div>
  </section>
</slot>

<style>
  section {
    display: grid;
    grid-auto-flow: row;
  }
  @media (min-wdith: 66rem) {
    section {
      grid-auto-flow: column;
    }
  }

  .input-container {
    position: relative;
    width: 100%; 
  }

  input {
    margin: 0;
    width: 100%;
  }

  .form--error {
    border: 1px solid red;
  }

  input + span {
    font-size: 80%;
    position: absolute;
    right: 5%;
    top: 30%;
    color: red;
  }
</style>