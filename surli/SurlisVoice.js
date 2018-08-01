import { pause } from './Utilities.js'
import { wordCount } from './Utilities.js'
import { listen } from './SurlisEars.js'

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

let lastQuestion

export async function ask (question) {
  lastQuestion = question

  if (Array.isArray(question)) {
    for (let x = 0; x < question.length; x++) {
      await speak(question[x])
    }
  } else {
    await speak(question)
  }

  return listen()
}

export function repeatLastQuestion () {
  return ask(lastQuestion)
}
