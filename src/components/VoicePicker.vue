<template>
    <div class="voice-picker">
        <label>
            Select a voice
            <select @change="changeVoice">
                <option></option>
                <option v-for="voice in filteredVoices"
                        :key="voice.voiceURI"
                        :value="voice.voiceURI"
                        :selected="selectedVoice === voice">{{ voice.name }} ({{voice.lang}})
                </option>
            </select>
        </label>
    </div>
</template>

<script>
  import event from '../core/event'

  export default {
    name: 'voice-picker',
    props: {
      voices: Array
    },
    data () {
      return {
        selectedVoice: null
      }
    },
    computed: {
      filteredVoices () {
        return this.voices.filter(voice => /^en/.test(voice.lang))
      }
    },
    mounted () {
      console.log(this.voices)
    },
    methods: {
      changeVoice (newVoice) {
        this.selectedVoice = this.voices.find(voice => voice.voiceURI === newVoice.target.value)
        event.$emit('voice-picker:voice-changed', this.selectedVoice)
      }
    }
  }
</script>

<style scoped>

</style>