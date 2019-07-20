const consonants = require('../constants/consonants');
const vowels = require('../constants/vowels');

/*
 * Return the ASCII/std latin character values for phonemes in the language
 */
module.exports = function makeTransliterationMap(languageVowels, languageConsonants) {
  return {
    ...languageVowels.reduce(
      (prev, symbol) => ({ ...prev, [symbol]: vowels[symbol].translit }),
      {},
    ),
    ...languageConsonants.reduce(
      (prev, symbol) => ({ ...prev, [symbol]: consonants[symbol].translit }),
      {},
    ),
  };
};
