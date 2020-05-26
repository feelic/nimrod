/* eslint-disable no-console */
const french = require('../languages/french');
const generateLanguage = require('../src/generate-language/index');
const transliterate = require('../src/use-language/transliterate');
const makeMorpheme = require('../src/use-language/make-morpheme');
const { setSeed } = require('../src/util/random');

const seed = process.argv[2] || 'coucou';

console.log(`creating language with seed "${seed}"`);
setSeed(seed);

const conLang = generateLanguage();

console.log(JSON.stringify(conLang, null, 2));

const lang = conLang;

const words = [2, 3, 4, 1, 2].map((len) => makeMorpheme(lang, len));
const translit = words.map((w) => transliterate(lang, w));

console.log(words.join(', '));
console.log(translit.join(', '));
