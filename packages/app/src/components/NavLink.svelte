<script>
  import { Link } from 'svelte-routing'

  export let ref = 'tp--link'
  export let to = ''

  const getProps = ({ location, href, isPartiallyCurrent, isCurrent }) => {
    const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent

    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { ref, class: "tp--link active" }
    }
    return { ref, class: "tp--link" }
  }
</script>

<Link to={to} getProps={getProps}>
  <slot />
</Link>

<style>
  :global([ref="tp--link"]),
  :global([ref="tp--link"]):visited {
    box-shadow: 
    0.3em 0.3em 0 0 var(--theme-primary),
    inset 0.3em 0.3em 0 0 var(--theme-primary);
    transition: 0.25s;
    cursor: pointer;
    background-color: transparent;
    padding: 0.5rem 1rem;
    color: var(--theme-text);
    text-transform: uppercase;
    text-decoration: none;
    margin-bottom: 0.5em;
    padding: 0.5rem 1rem;
  }

  :global([ref="tp--link"]) {
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-top-color: rgb(204, 204, 204);
    border-top-style: solid;
    border-top-width: 1px;
    border-right-color: rgb(204, 204, 204);
    border-right-style: solid;
    border-right-width: 1px;
    border-bottom-color: rgb(204, 204, 204);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-left-color: rgb(204, 204, 204);
    border-left-style: solid;
    border-left-width: 1px;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
    border-radius: 2px;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  :global([ref="tp--link"]):hover,
  :global([ref="tp--link"]):focus,
  :global([ref="tp--link"]).active {
    text-decoration: none;
    box-shadow: 
      0 0 0 0 var(--theme-primary),
      inset 6em 3.5em 0 0 var(--theme-primary);
    border-color: var(--theme-primary);
    color: var(--theme-background);
  }
</style>