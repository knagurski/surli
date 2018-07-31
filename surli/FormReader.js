import MockQuestion from './MockQuestion.js'
import { between, isYes, isNo, parseNumber, wordCount, isSkip, parseGender, ucFirst, parseUsage } from './Utilities.js'
import { speak } from './SurlisVoice.js'
export default class FormReader {

  /**
   * @param {HTMLFormElement} form
   */
  setForm (form) {
    this.form = form
    return this
  }

  get questions () {
    const form = this.form

    return [
      new MockQuestion(
        'Out of 5, what is your overall rating?',
        answer => !isNaN(parseNumber(answer)) && between(parseNumber(answer), 1, 5) ? true : 'Your answer should be between 1 and 5',
        answer => {
          this.answer = parseNumber(answer)
          form.querySelector(`input[name="rating"][value="${this.answer}"`).checked = true

          if (this.answer === 1) {
            return speak('Oh, 1 star. Ummm... carrying on')
          } else if (this.answer === 2) {
            return speak('Ok, 2 stars. Well, not a great score')
          } else if (this.answer === 5) {
            return speak('Wow 5 stars! Nice! Can I try it out?')
          }

          return speak(`Cool, ${this.answer} stars`)
        }
      ),
      new MockQuestion(
        'What title do you want to give this review?',
        answer => wordCount(answer) > 2 ? true : 'What about something longer and more descriptive?',
        answer => {
          this.answer = ucFirst(answer)
          form.querySelector('input[name="title"]').value = this.answer
        }
      ),
      new MockQuestion(
        'So, what did you think of it? Try to be as descriptive as possible',
        answer => wordCount(answer) > 5 ? true : 'Oh come on, you can do better than that. I need more than 5 words for a review',
        answer => {
          this.answer = ucFirst(answer)
          form.querySelector('textarea[name="reviewtext"]').value = this.answer
        }
      ),
      new MockQuestion(
        'Would you recommend this product to a friend?',
        answer => isYes(answer) || isNo(answer) ? true : 'Was that a yes or no?',
        answer => {
          this.answer = isYes(answer)

          if (this.answer) {
            document.querySelector(
              'input[name="isrecommended"][value="true"]').checked = true
          } else {
            document.querySelector(
              'input[name="isrecommended"][value="false"]').checked = true
          }
        }
      ),
      new MockQuestion(
        'How would you like your name to appear in the review?',
        () => true,
        answer => {
          this.answer = ucFirst(answer)
          form.querySelector('input[name="usernickname"]').value = this.answer
        }
      ),
      new MockQuestion(
        "What's your location?",
        () => true,
        answer => {
          if (isSkip(answer)) {
            return speak('Ok, skipping this one')
          }

          this.answer = answer
          form.querySelector('input[name="userlocation"]').value = this.answer
        }
      ),
      new MockQuestion(
        'How old are you?',
        answer => {
          return isSkip(answer) || (!isNaN(parseNumber(answer)) && between(parseNumber(answer), 1, 130))
            ? true
            : 'Go on, tell me'
        },
        async answer => {
          if (isSkip(answer)) {
            return speak('Ok, fair enough. Just remember, age is just a number!')
          }

          this.answer = parseNumber(answer)
          await speak(`Wow, you don't look a day over ${this.answer - 1}`)

          const target = form.querySelector('select[name="contextdatavalue_Age"]')

          const opt = Array.from(target.options).find(opt => {
            if (!opt.value) {
              return false
            }

            let lower
            let upper

            if (opt.value.match(/orUnder$/)) {
              lower = 0
              upper = /^\d+/.exec(opt.value)[0]
            } else if (opt.value.match(/orOver$/)) {
              lower = /^\d+/.exec(opt.value)[0]
              upper = 130
            } else {
              const parts = /^(\d+)to(\d+)$/.exec(opt.value)
              lower = parts[1]
              upper = parts[2]
            }

            return between(this.answer, lower, upper)
          })

          opt.selected = true
        }
      ),
      new MockQuestion(
        'What is your gender',
        answer => isSkip(answer) || parseGender(answer) ? true : "Sorry, are you male or female. It's totally fine if you don't want to answer this",
        answer => {
          if (isSkip(answer)) {
            return speak('No problem. Sorry, I had to ask')
          }

          this.answer = parseGender(answer)

          form.querySelector(`select[name="contextdatavalue_Gender"] option[value="${this.answer}"]`).selected = true
        }
      ),
      new MockQuestion(
        'Out of 5, how would you rate the quality of this product?',
        answer => {
          return isSkip(answer) || (!isNaN(parseNumber(answer)) && between(parseNumber(answer), 1, 5))
            ? true
            : 'Can you give me a number between 1 and 5?'
        },
        answer => {
          if (isSkip(answer)) {
            return speak('Spoilsport')
          }

          this.answer = parseNumber(answer)

          form.querySelector(`input[name="rating_Quality"][value="${this.answer}"]`).checked = true
        }
      ),
      new MockQuestion(
        'Out of 5, how would you rate the value of this product?',
        answer => {
          return isSkip(answer) || (!isNaN(parseNumber(answer)) && between(parseNumber(answer), 1, 5))
            ? true
            : 'Can you give me a number between 1 and 5?'
        },
        answer => {
          if (isSkip(answer)) {
            return speak('Fine, be that way')
          }

          this.answer = parseNumber(answer)

          form.querySelector(`input[name="rating_Value"][value="${this.answer}"]`).checked = true
        }
      ),
      new MockQuestion(
        [
          'How often do you use this product?',
          'Daily',
          'A few times per week',
          'Once per month',
          'Or monthly?'
        ],
        answer => {
          return isSkip(answer) || parseUsage(answer)
            ? true
            : 'You can choose daily, a few times per week, once per month or monthly'
        },
        answer => {
          if (isSkip(answer)) {
            return speak('Fine, be that way')
          }

          this.answer = parseUsage(answer)

          Array.from(form.querySelector(`select[name="contextdatavalue_HowOftenDoYouUseThisProduct"]`).options).find(opt => {
            return this.answer === opt.textContent.trim()
          }).selected = true
        }
      )
    ]
  }
}
