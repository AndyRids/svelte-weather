<script>
  // daily weather data
  export let daily;

</script>

<!-- 7 day forecast -->
<section class="forecast">

  <div class="forecast__header header--justify-left"></div>
  <div class="forecast__header"></div>
  <div class="forecast__header">Rain</div>
  <div class="forecast__header">Min</div>
  <div class="forecast__header">Max</div>

  {#each daily as { day, weatherIcon, rain, minTemp, maxTemp }}

    <div class="forecast__day header--justify-left">{day}</div>
    <img class="forecast__weather-icon" src="./icons/weather/{weatherIcon}.svg" alt="daily weather icon" width="28px" height="28px" />
    <div class="forecast__rain">{rain}</div>
    <div class="forecast__min-temp">{minTemp}</div>
    <div class="forecast__max-temp">{maxTemp}</div>

  {/each}
  
</section>

<style>
  .forecast {
    align-items: center;
    border: 1px solid #e4e3e3;
    border-radius: 4px;
    box-shadow: var(--box-shadow-1),
                var(--box-shadow-2);
    display: grid;
    gap: 8px 5px;
    grid-auto-rows: 25px;
    grid-template-columns: 1fr 45px 45px repeat(2, 46px);
    justify-items: center;
    margin-bottom: 4px;
    width: 100%;
  }

  .forecast__header { font-weight: 500; }

  .header--justify-left { justify-self: left; }

  .forecast__day {
    border-radius: 4px;
    font-weight: 500;
    padding-left: 10px;
    transition: background 500ms;
  }
</style>