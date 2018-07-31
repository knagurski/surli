export default class Question {
  constructor (el) {
    this.phrase = this.getPhrase(el)
    this.target = this.getTarget(el)
  }

  getPhrase (el) {
    const label = el.querySelector('.bv-fieldset-label-text')

    return label ? label.textContent : 'Nope'
  }

  getTarget (el) {
    if (el.classList.contains('bv-radio-field')) {

    } else if (el)

    return Array.from(el.querySelectorAll('.bv-text,.bv-textarea-field-reviewtext,.bv-radio-input'))
      .filter(input => input.getAttribute('type') !== 'hidden')
  }
}
