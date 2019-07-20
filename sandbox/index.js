/* eslint-disable no-console */
const french = require('../languages/french');
const generateLanguage = require('../src/generate-language/index');
const makeSyllable = require('../src/use-language/make-syllable');
const transliterate = require('../src/use-language/transliterate');

const conLang = generateLanguage();

// console.log(JSON.stringify(conLang, null, 2));

const lang = conLang;

const syllable = makeSyllable(lang.syllableRules, 'initial');
const syllable2 = makeSyllable(lang.syllableRules);
const word = syllable + syllable2;

console.log(word);
console.log(transliterate(lang.transliterationMap, word));
