const bindInteger = require('./util/integer').bindInteger;
const gaussian = require('./util/random').gaussian;
const phonemes = require('./phonemes');
const nRandomFromArray = require('./util/random').nRandomFromArray;
const nRandomFromObject = require('./util/random').nRandomFromObject;
const randomWithCoef = require('./util/random').randomWithCoef;

const phonemicDistribution = {
  'consonants': {
    'min': 5,
    'mean': 20,
    'stdev': 8,
    'max': 50
  },
  'vowels': {
    'min': 3,
    'mean': 16,
    'stdev': 6,
    'max': 30
  }
};

module.exports = class Language {
  constructor (options = {}) {
    this.vowels = options.vowels || this.makePhonemeSet('vowels');
    this.consonants = options.consonants || this.makePhonemeSet('consonants');
    this.syllableRules = options.syllableRules || this.makeSyllableRules();
  }

  makePhonemeSet (type) {
    let distrib = phonemicDistribution[type];
    let standard = gaussian(distrib.mean, distrib.stdev);
    let number = bindInteger(standard(), distrib.min, distrib.max);

    return nRandomFromObject(phonemes[type], number);
  }

  makeSyllableRules() {
    let standard = gaussian(0.9, 0.12, false);
    let allowedOnsetsNumber = Math.round(this.consonants.length * bindInteger(standard(), 0, 1));
    let allowedCodasNumber = Math.round(this.consonants.length * bindInteger(standard(), 0, 1));

    return {
      'onset': {
        'existence': randomWithCoef([
          {'value': () => true, 'coef': 5},
          {
            'value': () => true && Math.round(Math.random()),
            'coef': 10
          },
          {'value': () => false, 'coef': 1}]),
        'consonantCluster': randomWithCoef([
          {'value': () => () => true && Math.round(Math.random()), 'coef': 2},
          {'value': () => false, 'coef': 1}
        ]),
        'phonemes': nRandomFromArray(this.consonants, allowedOnsetsNumber)
      },
      'nucleus': {
        'diphthong': randomWithCoef([
          {'value': () => true && Math.round(Math.random()), 'coef': 2},
          {'value': () => false, 'coef': 1}
        ]),
        'phonemes': this.vowels
      },
      'coda': {
        'existence': randomWithCoef([
          {'value': () => true, 'coef': 1},
          {
            'value': () => true && Math.round(Math.random()),
            'coef': 10
          },
          {'value': () => false, 'coef': 5}
        ]),
        'phonemes': nRandomFromArray(this.consonants, allowedCodasNumber)
      }
    };
  }

  makeSyllable () {
    const rules = this.syllableRules;
    let syllable = '';

    if (! rules) {
      throw new Error('Syllable rules must exist before creating syllables');
    }

    if (rules.onset.existence()) {
      syllable += rules.onset.phonemes[Math.floor(Math.random() * rules.onset.phonemes.length)];

      if (rules.onset.consonantCluster()) {
        syllable += rules.onset.phonemes[Math.floor(Math.random() * rules.onset.phonemes.length)];
      }
    }

    syllable += rules.nucleus.phonemes[Math.floor(Math.random() * rules.nucleus.phonemes.length)];

    if (rules.nucleus.diphthong()) {
      syllable += rules.nucleus.phonemes[Math.floor(Math.random() * rules.nucleus.phonemes.length)];
    }

    if (rules.coda.existence()) {
      syllable += rules.coda.phonemes[Math.floor(Math.random() * rules.coda.phonemes.length)];
    }

    return syllable;
  }
};
