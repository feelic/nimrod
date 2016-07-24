const Language = require('../lib/language.js');
const options = {
  'vowels': ['i', 'y', 'u', 'e', 'ø', 'ə', 'o', 'ɛ', 'œ', 'ɔ', 'ɛ̃', 'ɔ̃', 'ɑ̃', 'a', 'ɑ'],
  'consonants': ['m', 'n', 'ɲ', 'p', 't', 'k', 'b', 'd', 'g', 'f', 's', 'ʃ', 'v', 'z', 'ʒ', 'ʁ', 'l'],
  'syllableRules': {
    'standard': {
      'onset': {
        'existence': () => true && Math.round(Math.random()),
        'phonemes': [
          'm', 'n', 'ɲ', 'p', 't', 'k', 'b', 'd', 'g', 'f', 's', 'ʃ', 'v', 'z', 'ʒ', 'ʁ', 'l',
          'pl', 'kl', 'bl', 'gl', 'fl', 'sl', 'ʃl',
          'pʁ', 'kʁ', 'tʁ', 'bʁ', 'dʁ', 'gʁ', 'fʁ', 'vʁ',
          'nɥ', 'pɥ', 'lɥ',
          'pt',
          'pn',
          'ps'
        ]
      },
      'nucleus': {
        'diphthong': () => false,
        'phonemes': ['i', 'y', 'u', 'e', 'ø', 'ə', 'o', 'ɛ', 'œ', 'ɔ', 'ɛ̃', 'œ̃', 'ɔ̃', 'ɑ̃', 'a', 'ɑ']
      },
      'coda': {
        'existence': () => true && Math.round(Math.random() * Math.random()),
        'phonemes': ['m', 'n', 'p', 't', 'k', 'd', 'g', 'f', 's', 'ʃ', 'v', 'z', 'ʁ', 'l']
      }
    }
  },
  'transliteration': {
    'i': 'i', 'y': 'u', 'u': 'ou', 'e': 'é', 'ø': 'e', 'ə': 'e',
    'o': 'o', 'ɛ': 'è', 'œ': 'eu', 'ɔ': 'au', 'ɛ̃': 'in', 'œ̃': 'un',
    'ɔ̃': 'on', 'ɑ̃': 'an', 'a': 'a', 'ɑ': 'a', 'm': 'm', 'n': 'n',
    'ɲ': 'gn', 'p': 'p', 't': 't', 'k': 'k', 'b': 'b', 'd': 'd',
    'g': 'g', 'f': 'f', 's': 's', 'ʃ': 'ch', 'v': 'v', 'z': 'z',
    'ʒ': 'j', 'ʁ': 'r', 'l': 'l', 'j': 'y', 'ɥ': 'u', 'w': 'w'
  }
};

module.exports = new Language(options);
