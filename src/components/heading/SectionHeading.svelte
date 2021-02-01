<script>
  export let title = '';
</script>

  <section class="section-heading">
    <h2 class="section-heading__title">{title}</h2>
  </section>

<style>
  .section-heading {
    align-items: center;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr auto 1fr;
    height: 35px;
    margin: 5px 0px;
    padding: 0;
    width: 100%;
  }

  .section-heading::before,
  .section-heading::after {
    border-top: 2px double var(--borders);
    content: "";
  }

  .section-heading__title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    padding: 0;
    text-align: center;
  }

</style>