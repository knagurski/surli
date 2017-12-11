<template>
    <div class="user-input">
        <div class="transcript"></div>
    </div>
</template>

<script>
  import Surli from '../core/Surli'
  import User from '../core/User'

  export default {
    name: 'user-input',
    props: {
      surli: Surli,
      user: User
    }
  }
</script>

<style scoped>

</style>