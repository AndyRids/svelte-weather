<script>
  // components
  import SearchLocation from '../search/SearchLocation.svelte';
  import Weather from '../weather/Weather.svelte';

  // current displayed component name
  let componentName = 'Weather';

  // reference to imported weather components
  const components = { Weather, SearchLocation };

</script>

<section class="main-view">

    <svelte:component this={components[componentName]} bind:componentName />

</section>

<style>
  .main-view {
    grid-column: 2 / 3;
    height: 100%;
    position: relative;
    width: 100%;
  }
</style>