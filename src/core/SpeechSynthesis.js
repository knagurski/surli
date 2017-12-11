export let voices = []

export function speak (phrase) {
  const utterance = new SpeechSynthesisUtterance(phrase)

  if (voices.length < 1) {
    voices = speechSynthesis.getVoices()
  }

  return new Promise(resolve => {
    utterance.addEventListener('end', resolve)
    speechSynthesis.speak(utterance)
  })
}
