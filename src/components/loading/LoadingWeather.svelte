<script>
  // stores
  import { networkStatus } from '../../stores/stores';

  $: ({ isOnline } = $networkStatus);

</script>

<div class="wrapper-flex wrapper-flex--modal">

  <div class="wrapper-spinner">

    <p class="spinner-text online-{`${isOnline}`}">{isOnline ? 'Online' : 'Offline'}.</p>

    <p class="spinner-text">Updating Weather.</p>

    <div class="spinner" style="--size: 100px; --color: #5a7abe;"></div>

  </div>
  
</div>

<style>
  .wrapper-spinner {
    align-items: center;
    border-radius: 4px;
    box-shadow: var(--box-shadow-1),
                var(--box-shadow-2);
    justify-content: space-evenly;
    display: flex;
    flex-direction: column;
    height: 300px;
    width: 300px;
  }

  .spinner {
    animation: 0.75s linear 0s infinite normal none running rotate;
    border-color: var(--color) transparent var(--color) var(--color);
    border-width: calc(var(--size) / 15);
    border-style: solid;
    border-image: initial;
    border-radius: 50%;
    height: var(--size);
    width: var(--size);
    }

    .spinner-text {
      font-size: 1.4rem;
      font-weight: 500;
      margin: 0;
      padding: 0;
    }

    .online-true, .online-false {
      box-shadow: var(--box-shadow-1),
                  var(--box-shadow-2);
      padding: 1px 4px;
    }

    .online-true {
      color: rgb(43, 180, 39);
    }

    .online-false {
      color: rgb(221, 51, 51);
    }

    @keyframes rotate {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
</style>