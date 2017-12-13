import { ask, askNumber, confirm, phraseIsAffirmative } from './SpeechRecognition'
import { say } from './SpeechSynthesis'

async function askForName () {
  function askLoop () {
    return ask('What\'s your name?').then(response => confirm(response, `So, your name is "${response}"? Is that right?`)).catch(askLoop)
  }

  const name = await askLoop()

  return name
}

export default class Surli {
  constructor (user) {
    this.user = user
    this.speaking = false
    this.listening = false
    this.lastThingSpoken = ''
    this.lastThingHeard = ''
  }

  async init () {
    if (!this.initialised) {
      this.initialised = true
      await this.welcome()

      const goForIt = await ask(`Hey, ${this.user.name}, since we're friends and all. Do you fancy leaving a review?`).then(answer => phraseIsAffirmative(answer))

      if (goForIt) {
        await say('Awesome, let\'s do this thing')
      } else {
        await say('Well, tough, that\'s what you\'re here for!')
      }

      await this.leaveReview()
      await this.allDone()
    }
  }

  async welcome () {
    if (!this.user.name) {
      this.user.name = await askForName()
    }

    await say(`Well hello there, ${this.user.name}!`)
    await say('This sure is a nice computer!')
  }

  async leaveReview () {
    const stars = await askNumber('So, out of 5, how many stars would you give this?')

    if (stars >= 5) {
      await say(`Wow, ${stars} stars, you must love it!`)
    } else if (stars >= 3) {
      await say(`Cool, so ${stars} stars. Nice!`)
    } else if (stars > 0) {
      await say(`Ok, ${stars}, that's not great`)
    } else {
      await say('Dang! Well... um... well this is awkward')
    }

    await say('Now lets go into some detail')

    if (stars > 4 || stars < 2) {
      await say('I think I already know the answer to this, but I gotta ask')
    }

    const recommendation = await this.recommend()
    recommendation.stars = stars

    return this.confirmReview(recommendation)
  }

  async recommend () {
    const wouldRecommend = await ask('Would you recommend this to a friend?').then(answer => phraseIsAffirmative(answer))
    const reason = await ask('Any particular reason for that?')

    await say('Ok, so let me just confirm this.')

    const wouldWouldnt = wouldRecommend ? 'would' : 'wouldn\'t'

    return confirm(
      {wouldRecommend, reason},
      `You ${wouldWouldnt} recommend this to a friend because "${reason}". Is that correct?`
    ).catch(this.recommend.bind(this))
  }

  async confirmReview (review) {
    await say('Right, so let\'s just go over this one more time and then we\'re done')

    await say(`So, you gave this ${review.stars} stars`)
    await say(`You'd ${review.wouldRecommend ? 'totally' : 'not'} recommend this to a friend`)
    await say(`And that was because "${review.reason}"`)
    const correct = await ask('Does that sound right?').then(response => phraseIsAffirmative(response))

    if (correct) {
      return say('Cool!')
    } else {
      await say('Well, that\'s a bummer')
      await say('I suppose we\'d better start again')
      return this.leaveReview()
    }
  }

  async allDone () {
    await say(`Well, ${this.user.name}, it looks like we're all done here`)
    await say('Give my best to the wife and kids')
    await say('And, as someone smarter than me once said...')
    await say('Be excellent to each other!')
  }
}
