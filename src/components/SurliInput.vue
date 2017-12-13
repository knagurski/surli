<template>
    <div class="surli-input">
        <p>{{ surli.lastThingSpoken }}</p>
    </div>
</template>

<script>
  import Surli from '../core/Surli'
  import User from '../core/User'

  export default {
    name: 'surli-input',
    props: {
      surli: Surli,
      user: User
    }
  }
</script>

<style lang="scss">
    .surli-input {
        display: flex;
        justify-content: center;
        padding: 1rem;
        color: var(--highlightColor);
        font-size: 2em;
        text-shadow: 0 2px 5px var(--highlightColor);
        text-align: center;
        height: 200px;
    }
</style>