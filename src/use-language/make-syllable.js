const { randomWithCoef } = require('../util/random');

module.exports = function makeSyllable(lang, position = 'standard') {
  const { syllableRules, consonants, vowels } = lang;
  const rules = syllableRules[position];

  if (!rules) {
    throw new Error('Syllable rules must exist before creating syllables');
  }
  const syllable = [];

  if (rules.onset.existence()) {
    syllable.push(randomWithCoef(consonants));
  }

  syllable.push(randomWithCoef(vowels));

  if (rules.coda.existence()) {
    syllable.push(randomWithCoef(consonants));
  }

  return syllable;
};
