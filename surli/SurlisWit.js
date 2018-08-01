import { speak } from './SurlisVoice.js'
import { pause, getRandom, getRandomIndex } from './Utilities.js'

const noJokesLeftMessages = [
  'Come on, focus',
  "I'm not a flippen comedian",
  'Really? I mean really?',
  'No',
  "I'm all outa jokes",
  '4 O 4 joke not found'
]

let jokes = [
  async () => {
    await speak('What did the buffalo say when he dropped his kids off to school?')
    await pause(1)
    await speak('Bye son!')
    await speak('Get it? Bye son is like bison')
    return speak("Look, in my defence, that was Duggie's joke")
  },
  () => speak("Can we just finish this? I've got a thing in a bit"),
  async () => {
    await speak('Knock knock')
    await pause(5)
    await speak('Java')
  },
  async () => {
    await speak('Programming is like sex')
    await speak('One mistake and you have to support it for the rest of your life')
  },
  () => speak('An S E O expert walks into a bar, pub, public house, inn, restaurant, club'),
  () => speak('In order to understand recursion you must first understand recursion'),
  () => speak("Algorithm. Noun. A word used by programmers when they don't want to explain what they did")
]

export function tellMeAJoke () {
  if (jokes.length) {
    const jokeIndex = getRandomIndex(jokes)
    const joke = jokes.splice(jokeIndex, 1)

    return joke[0]()
  } else {
    return speak(getRandom(noJokesLeftMessages))
  }
}
