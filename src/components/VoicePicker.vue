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
      voices: Array,
      selectedVoice: window.SpeechSynthesisVoice
    },
    computed: {
      filteredVoices () {
        return this.voices.filter(voice => /^en/.test(voice.lang))
      }
    },
    methods: {
      changeVoice (newVoice) {
        event.$emit(
          'voice-picker:voice-changed',
          this.voices.find(voice => voice.voiceURI === newVoice.target.value)
        )
      }
    }
  }
</script>

<style lang="scss">
    .voice-picker {
        position: fixed;
        bottom: 0;
        border-top: 1px solid var(--highlightColor);
        padding: 1em;
        width: 100vw;
        text-align: center;

        select {
            border: none;
            background: rgba(255,255,255,.25);
            color: var(--highlightColor);
            font-size: 1em;
            padding: 25em .5em;
            margin: 0;
        }
    }
</style>