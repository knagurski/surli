import { speak } from './SurlisVoice.js'
import { listen } from './SurlisEars.js'

export default class MockQuestion {
  constructor (phrase, validator, setAnswer) {
    this.phrase = phrase
    this.validator = validator
    this.setAnswer = setAnswer.bind(this)
    this.answer = ''
  }

  async ask () {
    if (typeof this.phrase === 'string') {
      await speak(this.phrase)
    } else if (Array.isArray(this.phrase)) {
      for (let x = 0; x < this.phrase.length; x++) {
        await speak(this.phrase[x])
      }
    }

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

  async recap () {
    const phrase = Array.isArray(this.phrase) ? this.phrase[0] : this.phrase

    await speak(`I asked ${phrase}`)

    if (!this.answer) {
      await speak('You decided not to answer this one')
    } else {
      await speak(`Your answer was ${this.answer}`)
    }
  }
}
