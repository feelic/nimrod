const { random } = require('../util/random');
const { makePhonemeSet } = require('./make-phonology');

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
  // const syllableRules = makePhonotactics(vowels, consonants);
  // const transliterationMap = makeTransliterationMap(vowels, consonants);
  const maxMorphemeLength = Math.ceil(random() * 2);

  return {
    vowels,
    consonants,
    maxMorphemeLength,
  };
};
