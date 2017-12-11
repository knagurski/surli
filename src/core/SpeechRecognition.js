let recognition = null

function getSpeechRecognition () {
  if (!recognition) {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    recognition = new window.SpeechRecognition()
    recognition.interimResults = true
  }

  return recognition
}

export function listenToUser () {
  return new Promise(resolve => {
    const speech = getSpeechRecognition()

    speech.start()

    function transcribe ({results}) {
      const phrase = [...results].map(result => result[0]).map(result => result.transcript).join('')

      if (results[0].isFinal) {
        speech.stop()
        speech.removeEventListener('result', transcribe)
        console.info(phrase)
        setTimeout(() => resolve(phrase), 100)
      }
    }

    speech.addEventListener('result', transcribe)
  })
}

export function phraseIsAffirmative (phrase) {
  const yeses = ['yes', 'yep', 'yup', 'correct', 'affirmative', 'true']

  return yeses.some(yes => phrase.toLowerCase().includes(yes))
}
