const { random, randomWithCoef } = require('../util/random');

module.exports = function makeMorpheme(lang, length) {
  const morpheme = [];

  const phonemeTypes = ['vowels', 'consonants'];
  let nextPhoneme = Math.round(random());

  if (length === 1) {
    nextPhoneme = 0;
  }

  for (let i = 0; i < length; i += 1) {
    const phonemeType = phonemeTypes[nextPhoneme];

    morpheme.push(randomWithCoef(lang[phonemeType]));

    nextPhoneme = (nextPhoneme + 1) % 2;
  }

  return morpheme;
};
