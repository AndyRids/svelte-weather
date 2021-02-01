<script>
  // stores
  import { locationStore } from '../../stores/stores';

  // current weather data
  export let current;

  // hourly weather data
  export let hourly;

  // active hourly-card index
  export let hourlyIndex;

  // bookmarks
  export let bookmarks;

  // units from user settings
  export let units;

  // active bookmarked city
  export let bookmarkIndex;

  // shortLabel (city & country code) & longLabel (descriptive label)
  $: ({ shortLabel, longLabel } = $locationStore);

  // is current city bookmarked by the user
  $: isBookmarked = checkBookmarks(bookmarks, longLabel);

  $: console.log('Watching:', bookmarkIndex);


  // tempUnit[units] ({ units } = $databaseStore.settings) is used to display 'C'/'F'
  const tempUnit = { metric: 'C', imperial: 'F' };

  const nextBookmark = () => {
    if (!bookmarks.length || bookmarks.length < 2 || !bookmarks[bookmarkIndex + 1]) return;

    bookmarkIndex = isBookmarked ? (bookmarkIndex + 1) : 0;

    locationStore.setLocationInfo(bookmarks[bookmarkIndex], longLabel);
  }

  const previousBookmark = () => {
    if (!bookmarks.length || bookmarks.length < 2 || !bookmarks[bookmarkIndex - 1]) return;

    bookmarkIndex = isBookmarked ? (bookmarkIndex - 1) : 0;

    locationStore.setLocationInfo(bookmarks[bookmarkIndex], longLabel);
  }

  const checkBookmarks = (all, currentLongLabel) => {
    if (Array.isArray(all) && !all.length) return false;

    // convert longLabel property in each bookmark to a string for comparison
    const longLabelStrings = all.map(({ longLabel }) => (JSON.stringify(longLabel)));

    // if current longLabel is bookmarked, return true
    return longLabelStrings.includes(JSON.stringify(currentLongLabel));
  }

</script>

<section class="weather-basic">

  <div class="wrapper-flex wrapper-flex--space-between">
    <button on:click={previousBookmark} class="button button--main button--back" type="button">
      <img class="button__back-icon" src="./icons/buttons/back.svg" alt="back" width="25px" height="25px" />
    </button>

    <div class="weather-basic__location">{shortLabel}</div>

    <button on:click={nextBookmark} class="button button--main button--next" type="button">
      <img class="button__next-icon" src="./icons/buttons/next.svg" alt="next" width="25px" height="25px" />
    </button>
  </div>
  

  <div class="weather-basic__description">{hourly[hourlyIndex] ? hourly[hourlyIndex].description : ''}</div>

  <div class="wrapper-flex">
    <div class="wrapper-flex wrapper-flex--column">
      <img class="weather-basic__sunrise-icon" src="./icons/cards/sunrise.svg" alt="sunrise icon" width="30px" height="30px" />
      <span class="weather-basic__sunrise-time">{current?.sunrise ? current.sunrise : ''}</span>
    </div>

    <div class="weather-basic__temp">{hourly[0] ? hourly[hourlyIndex].temp : ''}{tempUnit[units]}</div>

    <div class="wrapper-flex wrapper-flex--column">
      <img class="weather-basic__sunset-icon" src="./icons/cards/sunset.svg" alt="sunset icon" width="30px" height="30px" />
      <span class="weather-basic__sunset-time">{current?.sunset ? current.sunset : ''}</span>
    </div>
  </div>

</section>

<style>
  .weather-basic {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-items: center;
    text-align: center;
    width: 100%;
  }

  .weather-basic__location {
    font-size: 1.4rem;
    font-weight: 600;
    padding: 0;
  }

  .weather-basic__description {
    font-size: 1.1rem;
    font-weight: 500;
  }

  .weather-basic__description::first-letter { text-transform: uppercase; }

  .weather-basic__sunrise-time,
  .weather-basic__sunset-time,
  .weather-basic__temp {
    color: #405177;
    font-weight: 600;
  }

  .weather-basic__temp { font-size: 1.9rem; }
</style>