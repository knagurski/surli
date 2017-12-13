import { speak } from './SpeechSynthesis'
import event from './event'
import wordsToNumber from 'words-to-numbers'

const recognition = getSpeechRecognition()

function getSpeechRecognition () {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  const recognition = new window.SpeechRecognition()
  recognition.interimResults = true

  return recognition
}

function getRandomCantHearPhrase () {
  const phrases = [
    'Sorry, I didn\'t hear that',
    'What was that?',
    'Whoops, I wasn\'t paying attention. What did you say?',
    'All I heard was blah blah blah. Say again',
    'Hey, is this thing on?',
    'I feel like you might be ignoring me'
  ]

  return phrases[Math.floor(Math.random() * phrases.length)]
}

export function listen () {
  return new Promise(resolve => {
    event.$emit('listen:start')
    recognition.start()

    let heardAnything = false
    setTimeout(async function () {
      if (!heardAnything) {
        recognition.stop()
        recognition.removeEventListener('result', transcribe)
        event.$emit('listen:stop')
        resolve(speak(getRandomCantHearPhrase()).then(listen))
      }
    }, 10000)

    function transcribe ({results}) {
      const phrase = [...results].map(result => result[0]).map(result => result.transcript).join('')

      heardAnything = true
      event.$emit('listen:heard', phrase)

      if (results[0].isFinal) {
        recognition.stop()
        recognition.removeEventListener('result', transcribe)
        event.$emit('listen:stop', phrase)
        setTimeout(() => resolve(phrase), 0)
      }
    }

    recognition.addEventListener('result', transcribe)
  })
}

export function ask (question) {
  return speak(question).then(listen)
}

export function askNumber (question) {
  return ask(question).then(answer => {
    const number = parseInt(wordsToNumber(answer))

    if (isNaN(number) || number < 0 || number > 5) {
      return askNumber('Sorry, could you give me a number between 0 and 5?')
    } else {
      return number
    }
  })
}

export function phraseIsAffirmative (phrase) {
  const yeses = ['yes', 'yeah', 'yep', 'yup', 'sure', 'correct', 'affirmative', 'true']

  return yeses.some(yes => phrase.toLowerCase().includes(yes))
}

export function confirm (response, phrase = 'Is that correct?') {
  return new Promise(async function (resolve, reject) {
    if (await ask(phrase).then(answer => phraseIsAffirmative(answer))) {
      resolve(response)
    } else {
      reject(new Error('rejected'))
    }
  })
}
