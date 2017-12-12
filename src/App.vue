<template>
    <div id="app">
        <voice-picker :voices="voices"></voice-picker>
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

  export default {
    name: 'app',
    components: {
      VoicePicker,
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
    }
  }
</script>

<style>
    #app {
    }
</style>
