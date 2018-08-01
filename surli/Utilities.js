export function parseNumber (input) {
  if (typeof input === 'string') {
    input = input.toLowerCase().trim().replace(/ stars?$/, '')
  }

  if (typeof input === 'number' ||
    (!isNaN(parseInt(input)) && parseInt(input) !== 0)
  ) {
    return parseInt(input)
  }

  switch (input.toLowerCase().trim()) {
    case '0':
    case 'zero':
    case 'naught':
    case 'not':
      return 0

    case '1':
    case 'one':
      return 1

    case '2':
    case 'two':
    case 'too':
    case 'to':
      return 2

    case '3':
    case 'three':
      return 3

    case '4':
    case 'four':
    case 'for':
      return 4

    case '5':
    case 'five':
      return 5

    case '6':
    case 'six':
      return 6

    case '7':
    case 'seven':
      return 7

    case '8':
    case 'eight':
    case 'ate':
      return 8

    case '9':
    case 'nine':
      return 9
  }

  return NaN;
}

export function between (subject, low, high) {
  return subject >= low && subject <= high
}

export function wordCount (subject) {
  return subject.split(/\s/).length
}

export function isYes (answer) {
  switch (answer.trim().toLowerCase()) {
    case 'sure':
    case 'yeah':
    case 'yup':
    case 'yup':
    case 'absolutely':
    case 'let\'s do this':
    case 'let\'s do this thing':
    case 'yes':
    case 'affirmative':
    case 'damn right':
    case 'heck yeah':
      return true
  }

  return false
}

export function isNo (answer) {
  switch (answer.trim().toLowerCase()) {
    case 'nope':
    case 'nah':
    case 'not really':
    case 'no':
    case 'absolutely not':
    case 'no way':
    case 'not a chance':
    case 'hell no':
    case 'negative':
    case 'fuck off':
    case 'f*** off':
    case 'clear off':
    case 'piss off':
      return true
  }

  return false
}

export function pause (seconds) {
  return new Promise(resolve => {
    console.log(`pausing for ${seconds} second(s)`)
    setTimeout(resolve, seconds * 1000)
  })
}

export function isSkip (answer) {
  if (isNo(answer)) {
    return true
  }

  switch (answer.trim().toLowerCase()) {
    case 'no thanks':
    case 'pass':
    case 'skip':
    case 'next question':
    case 'none of your business':
    case 'none of your bees wax':
    case 'none of your beeswax':
      return true
  }

  return false
}

export function parseGender (answer) {
  switch (answer.trim().toLowerCase().replace(/^i'm /, '').replace(/^i am /, '').replace(/^a /, '')) {
    case 'male':
    case 'mail':
    case 'man':
    case 'dude':
    case 'fella':
    case 'biological male':
    case 'm':
    case 'boy':
    case 'guy':
      return 'Male'

    case 'female':
    case 'woman':
    case 'dudette':
    case 'girl':
    case 'f':
    case 'lady':
    case 'biological female':
      return 'Female'
  }

  return false
}

export function ucFirst (answer) {
  return answer.charAt(0).toUpperCase() + answer.slice(1)
}

export function parseUsage (answer) {
  switch (answer.trim().toLowerCase()) {
    case 'daily':
    case 'a few times a day':
    case 'a few times per day':
      return 'Daily'

    case 'a few times per week':
    case 'a few times a week':
      return 'A few times per week'

    case 'weekly':
    case 'once per week':
    case 'once a week':
    case 'one time per week':
    case 'one time a week':
    case '1 time a week':
    case '1 time per week':
      return 'Once per week'

    case 'monthly':
    case 'once a month':
    case 'once per month':
    case 'a few times a month':
    case 'a few times per month':
    case 'one time a month':
    case 'one time per month':
    case '1 time a month':
    case '1 time per month':
      return 'Monthly'
  }

  return false
}

export function isRequestForJoke (answer) {
  switch (answer.trim().toLowerCase()) {
    case 'tell me a joke':
      return true
  }

  return false
}

export function isRequestToRepeat (answer) {
  switch (answer.trim().toLowerCase()) {
    case 'can you repeat that':
    case 'what did you say':
    case 'what was that':
    case 'can you repeat the last question':
    case 'repeat':
    case 'repeat that':
    case 'say again':
    case 'what was the question':
      return true
  }

  return false
}

export function getRandomIndex (array) {
  return Math.floor(array.length * Math.random())
}

export function getRandom(array) {
  if (array.length === 0) {
    return
  } else {
    return array[getRandomIndex(array)]
  }
}

export function isGood (answer) {
  switch (answer.trim().toLowerCase()) {
    case 'good':
    case "that's good":
    case 'better':
    case 'much better':
    case 'perfect':
      return true
  }

  return false
}

export function isAbort (answer) {
  switch (answer.trim().toLowerCase()) {
    case 'abort':
    case 'cancel':
    case 'never mind':
      return true
  }

  return false
}

export function isRequestToSpeakSlower (answer) {
  switch (answer.trim().toLowerCase()) {
    case 'can you speak slower':
    case 'can you talk slower':
    case 'you speak too fast':
    case 'you talk too fast':
    case "you're speaking too fast":
    case "you're talking too fast":
    case 'speak slower':
    case 'talk slower':
      return true
  }

  return false
}

export function isRequestToSpeakFaster (answer) {
  switch (answer.trim().toLowerCase()) {
    case 'can you speak faster':
    case 'can you talk faster':
    case 'you speak too slow':
    case 'you talk too slow':
    case "you're speaking too slow":
    case "you're talking too slow":
    case 'speak faster':
    case 'talk faster':
      return true
  }

  return false
}

export function isRequestToChangeVoice (answer) {
  switch (answer.trim().toLowerCase()) {
    case 'change voice':
    case 'use a different voice':
    case 'change your voice':
    case 'can you change your voice':
    case 'different voice':
      return true
  }

  return false
}
