<script>
  import states from '../../data/states-hash.json'
  let stateValue = null
  let _error = false
  let selected = new Map()

  function findState(input) {
    for (let [shortcode, name] of Object.entries(states)) {
      let r = new RegExp(input, 'i')
      if (r.test(shortcode) || r.test(name)) {
        selected = new Map([['shortcode', shortcode], ['name', name]])
        return true
      } else {
        return false
      }
    }
  }

  function validate(e) {
    const { state } = e.target
    if (!stateValue || stateValue.length === 0 || typeof stateValue !== 'string') {
      _error = true
      return false
    } else {
      if (_error) _error = false
      return true
    }
  }

  export async function submit(e) {
    // default behavior
    if (validate(e)) {
      if (!findState(stateValue)) {
        _error = true
      } else {
        console.log('STATE VALUE', selected)
        console.log('ERROR', _error)
        if (findState(stateValue)) {
          const res = await fetch(`/api/parks?stateCode=${selected.get('shortname')}`)
          const data = await res.json()
          console.log('GOT DATA', data)
        }
      }
    } else {
      _error = true
      console.log('ERROR')
    }
  }
</script>

<section>
  <header>
    <h3>Find a Park near you!</h3>
  </header>
  <form 
    on:submit|preventDefault="{submit}"
    on:invalid={validate}
    on:change={validate}
  >
    <div>
      <label for="state">Enter your State</label>
      <div class="input-container">
        <input
          id="state"
          class={_error ? `form--error` : ''}
          aria-label="Enter your State's name or abbreviation"
          type="text"
          placeholder="Louisiana (or LA)"
          bind:value={stateValue}
          autocomplete="off"
        >
        {#if _error}
          <span>Error</span>
        {/if}
      </div>
    </div>
    <div>
      <input type="submit" value="Submit">
    </div>
  </form>
</section>

<style>
  section {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 0.5rem;
    max-width: 25rem;
  }

  header {
    text-align: left;
  }

  form {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 0.5rem;
  }

  form > div {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 0.2rem;

    align-items: center;
    justify-items: flex-start;
  }

  .input-container {
    position: relative;
    width: 100%; 
  }

  input {
    margin: 0;
    width: 100%;
  }

  input[type="submit"] {
    width: initial;
    grid-column-start: 2;
    justify-self: flex-end;
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