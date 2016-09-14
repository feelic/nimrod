const bindInteger = require('../util/integer').bindInteger;
const gaussian = require('../util/random').gaussian;
const phonemes = require('../phonemes');
const nRandomFromArray = require('../util/random').nRandomFromArray;
const nRandomFromObject = require('../util/random').nRandomFromObject;
const randomWithCoef = require('../util/random').randomWithCoef;
const Table = require('cli-table');
const traits = require('../phonemes/traits');

function makePhonemeSet (type) {
  let distrib = phonemicDistribution[type];
  let standard = gaussian(distrib.mean, distrib.stdev);
  let number = bindInteger(standard(), distrib.min, distrib.max);

  return nRandomFromObject(phonemes[type], number);
}

function makePhonology (presets) {
  const diphthongs = presets.diphthongs || true;
  const clusters = presets.clusters || true;
  const restrictIntermediaries = preset.restrictIntermediaries || true;

  const phonemicDistribution = {
    'consonants': {'min': 5, 'mean': 20, 'stdev': 8, 'max': 50},
    'vowels': {'min': 3, 'mean': 16, 'stdev': 6, 'max': 30}
  };
  const phonology = {
    'startConsonants': [],
    'finalConsonants': [],
    'intermediaryConsonants': [],
    'liquids': [],
    'sibilants': [],
    'semivowels': [],
    'vowels': []
  };
  const vowels = this.makePhonemeSet('vowels');
  const consonants = this.makePhonemeSet('consonants');
}

function makePhonotactics () {

}
