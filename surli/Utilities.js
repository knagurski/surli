export function parseNumber (input) {
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
    case 'skip':
    case 'next question':
      return true
  }

  return false
}

export function parseGender (answer) {
  switch (answer.trim().toLowerCase().replace(/^i'm /, '').replace(/^i am /, '').replace(/^a /, '')) {
    case 'male':
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
