const Table = require('cli-table');
const { bindInteger } = require('../util/integer');
const { gaussian } = require('../util/random');
const phonemes = require('../phonemes');
const { nRandomFromArray } = require('../util/random');
const { nRandomFromObject } = require('../util/random');
const { randomWithCoef } = require('../util/random');
const traits = require('../phonemes/traits');

function makePhonemeSet(type) {
  const distrib = phonemicDistribution[type];
  const standard = gaussian(distrib.mean, distrib.stdev);
  const number = bindInteger(standard(), distrib.min, distrib.max);

  return nRandomFromObject(phonemes[type], number);
}

function makePhonology(presets) {
  const diphthongs = presets.diphthongs || true;
  const clusters = presets.clusters || true;
  const restrictIntermediaries = preset.restrictIntermediaries || true;

  const phonemicDistribution = {
    consonants: {
      min: 5, mean: 20, stdev: 8, max: 50,
    },
    vowels: {
      min: 3, mean: 16, stdev: 6, max: 30,
    },
  };
  const phonology = {
    startConsonants: [],
    finalConsonants: [],
    intermediaryConsonants: [],
    liquids: [],
    sibilants: [],
    semivowels: [],
    vowels: [],
  };
  const vowels = this.makePhonemeSet('vowels');
  const consonants = this.makePhonemeSet('consonants');
}

function makePhonotactics() {}
