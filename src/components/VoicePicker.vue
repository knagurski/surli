<template>
    <div class="voice-picker">
        <label>
            Select a voice
            <select @change="changeVoice">
                <option></option>
                <option v-for="voice in voices"
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
    props: [
      'voices'
    ],
    data () {
      return {
        selectedVoice: null
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