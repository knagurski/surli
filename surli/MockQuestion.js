import { speak } from './SurlisVoice.js'
import { listen } from './SurlisEars.js'

export default class MockQuestion {
  constructor (phrase, validator, setAnswer) {
    this.phrase = phrase
    this.validator = validator
    this.setAnswer = setAnswer
  }

  async ask () {
    await speak(this.phrase)

    const listenLoop = () => {
      return listen().then(answer => {
        return new Promise((resolve, reject) => {
          const result = this.validator(answer)

          if (result === true) {
            resolve(answer)
          } else {
            reject(result)
          }
        })
      })
      .then(this.setAnswer)
      .catch(error => {
        return speak(error).then(listenLoop)
      })
    }

    return listenLoop()
  }
}
