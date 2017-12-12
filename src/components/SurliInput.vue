<template>
    <div class="surli-input">

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
    },
    mounted () {
      this.surli.init()
    }
  }
</script>

<style scoped>

</style>