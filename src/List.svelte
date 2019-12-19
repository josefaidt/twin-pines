<script>
  export let list

  list = [
    {
      id: 0,
      title: 'This is my first task',
      text: 'Some additional text'
    },
    {
      id: 1,
      title: 'This is my second task',
      text: 'Some additional text'
    }
  ]
</script>

<section>
<ul>
  {#each list as item, i}
    <li>
      <div>
        <h4>{item.title}</h4>
        <p>{item.text}</p>
      </div>
    </li>
  {/each}
  </ul>
</section>

<style>
  section {
    text-align: left;
  }

  section ul {
    display: grid;
    grid-template-columns: 1;
    grid-template-rows: repeat(max-content, 1fr);
    grid-gap: 0.8rem;
    list-style: none;
  }
</style>