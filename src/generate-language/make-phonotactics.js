const { random } = require('../util/random');
/*
 * Return rules for forming syllables in the language
 * there are 3 types of syllables, depending on the position in the word:
 * initial, standard and final
 * Within a syllable there are up to 3 parts:
 * onset, nucleus and coda
 */
module.exports = function makePhonotactics(vowels, consonants) {
  return {
    initial: makeSyllableRules(vowels, consonants),
    standard: makeSyllableRules(vowels, consonants),
    final: makeSyllableRules(vowels, consonants),
  };
};

function makeSyllableRules(vowels, consonants) {
  return {
    onset: {
      existence: () => true && Math.round(random()),
      phonemes: consonants,
    },
    nucleus: {
      phonemes: vowels,
    },
    coda: {
      existence: () => true && Math.round(random() * random()),
      phonemes: consonants,
    },
  };
}
