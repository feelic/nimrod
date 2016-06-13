const consonants = require('./lib/phonemes/consonants');
const fs = require('fs');
const jsonBeautifier = require('./lib/json-beautifier');
const vowels = require('./lib/phonemes/vowels');


const vowelTraits = {
    height: [
      'close',
      'near-close',
      'close-mid',
      'mid',
      'open-mid',
      'near-open',
      'open'
    ],
    backness: [
      'front',
      'near-front',
      'central',
      'near-back',
      'back'
    ],
    roundedness: [true, false],
    nasalization: [true, false]
};

const consonantTraits = [];

fs.writeFileSync('./lib/phonemes/vowels.js', jsonBeautifier(vowels));
fs.writeFileSync('./lib/phonemes/consonants.js', jsonBeautifier(consonants));
