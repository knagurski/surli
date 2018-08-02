import { isAbort, isGood, isYes, pause, wordCount, getRandom } from './Utilities.js'
import { listen } from './SurlisEars.js'

export function getVoices () {
  function filterVoices (voices) {
    const allowedVoices = [
      'Google UK English Female',
      'Google UK English Male'
    ];

    return voices.filter(({voiceURI}) => allowedVoices.includes(voiceURI))
  }

  return new Promise(resolve => {
    if (speechSynthesis.getVoices().length > 0) {
      resolve(filterVoices(speechSynthesis.getVoices()))
    } else {
      speechSynthesis.onvoiceschanged = () => resolve(filterVoices(speechSynthesis.getVoices()))
    }
  })
}

getVoices().then(voices => setVoice(voices[0]))

let currentVoice = null

export function setVoice (voice) {
  currentVoice = voice
}

let speed = 1
export async function speakSlower () {
  if (speed === 0.1) {
    return speak("That's as slow as I can go")
  }

  const originalSpeed = speed
  speed = Math.max(speed - 0.5, 0.1)

  return speak('How is this?')
    .then(listen)
    .then(answer => {
      return new Promise((resolve, reject) => {
        if (isYes(answer) || isGood(answer)) {
          resolve()
        } else if (isAbort(answer)) {
          speed = originalSpeed
          speak('Ok').then(resolve)
        } else {
          reject()
        }
      })
    })
    .catch(speakSlower)
}

export async function speakFaster () {
  if (speed === 3) {
    return speak("That's as fast as I can go")
  }

  const originalSpeed = speed
  speed += 0.5

  return speak('How is this?')
  .then(listen)
  .then(answer => {
    return new Promise((resolve, reject) => {
      if (isYes(answer) || isGood(answer)) {
        resolve()
      } else if (isAbort(answer)) {
        speed = originalSpeed
        speak('Ok').then(resolve)
      } else {
        reject()
      }
    })
  })
  .catch(speakFaster)
}

export async function changeVoice () {
  const voices = await getVoices()

  setVoice(getRandom(voices.filter(voice => voice !== currentVoice)))

  return speak('There you go')
}


export function speak (phrase) {
  fireSpeakEvent('speak-start', phrase)

  const utterance = new SpeechSynthesisUtterance(phrase)
  utterance.rate = speed
  utterance.voice = currentVoice
  // utterance.volume = 0

  const output = new Promise(resolve => {
    console.log('setting handler', phrase)

    const timeout = setTimeout(() => {
      fireSpeakEvent('speak-end', phrase)
      console.log('timedout')
      resolve()
    }, wordCount(phrase) * .4 * 1000 + 1000)

    utterance.onend = () => {
      fireSpeakEvent('speak-end', phrase)
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

const listeners = []

export function attachListener (listener) {
  listeners.push(listener)
}

function fireSpeakEvent (event, phrase) {
  listeners.forEach(listener => listener(event, phrase))
}
