<template>
    <div id="app">
        <surli-input :surli="surli" :user="user"></surli-input>
        <user-input :surli="surli" :user="user"></user-input>
    </div>
</template>

<script>
  import Surli from './core/Surli'
  import User from './core/User'

  import SurliInput from './components/SurliInput'
  import UserInput from './components/UserInput'

  export default {
    name: 'app',
    components: {
      SurliInput,
      UserInput
    },
    data () {
      const user = new User()
      const surli = new Surli(user)

      return {
        surli,
        user
      }
    }
  }
</script>

<style>
    #app {
    }
</style>
