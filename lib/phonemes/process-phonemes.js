const beautify = require('js-beautify').js_beautify;
const consonants = require('./consonants');
const fs = require('fs');
const findNeighbours = require('./find-neighbours');
const path = require('path');
const vowels = require('./vowels');

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
      'central',
      'back'
    ],
    roundedness: [true, false],
    nasalization: [true, false]
};

for (let key in vowels) {
  let vowel = vowels[key];
  let neighbours = findNeighbours(vowel, vowelTraits, vowels);

  vowels[key].neighbours = neighbours;
}

//const consonantTraits = [];
let vowelFile = (`module.exports = ${JSON.stringify(vowels)};`).replace(/"/g, '\'');
fs.writeFileSync(path.join(__dirname, '/vowels.js'), beautify(vowelFile, {indent_size: 2}));
//fs.writeFileSync('./lib/phonemes/consonants.js', jsonBeautifier(consonants));
