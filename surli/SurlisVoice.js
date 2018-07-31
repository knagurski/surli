import { pause } from './Utilities.js'
import { wordCount } from './Utilities.js'

export function getVoices () {
  return speechSynthesis.getVoices()
}

let currentVoice = null

export function setVoice (voice) {
  currentVoice = voice
}

export function speak (phrase) {
  const utterance = new SpeechSynthesisUtterance(phrase)
//  utterance.voice = currentVoice

  const output = new Promise(resolve => {
    console.log('setting handler', phrase)

    const timeout = setTimeout(() => {
      console.log('timedout')
      resolve()
    }, wordCount(phrase) * .4 * 1000 + 1000)

    utterance.onend = () => {
      console.log('ended', phrase)
      clearTimeout(timeout)
      resolve()
    }
  })

  speechSynthesis.speak(utterance)
  return output.then(() => pause(.2))
}

export async function say (sentence) {
  await speak(sentence)
}
