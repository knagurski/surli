export function parseNumber (input) {
  if (typeof input === 'number' ||
    (!isNaN(parseInt(input)) && parseInt(input) !== 0)
  ) {
    return input
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
