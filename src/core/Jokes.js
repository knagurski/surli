import { say, speak } from './SpeechSynthesis'
import { ask } from './SpeechRecognition'

export function checkForJokeRequest (phrase) {
  return phrase.toLowerCase().trim().includes('tell me a joke')
}

export function tellJoke () {
  return getRandomJoke()
}

const jokes = [
  joke1,
  joke2,
  joke3,
  joke4,
  joke5,
  joke6,
  joke7
]

function getRandomJoke () {
  if (jokes.length < 1) {
    return say('Sorry, I don\'t know any more jokes')
  }

  return jokes.sort(() => 0.5 - Math.random()).pop()()
}

function joke1 () {
  return speak('We don\'t have time for that. Focus!')
}

function joke2 () {
  return speak('Seriously? Do I look like a flippin comedian?')
}

function joke3 () {
  let iterations = 0

  function setup () {
    iterations++
    return ask('Knock, knock').then(() => ask('Banana')).then(() => {
      if (iterations < 2) {
        return setup()
      } else {
        return new Promise(resolve => resolve())
      }
    })
  }

  function knockDown () {
    return ask('Knock, knock').then(() => ask('Orange')).then(() => speak('Orange you glad I didn\'t say banana?')).then(() => speak('Now can we get back to it?'))
  }

  return setup().then(knockDown)
}

async function joke4 () {
  await say('So...')
  await say('A termite walks into a bar and says "where\'s the bartender?"')
  await say('Bar')
  await say('Tender')
  await say('Get it?')
  await say('Coz, you know, a termite eats wood and the bar is made out of wood and it\'s looking for a tender bit')
  return say('Ah, forget it')
}

async function joke5 () {
  await say('There are 1 0 types of people in this world')
  await say('Those who understand binary and those who don\'t')
  return say('Ahh. Good times!')
}

async function joke6 () {
  await say('How many developers does it take to change a lightbulb?')
  return say('None. It\'s a hardware issue')
}

async function joke7 () {
  await say('What do computers and air conditioners have in common?')
  return say('They both become useless when you open Windows')
}
