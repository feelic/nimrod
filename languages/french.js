const Language = require('../lib/language.js');
const options = {
  vowels: ['i', 'y', 'u', 'e', 'ø', 'ə', 'o', 'ɛ', 'œ', 'ɔ̜', 'ɛ̃', 'œ̃', 'ɔ̃', 'ɑ̃', 'a', 'ɑ'],
  consonants: ['m', 'n', 'ɲ', 'p', 't', 'k', 'b', 'd', 'g', 'f', 's', 'ʃ', 'v', 'z', 'ʒ', 'ʁ', 'l', 'j', 'ɥ', 'w'],
  syllableRules: {
    onset: {
      existence: () => true && Math.round(Math.random()),
      phonemes: [
        'm', 'n', 'ɲ', 'p', 't', 'k', 'b', 'd', 'g', 'f', 's', 'ʃ', 'v', 'z', 'ʒ', 'ʁ', 'l', 'j', 'w',
        'pl', 'kl', 'bl', 'gl', 'fl', 'sl', 'ʃl', 'vl',
        'pʁ', 'kʁ', 'tʁ', 'bʁ', 'dʁ', 'gʁ', 'fʁ', 'vʁ',
        'nɥ', 'pɥ', 'lɥ',
        'pt',
        'pn',
        'ps'
      ]
    },
    nucleus: {
      diphthong: () => true && Math.round(Math.random() * Math.random()),
      phonemes: ['i', 'y', 'u', 'e', 'ø', 'ə', 'o', 'ɛ', 'œ', 'ɔ̜', 'ɛ̃', 'œ̃', 'ɔ̃', 'ɑ̃', 'a', 'ɑ']
    },
    coda: {
      existence: () => true && Math.round(Math.random()),
      phonemes: ['m', 'n', 'ɲ', 'p', 't', 'k', 'b', 'd', 'g', 'f', 's', 'ʃ', 'v', 'z', 'ʒ', 'ʁ', 'l', 'j', 'w']
    }
  }
};

module.exports = new Language(options);
