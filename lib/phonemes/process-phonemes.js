const beautify = require('js-beautify').js_beautify;
const fs = require('fs');
const path = require('path');
const consonants = require('./consonants');
const findNeighbours = require('./find-neighbours');
const vowels = require('./vowels');

const vowelTraits = require('./traits').vowels;

for (const key in vowels) {
  const vowel = vowels[key];
  const neighbours = findNeighbours(vowel, vowelTraits, vowels);

  vowels[key].neighbours = neighbours;
}

// const consonantTraits = [];
const vowelFile = `module.exports = ${JSON.stringify(vowels)};`.replace(/"/g, "'");
fs.writeFileSync(path.join(__dirname, '/vowels.js'), beautify(vowelFile, { indent_size: 2 }));
// fs.writeFileSync('./lib/phonemes/consonants.js', jsonBeautifier(consonants));