<template>
    <div class="surli-sprite-wrapper">
        <div class="surli-sprite-bounce-wrapper">
            <div class="surli-sprite" :class="modifiers">
                <div class="surli-sprite__eyes">
                    <div class="surli-sprite__eye" :style="{height: eyeHeight}" @click="eyePoke"></div>
                    <div class="surli-sprite__eye" :style="{height: eyeHeight}" @click="eyePoke"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { say } from '../core/SpeechSynthesis'

  export default {
    name: 'surli-sprite',
    props: [
      'surli'
    ],
    data () {
      return {
        eyeHeight: '80%',
        standardEyeHeight: '80%'
      }
    },
    computed: {
      modifiers () {
        const baseClassName = 'surli-sprite'
        const modifiers = {}

        if (this.surli.speaking) {
          modifiers[`${baseClassName}--speaking`] = true
        }

        if (this.surli.listening) {
          modifiers[`${baseClassName}--listening`] = true
        }

        return modifiers
      }
    },
    mounted () {
      this.eyes = [...this.$el.querySelectorAll('.surli-sprite__eye')]

      const blink = this.blink

      function autoBlink () {
        const wait = Math.ceil(Math.random() * 10000)

        setTimeout(() => {
          blink()
          autoBlink()
        }, wait)
      }

      autoBlink()
    },
    methods: {
      blink () {
        this.eyeHeight = 0

        setTimeout(() => {
          this.eyeHeight = this.standardEyeHeight
        }, 100)
      },
      eyePoke ({target}) {
        say('Hey! Don\'t do that!')

        target.style.height = 0
        setTimeout(() => {
          target.style.height = this.standardEyeHeight
        }, 2000)
      },
      wideEyes () {
        this.eyeHeight = '130%'

        setTimeout(() => {
          this.eyeHeight = this.standardEyeHeight
        }, 2000)
      },
      squint () {
        this.eyeHeight = '30%'

        setTimeout(() => {
          this.eyeHeight = this.standardEyeHeight
        }, 2000)
      }
    }
  }
</script>

<style lang="scss">
    .surli-sprite {
        &-wrapper {
            background-color: black;
            padding: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        --boxShadowColor: var(--highlightColor);
        --boxShadowDepth: 3em;
        --sizeMultiplier: 10px;

        border: .5em solid var(--highlightColor);
        font-size: var(--sizeMultiplier);
        width: 10em;
        height: 10em;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: 3s infinite alternate-reverse tilt ease-in-out;
        transition: .3s all ease-in-out;

        box-shadow: 0 0 var(--boxShadowDepth) var(--boxShadowColor);

        &-bounce-wrapper {
            animation: 1s infinite alternate-reverse bounce ease-in-out;
        }

        &__eyes {
            display: flex;
            flex: .7;
            justify-content: space-between;
            align-items: center;
            height: 50%;
        }

        &__eye {
            flex: .4;
            border: .5em solid var(--highlightColor);
            border-radius: 50%;
            height: 80%;
            transition: .1s all ease-in-out;
        }

        &--speaking {
            --boxShadowDepth: 5em;
        }
        &--listening {
            --boxShadowColor: white;
            --boxShadowDepth: 5em;
            animation-play-state: paused;
        }

        @media screen and (min-width: 350px) {
            --sizeMultiplier: 30px;
        }

        @media screen and (min-width: 550px) {
            --sizeMultiplier: 50px;
        }
    }

    @keyframes tilt {
        from {
            transform: rotate(-2deg);
        }

        to {
            transform: rotate(5deg);
        }
    }

    @keyframes bounce {
        from {
            transform: translateY(0);
        }

        to {
            transform: translateY(-.25rem);
        }
    }
</style>