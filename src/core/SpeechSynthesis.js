import event from './event'

export function getVoices () {
  return speechSynthesis.getVoices()
}

let currentVoice = null

export function setVoice (voice) {
  currentVoice = voice
}

export function speak (phrase) {
  const utterance = new SpeechSynthesisUtterance(phrase)
  utterance.voice = currentVoice

  return new Promise(resolve => {
    console.log(utterance)
    event.$emit('speak:start', phrase)
    utterance.addEventListener('end', () => {
      console.log('speaking end')
      event.$emit('speak:stop')
      resolve()
    })
    console.log('speaking start', phrase)
    speechSynthesis.speak(utterance)
  })
}

export async function say (sentence) {
  await speak(sentence)
  console.log('should only move on now')
}
