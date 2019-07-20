const { gaussian, nRandomFromArray } = require('../util/random');
const { bindNumber } = require('../util/index');
const consonants = require('../constants/consonants');
const vowels = require('../constants/vowels');

const phonemes = {
  consonants,
  vowels,
};

const phonemicDistribution = {
  consonants: {
    min: 5,
    mean: 18,
    stdev: 8,
    max: 40,
  },
  vowels: {
    min: 3,
    mean: 14,
    stdev: 6,
    max: 20,
  },
};

/*
 * Returns an array of all phonemes allowed in a language
 */
module.exports.makePhonemeSet = function makePhonemeSet(type = 'consonants') {
  const distrib = phonemicDistribution[type];
  const standard = gaussian(distrib.mean, distrib.stdev);
  const number = bindNumber(standard(), distrib.min, distrib.max);

  return nRandomFromArray(Object.keys(phonemes[type]), number);
};
