import { speak } from './SurlisVoice.js'

const recognition = getSpeechRecognition()

function getSpeechRecognition () {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  const recognition = new SpeechRecognition()
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
    recognition.start()

    let heardAnything = false
    setTimeout(async function () {
      if (!heardAnything) {
        recognition.stop()
        recognition.removeEventListener('result', transcribe)
        resolve(speak(getRandomCantHearPhrase()).then(listen))
      }
    }, 10000)

    function transcribe ({results}) {
      const phrase = [...results].map(result => result[0]).map(result => result.transcript).join('')

      heardAnything = true

      if (results[0].isFinal) {
        recognition.stop()
        recognition.removeEventListener('result', transcribe)
        setTimeout(() => resolve(phrase), 0)
      }
    }

    recognition.addEventListener('result', transcribe)
  })
}

export function ask (question) {
  return speak(question).then(listen)
}
