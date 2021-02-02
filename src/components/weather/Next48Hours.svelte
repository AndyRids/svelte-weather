<script>
  // stores

  // actions
  import dragToScroll from '../../actions/dragToScroll';

  export let hourly;

  export let hourlyIndex = 0;

  export let units;

  // tempUnit[units] ({ units } = $databaseStore.settings) is used to display 'C'/'F'
  const tempUnit = { metric: 'C', imperial: 'F' };

  /**
   * used to destructure the data-index attribute value from pointerdown event target
   * and set hourlyIndex to that value.
   *
   * @param {String} index - data-index attribute value 
   */
  const changeIndex = ({ target: { dataset } }) => (hourlyIndex = Number(dataset.index));

</script>

  <div use:dragToScroll class="wrapper-scroll" >

    {#each hourly as { time ='', weatherIcon = '', temp = '' }, index}

      <article class="hour-card">
        <div on:pointerdown="{changeIndex}" class="hour-card__header {index === hourlyIndex ? 'header--highlight' : ''}" data-index="{index}">
          <h4 class="hour-card__title">Details</h4>
          <img src="./icons/headers/pointer.svg" alt="Arrow icon" class="hour-card__title-icon" height="20px" width="20px" />
        </div>
      
        <div class="hour-card__body">
          <div class="hour-card__time">{time}</div>
          <img src="./icons/weather/{weatherIcon}.svg" alt="Weather icon" class="hour-card__weather-icon" height="28px" width="28px" draggable="false" />
          <div class="hour-card__temperature">{temp}{tempUnit[units]}</div>
        </div>
      </article>

    {/each}

  </div>


<style>

  .wrapper-scroll {
    box-shadow: var(--box-shadow-1),
                var(--box-shadow-2);
    border-radius: 4px;
    cursor: grabbing;
    cursor: grab;
    display: flex;
    overflow-y: hidden;
    width: 100%;
  }

  .wrapper-scroll::-webkit-scrollbar { height: var(--scrollbar-height); }
  .wrapper-scroll::-webkit-scrollbar-track { background: var(--scrollbar-track); }
  .wrapper-scroll::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 2px; }

  .hour-card {
    align-items: center;
    background: var(--bg-section);
    border-left: 1px solid var(--borders);
    display: flex;
    height: 100%;
    justify-content: space-between;
    flex-direction: column;
    min-width: calc(100% / 4 + 0px);
    -webkit-user-select: none;
    user-select: none;
  }

  .hour-card:first-child { border-left: none; }

  .hour-card__header {
    align-items: center;
    align-self: baseline;
    border-bottom: 1px solid var(--borders);
    cursor: pointer;
    display: flex;
    font-size: 1.1rem;
    font-weight: 600;
    height: 44px;
    justify-content: space-evenly;
    transition: background 500ms;
    width: 100%;
  }

  .hour-card__header:hover { background: #89abf580; }

  .header--highlight { background: #89abf5fa; }

  .header--highlight > .hour-card__title-icon { transform: rotate(-90deg); }

  .hour-card__title {
    max-width: -moz-fit-content;
    max-width: fit-content;
    margin: 0;
    padding: 0;
    pointer-events: none;
  }

  .hour-card__title-icon {
    pointer-events: none;
    transition: transform 500ms; 
  }

  .hour-card__body {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  @media screen and (max-width: 380px) {
    .hour-card { min-width: calc(100% / 3 + 0px); }
  }
</style>
