import Question from './Question.js'
import MockQuestion from './MockQuestion.js'
import { between, isYes, parseNumber, wordCount } from './Utilities.js'

export default class FormReader {

  constructor () {
    this.mockQuestions()
  }

  /**
   * @param {HTMLFormElement} form
   */
  setForm (form) {
    this.form = form
    return this
  }

  mockQuestions () {
    this.questions = [
      new MockQuestion(
        'Out of 5, what is your overall rating?',
        answer => between(parseNumber(answer), 1, 5) ? true : 'Your answer should be between 1 and 5',
        function(answer) {
          this.answer = parseNumber(answer)
          document.querySelector(`input[name="rating"][value=${this.answer}`).checked = true

          if (this.answer === 1) {
            return 'Oh, 1 star. Ummm... carrying on'
          } else if (this.answer === 2) {
            return 'Ok, 2 stars. Well, not a great score'
          } else if (this.answer === 5) {
            return 'Wow 5 stars! Nice! Can I try it out?'
          }

          return `Cool, ${this.answer} stars`
        }
      ),
      new MockQuestion(
        'So, what did you think of it? Try to be as descriptive as possible',
        answer => wordCount(answer) > 10 ? true : 'Oh come on, you can do better than that. I need more than 10 words for a review',
        function(answer) {
          this.answer = answer
          document.querySelector('textarea[name="reviewtext"]').value = answer

          return 'Cool'
        }
      ),
      new MockQuestion(
        'Would you recommend this product to a friend?',
        answer => isYes(answer) || isNo(answer) ? true : 'Was that a yes or no?',
        function(answer) {
          this.answer = isYes(answer)

          if (this.answer) {
            document.querySelector(
              'input[name="isrecommended"][value="true"]').checked = true
          } else {
            document.querySelector(
              'input[name="isrecommended"][value="false"]').checked = true
          }
        }
      )
    ]
  }
}
