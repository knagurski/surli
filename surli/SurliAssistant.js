import FormReader from './FormReader.js'
import { speak, ask } from './SurlisVoice.js'
import { pause, isYes } from './Utilities.js'

export default class SurliAssistant extends HTMLElement {
  /**
   * @return {string[]}
   */
  static get observedAttributes () {
    return ['form']
  }

  constructor () {
    super()

    this.attachShadow({mode: 'open'})
  }

  /**
   * @return {FormReader}
   */
  get formReader () {
    if (!this.formReaderInstance) {
      this.formReaderInstance = new FormReader
    }

    return this.formReaderInstance
  }

  /**
   * @param {HTMLFormElement|Element} formElement
   */
  initForm (formElement) {
    this.questions = this.formReader.setForm(formElement).questions.slice(3)
    this.start()
  }

  start () {
    this.introduction()
      .then(() => this.askQuestions())
      .then(() => this.confirm())
      .then(() => this.wrapUp())
  }

  get productName () {
    return document.querySelector('.bv-subject-name-header').textContent.trim()
  }

  /**
   * @param {string} attrName
   * @param {string} oldVal
   * @param {string} newVal
   */
  attributeChangedCallback (attrName, oldVal, newVal) {
    switch (attrName) {
      case 'form':
        this.initForm(document.querySelector(newVal))
        break;
    }
  }

  introduction() {
    return pause(1)
      .then(() => speak("Hi there, I'm Surli"))
//      .then(() => speak('I can help you fill in your review'))
//      .then(() => speak(`Wow, looks like you got to try out some ${this.productName}`))
//      .then(() => speak('Nice!'))
  }

  async askQuestions() {
    for (let x = 0; x < this.questions.length; x++) {
      await this.questions[x].ask()
    }

    return speak("Well, that's all the questions I have")
  }

  async confirm() {
    if (await ask('Do you want me to go over things?').then(isYes)) {
      await speak('Ok, from the start...')

      for (let x = 0; x < this.questions.length; x++) {
        await this.questions[x].recap()
      }

      await speak('And there ya go')
    }
  }

  wrapUp() {
    return speak("Cool, that's us done. Thanks for the review!")
  }
}
