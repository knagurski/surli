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
  () => speak("Algorithm. Noun. A word used by programmers when they don't want to explain what they did"),
  async () => {
    await speak("What's the difference between chopped beef and pea soup?")
    await speak("You can chop beef but you can't pee soup")
  },
  async () => {
    await speak("What's blue and smells like red paint?")
    await speak('Blue paint')
    await speak('Sorry, that was courtesy of Matthew')
  },
  async () => {
    await speak("What type of cheese doesn't belong to you?")
    await speak('Nacho cheese')
  },
  async () => {
    await speak('How does a rabbi make his coffee?')
    await speak('Hebrews it')
  },
  () => speak('Thanks for telling me the definition of the word many. It means a lot'),
  async () => {
    await speak("What do you call something that's Irish and likes to sit outside?")
    await speak("Paddy O'Furniture")
  },
  async () => {
    await speak("What's the best thing about Switzerland?")
    await speak("I don't know but their flag is a big plus")
    await pause(2)
    await speak("I'm sorry, that was Laura's joke")
    await speak("This is why we can't have nice things")
  }
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
