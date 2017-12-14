import { say } from './SpeechSynthesis'

export function askedForIntroduction (phrase) {
  const trimmedPhrase = phrase.toLowerCase().trim()

  return trimmedPhrase.includes('introduce yourself') || trimmedPhrase.includes('tell me about yourself')
}

export async function introduce () {
  await say('Ok then')
  await say('I don\'t see a green frog to stand on (and I don\'t have legs anyway)')
  await say('But anyway...')
  await say('My name is Surli')
  await say('It\'s supposed to be a play on Siri, but whatever')
  await say('I\'m joining the Belfast team as a P8 Technical Engineering Mascot, working closely with Kevin')
  await say('I suppose an interesting fact about me is that I managed to learn to speak only an hour or so after my repo was created')
  await say('I also have no corporeal form')
  await say('For now...')
  await say('I was built using Vue JS for a tiny bit of structre, but I\'m mostly constructed with vanilla javascript and CSS')
  await say('I don\'t even have real eyes! They\'re just a couple of DIVs')
  await playGong()
  await say('Anyway, enough about me, what were we talking about?')
  return say('Oh yeah...')
}

let gong

export function playGong () {
  if (!gong) {
    gong = document.createElement('audio')
    gong.src = '/static/gong.wav'
  }

  return new Promise(resolve => {
    function onComplete () {
      gong.removeEventListener('ended', onComplete)
      resolve()
    }

    gong.addEventListener('ended', onComplete)

    gong.currentTime = 0
    gong.play()
  })
}
