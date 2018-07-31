import { speak } from './SurlisVoice.js'
import { pause } from './Utilities.js'

export default class MockQuestion {
  constructor (phrase, validator, setAnswer) {
    this.phrase = phrase
    this.validator = validator
    this.setAnswer = setAnswer
  }

  ask() {
    return new Promise(resolve => {
      speak(this.phrase)
        .then(() => pause(2))
        .then(() => speak('Moving on'))
        .then(resolve)
    })
  }
}
