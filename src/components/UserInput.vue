<template>
    <div class="user-input" :class="{'user-input--fade': fade}">
        <p>{{ surli.lastThingHeard }}</p>
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
    },
    data () {
      return {
        fade: false
      }
    },
    watch: {
      'surli.lastThingHeard' () {
        this.fade = false

        setTimeout(() => {
          this.fade = true
        }, 2000)
      }
    }
  }
</script>

<style lang="scss">
    .user-input {
        display: flex;
        justify-content: center;
        padding: 1rem;
        font-size: 2em;
        text-shadow: 0 2px 10px white;
        opacity: 1;
        text-align: center;
        height: 200px;

        &--fade {
            opacity: 0;
            transition: 5s opacity ease-out;
        }
    }
</style>