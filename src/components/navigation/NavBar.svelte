<script>
  // stores
  import { locationStore, databaseStore } from '../../stores/stores';

  // component displayed by WeatherView
  export let componentName;

  // coords, shortLabel (city & country code) & longLabel (city, counties etc.)
  $: ({ longLabel } = $locationStore);

  // Navigator API geolocation flag, units ('metric'/'imperial'), bookmarked cities
  $: ({ settings: { isGeolocation }, bookmarks } = $databaseStore);

  // is current city bookmarked by the user
  $: isBookmarked = checkBookmarks(bookmarks, longLabel);

  const geolocation = () => {
    // try geolocation via the Navigator API
    locationStore.tryCurrentLocation(longLabel)
      // successful (user allowed geolocation)
      .then((value) => value && databaseStore.modifySetting({ setting: 'isGeolocation', value }))
      // error (user denied geolocation)
      .catch(() => databaseStore.modifySetting({ setting: 'isGeolocation', value: false }));
  }

  const toggleBookmark = (itemIndex) => {
    // if bookmarked, remove bookmark in indexedDB, using its index (longLabel property)
    if (isBookmarked) return databaseStore.removeBookmark(itemIndex);

    const { coords, shortLabel, longLabel } = $locationStore;
    // if not already bookmarked, add bookmark to indexedDB
    return databaseStore.addBookmark({ coords, shortLabel, longLabel });
  }

  const checkBookmarks = (all, currentLongLabel) => {
    if (Array.isArray(all) && !all.length) return false;

    // convert longLabel property in each bookmark to a string for comparison
    const longLabelStrings = all.map(({ longLabel }) => (JSON.stringify(longLabel)));

    // if current longLabel is bookmarked, return true
    return longLabelStrings.includes(JSON.stringify(currentLongLabel));
  }
</script>

<nav class="nav">

  <button on:click="{toggleBookmark(longLabel)}" class="button nav__button button--bookmark" type="button">
    <img class="button__icon" src="./icons/buttons/{isBookmarked ? 'bookmark-rem' : 'bookmark-add'}.svg" alt="Bookmark" width="32px" height="28px" />
  </button>

  <button on:click="{() => componentName = 'SearchLocation'}" class="button nav__button button--search" type="button">
    <img class="button__icon" src="./icons/buttons/search.svg" alt="Search" width="32px" height="30px" />
  </button>

  <button on:click="{geolocation}" class="button nav__button button--geolocation" type="button">
    <img class="button__icon" src="./icons/buttons/{isGeolocation ? 'gps' : 'no-gps'}.svg" alt="Geolocation" width="30px" height="30px" />
  </button>

</nav>

<style>

  .nav {
    align-items: center;
    display: flex;
    gap: 10px;
    height: 40px;
    justify-content: center;
    margin-top: 5px;
    position: relative;
  }

</style>