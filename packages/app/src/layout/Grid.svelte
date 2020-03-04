<script>
  export let col = 6
  export let row = null
</script>

<section class={`tp--col-${col} ${row ? `tp--row-${row}` : ''}`}>
  <slot></slot>
</section>