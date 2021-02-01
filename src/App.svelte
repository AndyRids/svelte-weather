<script>
  import { onMount } from 'svelte';

  // stores
  import { databaseStore, locationStore } from './stores/stores';

  // components
  import MainView from './components/views/MainView.svelte';

  // set bookmark flag
  let setBookmark;

  $: ({ status: { isRetrieved }, bookmarks } = $databaseStore);

  $: if (setBookmark && isRetrieved !== null) setFirstBookmark(bookmarks[0]);

  /**
   * used to set the location store value to the first location
   * object in the bookmarked locations array (bookmarks).
   *
   * @param {Object} bookmark - bookmarked location object
   */
  const setFirstBookmark = (bookmark) => {
    bookmark && locationStore.setLocationInfo(bookmark);
    setBookmark = false;
  };
  
  // App is only mounted once, allowing a App first load flag
  onMount(() => (setBookmark = true));
</script>

<main class="main">

  {#if isRetrieved !== null}

    <MainView />

  {/if}

</main>

<style>
  .main {
    align-items: center;
    display: grid;
    column-gap: 4px;
    grid-template-columns: 1fr minmax(234px, 420px) 1fr;
    justify-items: center;
    height: 100vh;
    overflow-y: scroll;
    width: 100%;
  }

  .main::before,
  .main::after {
    content: '';
  }
</style>