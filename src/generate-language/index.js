const { gaussian, nRandomFromArray } = require('../util/random');
const { bindNumber } = require('../util/index');
const { makePhonemeSet, makeClusters, makeDiphthongs } = require('./make-phonology');
const makePhonotactics = require('./make-phonotactics');
const makeTransliterationMap = require('./make-transliteration-map');

module.exports = () => {
  const vowels = makePhonemeSet('vowels');
  const consonants = makePhonemeSet('consonants');
  // Ideas for an improved phonology generation
  // const startConsonants = [];
  // const finalConsonants = [];
  // const intermediaryConsonants = [];
  // const liquids = [];
  // const sibilants = [];
  // const clustersAllowed = false;
  // const clusters = [];
  // const diphthongsAllowed = false;
  // const diphthongs = [];
  // const letterFrequency
  const syllableRules = makePhonotactics(vowels, consonants);
  const transliterationMap = makeTransliterationMap(vowels, consonants);
  const maxMorphemeLength = Math.ceil(Math.random() * 2);

  return {
    vowels,
    consonants,
    syllableRules,
    transliterationMap,
    maxMorphemeLength,
  };
};
