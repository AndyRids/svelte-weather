<script>
  // stores
  import { locationStore } from '../../stores/stores';

  // components
  import SectionHeading from '../heading/SectionHeading.svelte';

  export let componentName;

  // user search text
  let searchText = '';

  // array of search results
  let searchResults = [];

  // when searchButton is clicked
  function searchHandler() {
    // if input is not empty
    if (searchText) {
      // attempt geocode API with searchText
      locationStore.tryForwardGeocode(searchText)
        .then((data) => searchResults = data)
        .catch((error) => console.log(error))
        .finally(() => searchText = '');
    }
  }

  function resultHandler({ target }) {
    // index of result in searchResults array
    const index = Number(target.dataset.index);
    console.log(target, searchResults);
    locationStore.setLocationInfo(searchResults[index]);

    searchResults = [];

    componentName = 'Weather';
  }
</script>

<div class="wrapper-heading">
  <div on:click="{() => componentName = 'Weather'}" class="heading-back">
    <img class="heading-back__icon" src="icons/buttons/back.svg" alt="left arrow" />
    <span class="heading-back__title">Location search</span>
  </div>
</div>

<section class="search">

  <input bind:value="{searchText}" class="input search__input" type="text" placeholder="Search for a city..." pattern="^[a-zA-Z]*$" />

  <button on:click="{searchHandler}" class="button button--main search__button">
    <img class="button__search-icon" src="./icons/buttons/search.svg" alt="Search button" />
  </button>

</section>

<!-- Section heading divider -->
<SectionHeading title={'Search results'} />

{#if searchResults.length}
  <section class="search-results">

    {#each searchResults as { longLabel }, index}
      <div on:click="{resultHandler}" class="search-results__result" data-index="{index}">{longLabel}</div>
    {/each}

  </section>
{/if}


<style>
  .heading-back {
    align-self: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    display: grid;
    gap: 2px;
    grid-template-columns: 20px 1fr;
    text-align: center;
    transition: background 500ms;
  }

  .heading-back:hover { background: var(--bg-hover); }
  
  .heading-back__title {
    font-size: 1.1rem;
    font-weight: 600;
    padding-right: 4px;
  }

  .search {
    align-items: center;
    display: grid;
    gap: 1px;
    grid-template-columns: 1fr auto;
    justify-items: center;
    margin-bottom: 5px;
    width: 100%;
  }

  .search__input {
    border-radius: 4px;
    box-shadow:  3px 3px 4px -1px var(--box-shadow-1),
                1px 1px 3px 1px var(--box-shadow-1);
    height: 32px;
    width: 100%;
  }

  .input {
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 1.1rem;
    padding: 0 5px;
  }

  .input::placeholder {
    font-size: 1.1rem;
    font-style: italic;
    opacity: 0.9;
  }

  .input:focus {
    outline-style: solid;
    outline-color: transparent;
    box-shadow: 0 0 0 3px #5a7abe;
  }

  .search__input:invalid, .search__input:focus:invalid {
    box-shadow: 0 0 0 3px #be5a5a;
  }

  .search__input:invalid + .search__button {
    background: #f5898980;
    cursor: not-allowed;
    pointer-events: none;
  }

  .search-results {
    align-items: center;
    background-image: var(--bg-card);
    border-radius: 4px;
    box-shadow: var(--box-shadow-1),
                var(--box-shadow-2);
    display: grid;
    font-weight: 600;
    grid-auto-rows: auto;
    justify-items: center;
    text-align: left;
    width: 100%;
  }

  .search-results__result {
    padding: 2px 5px;
    transition: background 500ms;
    width: 100%;
  }

  .search-results__result:hover {
    background: #89abf580;
    cursor: pointer;
  }
</style>