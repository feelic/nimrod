const { random } = require('../util/random');

module.exports = function makeSyllable(syllableRules, position = 'standard') {
  const rules = syllableRules[position];

  if (!rules) {
    throw new Error('Syllable rules must exist before creating syllables');
  }

  let syllable = '';

  if (rules.onset.existence()) {
    syllable += rules.onset.phonemes[Math.floor(random() * rules.onset.phonemes.length)];
  }

  syllable += rules.nucleus.phonemes[Math.floor(random() * rules.nucleus.phonemes.length)];

  if (rules.coda.existence()) {
    syllable += rules.coda.phonemes[Math.floor(random() * rules.coda.phonemes.length)];
  }

  return syllable;
};
