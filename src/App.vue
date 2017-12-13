<template>
    <div id="app">
        <voice-picker :voices="voices"></voice-picker>
        <surli-sprite :surli="surli"></surli-sprite>
        <surli-input :surli="surli" :user="user"></surli-input>
        <user-input :surli="surli" :user="user"></user-input>
    </div>
</template>

<script>
  import Surli from './core/Surli'
  import User from './core/User'
  import event from './core/event'
  import { getVoices, setVoice } from './core/SpeechSynthesis'

  import SurliInput from './components/SurliInput'
  import UserInput from './components/UserInput'
  import VoicePicker from './components/VoicePicker'
  import SurliSprite from './components/SurliSprite'

  export default {
    name: 'app',
    components: {
      VoicePicker,
      SurliSprite,
      SurliInput,
      UserInput
    },
    data () {
      const user = new User()
      const surli = new Surli(user)

      return {
        surli,
        user,
        voices: getVoices()
      }
    },
    beforeMount () {
      speechSynthesis.addEventListener('voiceschanged', () => {
        this.voices = getVoices()
      })
    },
    mounted () {
      event.$on('voice-picker:voice-changed', newVoice => {
        setVoice(newVoice)
      })

      event.$on('speak:start', phrase => {
        this.surli.speaking = true
        this.surli.lastThingSpoken = phrase
      }).$on('speak:stop', () => {
        this.surli.speaking = false
      })

      event.$on('listen:start', () => {
        this.surli.listening = true
      }).$on('listen:stop', phrase => {
        this.surli.listening = false
        this.surli.lastThingHeard = phrase
      })

      setTimeout(() => this.surli.init(), 1000)
    }
  }
</script>

<style lang="scss">

    * {
        box-sizing: border-box;
        font-family: "Comic Sans MS", sans-serif;
    }

    body {
        color: white;
        margin: 0;
        padding: 0;
        background-color: black;
        --highlightColor: hotpink;
    }

    #app {
        display: flex;
        flex-direction: column;
    }
</style>
