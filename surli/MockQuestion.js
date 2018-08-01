import { speak } from './SurlisVoice.js'
import { listen } from './SurlisEars.js'
import { ask } from './SurlisVoice.js'
import { getRandom } from './Utilities.js'

export default class MockQuestion {
  constructor (phrase, validator, setAnswer) {
    this.phrase = phrase
    this.validator = validator
    this.setAnswer = setAnswer.bind(this)
    this.answer = ''
  }

  async ask () {
    const listenLoop = answer => {
        return new Promise((resolve, reject) => {
          const result = this.validator(answer)

          if (result === true) {
            resolve(answer)
          } else {
            reject(result)
          }
        })
      .then(this.setAnswer)
      .catch(error => {
        return speak(error)
          .then(listen)
          .then(listenLoop)
      })
    }

    return ask(this.phrase).then(listenLoop)
  }

  async recap () {
    const phrase = Array.isArray(this.phrase) ? this.phrase[0] : this.phrase

    const setups = [
      `I asked ${phrase}`,
      `The question was ${phrase}`,
      `${phrase} was the question`
    ]
    await speak(getRandom(setups))

    if (!this.answer) {
      const passes = [
        'You decided not to answer this one',
        'But you passed',
        'You were oddly silent on that',
        'But it was an ecumenical matter',
        "I couldn't get an answer out of you",
        '4 O 4 response not found'
      ]
      await speak(getRandom(passes))
    } else {
      let answer = this.answer

      if (typeof answer === 'boolean') {
        answer = answer ? 'yes' : 'no'
      }

      const responses = [
        `Your answer was ${answer}`,
        `You replied ${answer}`,
        `${answer} was your answer`,
        `You mumbled something like ${answer}`,
        `I think you said ${answer}`
      ]
      await speak(getRandom(responses))
    }
  }
}
