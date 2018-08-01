export default class SurlisUI extends HTMLElement {
  static get observedAttributes () {
    return ['listening', 'phrase']
  }

  constructor () {
    super()

    const shadow = this.attachShadow({mode: 'open'})

    const styles = document.createElement('link')
    styles.setAttribute('href', './surli/surli.css')
    styles.setAttribute('rel', 'stylesheet')
    shadow.appendChild(styles)

    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')

    this.iconEl = document.createElement('div')
    this.iconEl.classList.add('icon')
    wrapper.appendChild(this.iconEl)

    this.phraseEl = document.createElement('div')
    this.phraseEl.classList.add('phrase')
    wrapper.appendChild(this.phraseEl)

    shadow.appendChild(wrapper)
  }

  attributeChangedCallback () {
    this.render()
  }

  get listening () {
    return this.getAttribute('listening') === 'true'
  }

  get phrase () {
    return this.getAttribute('phrase') || ''
  }

  render () {
    this.iconEl.classList.toggle('icon__listening',  this.listening)
    this.phraseEl.textContent = this.phrase
  }
}

customElements.define('surli-ui', SurlisUI)
