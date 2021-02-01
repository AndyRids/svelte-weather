<script>
  // stores

  // actions
  import injectSVG from '../../actions/injectSVG';

  // hourly weather data
  export let hourly;

  // active hour index
  export let hourlyIndex;

  // units from user settings
  export let units;

  // tempUnit[units] ({ units } = $databaseStore.settings) is used to display 'C'/'F'
  const tempUnit = { metric: 'C', imperial: 'F' };

</script>

<section class="weather-details">

  <!-- Pressure weather card -->
  <article class="card">
    <div class="card__header">
      <figure class="card__figure">
        <img use:injectSVG src="./icons/cards/pressure.svg" alt="Pressure icon" class="card__icon" height="30px" width="30px" />
      </figure>
    </div>

    <div class="card__body">
      <div class="card__value">{hourly[hourlyIndex] ? hourly[hourlyIndex].pressure : ''}</div>
      <div class="card__description">Pressure</div>
    </div>
  </article>

  <!-- Visibility weather card -->
  <article class="card">
    <div class="card__header">
      <figure class="card__figure">
        <img use:injectSVG src="./icons/cards/visibility.svg" alt="Visibility icon" class="card__icon" height="30px" width="30px" />
      </figure>
    </div>

    <div class="card__body">
      <div class="card__value">{hourly[hourlyIndex] ? hourly[hourlyIndex].visibility : ''}</div>
      <div class="card__description">Visibility</div>
    </div>
  </article>

  <!-- feels-like temp weather card -->
  <article class="card">
    <div class="card__header">
      <figure class="card__figure">
        <img use:injectSVG src="./icons/cards/feels-like.svg" alt="feels-like icon" class="card__icon" height="30px" width="30px" />
      </figure>
    </div>

    <div class="card__body">
      <div class="card__value">{hourly[hourlyIndex] ? hourly[hourlyIndex].feelsLike : ''}{tempUnit[units]}</div>
      <div class="card__description">Feels-like</div>
    </div>
  </article>

  <!-- UV Index weather card -->
  <article class="card">
    <div class="card__header">
      <figure class="card__figure">
        <img use:injectSVG src="./icons/cards/uv.svg" alt="UV Index icon" class="card__icon" height="30px" width="30px" />
      </figure>
    </div>

    <div class="card__body">
      <div class="card__value">{hourly[hourlyIndex] ? hourly[hourlyIndex].UVIndex : ''}</div>
      <div class="card__description">UV Index</div>
    </div>
  </article>

  <!-- Wind speed weather card -->
  <article class="card" style="--wind-degree: {hourly[hourlyIndex] ? hourly[hourlyIndex].windDegree : 0}">
    <div class="card__header">
      <figure class="card__figure">
        <img use:injectSVG src="./icons/cards/wind-speed.svg" alt="Wind speed icon" class="card__icon" height="30px" width="30px" />
      </figure>
    </div>

    <div class="card__body">
      <div class="card__value">{hourly[hourlyIndex] ? hourly[hourlyIndex].windSpeed : ''}</div>
      <div class="card__description">Wind</div>
    </div>
  </article>

  <!-- Humidity weather card -->
  <article class="card">
    <div class="card__header">
      <figure class="card__figure">
        <img use:injectSVG src="./icons/cards/humidity.svg" alt="Humidity icon" class="card__icon" height="30px" width="30px" />
      </figure>
    </div>

    <div class="card__body">
      <div class="card__value">{hourly[hourlyIndex] ? hourly[hourlyIndex].humidity : ''}</div>
      <div class="card__description">Humidity</div>
    </div>
  </article>

</section>

<style>
  .weather-details {
    align-items: center;
    display: grid;
    gap: 14px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, var(--details-card));
    justify-items: center;
    text-align: center;
    width: 100%;
  }

  .card {
    align-items: center;
    background: var(--bg-card);
    border: 1px solid #e4e3e3;
    border-radius: 10px;
    box-shadow: var(--box-shadow-1),
                var(--box-shadow-2);
    display: flex;
    flex-direction: column;
    font-size: 1.1rem;
    height: 100%;
    justify-content: space-evenly;
    width: 100%
  }

  .card__header { 
    height: 30px; 
  }

  .card__figure {
    margin: 0;
    padding: 0;
  }

  .card__value {
    color: #405177;
    font-weight: 600;
  }

  .card__icon {
    transform: rotate(var(--wind-degree));
    transition: transform 500ms ease-out;
  }
</style>