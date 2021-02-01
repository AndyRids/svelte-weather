<script>
  // stores
  import { locationStore, weatherStore, databaseStore, networkStatus } from '../../stores/stores';

  // actions
  import createChart from '../../actions/createChart';

  // components
  import LoadingWeather from '../loading/LoadingWeather.svelte';
  import SectionHeading from '../heading/SectionHeading.svelte';
  import NavBar from '../navigation/NavBar.svelte';
  import Basic from './Basic.svelte';
  import Details from './Details.svelte';
  import Next48Hours from './Next48Hours.svelte';
  import Next7Days from './Next7Days.svelte';

  // component displayed by WeatherView
  export let componentName;

  // active HourlyWthrCard
  let hourlyIndex = 0;

  // active bookmark
  let bookmarkIndex = 0;

  // Navigator API geolocation flag, units ('metric'/'imperial'), bookmarked cities
  $: ({ settings: { units }, bookmarks } = $databaseStore);

  $: ({ isOnline } = $networkStatus);

  // coords
  $: ({ coords } = $locationStore);

  // current, hourly & daily weather data
  $: ({ current, hourly, daily } = $weatherStore);

  // display LoadingWeather component, fetch weather data and display, on location change ($locationStore)
  $: isLoading = isOnline && weatherStore.fetchWeatherData(coords, units);


</script>

{#await isLoading}

  <LoadingWeather />

{:then}
  <Basic bind:bookmarkIndex {current} {hourly} {hourlyIndex} {bookmarks} {units} />

  <NavBar bind:componentName />

  <!-- Section heading divider -->
  <SectionHeading title={'Details'} />

  <Details {hourly} {hourlyIndex} {units} />

  <!-- Section heading divider -->
  <SectionHeading title={'Precipitation'} />

  <!-- Precipitation chart -->
  <div class="wrapper-chart">
    <canvas use:createChart={{ hourly: hourly, index: hourlyIndex }} class="chart"></canvas>
  </div>

  <!-- Section heading divider -->
  <SectionHeading title={'Next 48 Hours'} />

  <Next48Hours bind:hourlyIndex {hourly} {units} />

  <!-- Section heading divider -->
  <SectionHeading title={'Next 7 Days'} />

  <Next7Days {daily} />
  
{/await}

<style>
  .wrapper-chart {
    align-items: center;
    box-shadow: var(--box-shadow-1),
                var(--box-shadow-2);
    border-radius: 4px;
    display: flex;
    grid-column: span 3;
    height: 115px;
    justify-content: center;
    position: relative;
    width: 100%;
  }

  .chart {
    margin: 0;
    padding: 0;
  }
</style>
