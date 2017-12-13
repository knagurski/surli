<template>
    <div id="app">
        <surli-sprite :surli="surli"></surli-sprite>
        <surli-input :surli="surli" :user="user"></surli-input>
        <user-input :surli="surli" :user="user"></user-input>
        <voice-picker :voices="voices" :selected-voice="selectedVoice"></voice-picker>
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
        voices: getVoices(),
        selectedVoice: null
      }
    },
    beforeMount () {
      this.storage = localStorage

      speechSynthesis.addEventListener('voiceschanged', () => {
        this.voices = getVoices()

        if (this.storage.voice) {
          const selectedVoice = this.voices.find(voice => voice.voiceURI === this.storage.voice)

          if (selectedVoice) {
            event.$emit('voice-picker:voice-changed', selectedVoice)
          }
        }
      })
    },
    mounted () {
      event.$on('voice-picker:voice-changed', newVoice => {
        setVoice(newVoice)
        this.storage.voice = newVoice.voiceURI
        this.selectedVoice = newVoice
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
      }).$on('listen:heard', phrase => {
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
        height: 100vh;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
