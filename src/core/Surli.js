import { listenToUser, phraseIsAffirmative } from './SpeechRecognition'
import { speak } from './SpeechSynthesis'

function say (sentence) {
  return speak(sentence)
}

function listen () {
  return listenToUser()
}

function confirm (response) {
  return new Promise((resolve, reject) => {
    say('Is that correct?').then(listen).then(confirmation => {
      if (phraseIsAffirmative(confirmation)) {
        resolve(response)
      } else {
        reject(new Error('rejected'))
      }
    })
  })
}

export default class Surli {
  constructor (user) {
    this.user = user
    this.speaking = false
  }

  welcome () {
    if (!this.user.name) {
      say('Well hello there.').then(this.askForName.bind(this))
    } else {
      say(`Well hello there, ${this.user.name}!`)
    }
  }

  askForName () {
    return say('What\'s your name?').then(listen).then(confirm).then(name => {
      this.user.name = name
      say(`It's nice to meet you ${this.user.name}`)
    }).catch(this.askForName.bind(this))
  }
}
