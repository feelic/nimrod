const bindInteger = require('./util/integer').bindInteger;
const gaussian = require('./util/random').gaussian;
const phonemes = require('./phonemes');
const nRandomFromArray = require('./util/random').nRandomFromArray;
const nRandomFromObject = require('./util/random').nRandomFromObject;
const randomWithCoef = require('./util/random').randomWithCoef;

const phonemicDistribution = {
  'consonants': {'min': 5, 'mean': 20, 'stdev': 8, 'max': 50},
  'vowels': {'min': 3, 'mean': 16, 'stdev': 6, 'max': 30}
};

module.exports = class Language {
  constructor (options = {}) {
    this.vowels = options.vowels || this.makePhonemeSet('vowels');
    this.consonants = options.consonants || this.makePhonemeSet('consonants');
    this.syllableRules = options.syllableRules || this.makeSyllableRules(this.consonants, this.vowels);
    this.transliteration = options.transliteration || {};
  }

  makePhonemeSet (type) {
    let distrib = phonemicDistribution[type];
    let standard = gaussian(distrib.mean, distrib.stdev);
    let number = bindInteger(standard(), distrib.min, distrib.max);

    return nRandomFromObject(phonemes[type], number);
  }

  makeSyllableRules (consonants, vowels) {
    let standard = gaussian(0.9, 0.12, false);
    let allowedOnsetsNumber = Math.round(consonants.length * bindInteger(standard(), 0, 1));
    let allowedCodasNumber = Math.round(consonants.length * bindInteger(standard(), 0, 1));

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
          {'value': () => () => true && Math.round(Math.random() * Math.random()), 'coef': 2},
          {'value': () => false, 'coef': 1}
        ]),
        'phonemes': nRandomFromArray(consonants, allowedOnsetsNumber)
      },
      'nucleus': {
        'diphthong': randomWithCoef([
          {'value': () => true && Math.round(Math.random() * Math.random()), 'coef': 2},
          {'value': () => false, 'coef': 1}
        ]),
        'phonemes': vowels
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
        'phonemes': nRandomFromArray(consonants, allowedCodasNumber)
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
    }

    syllable += rules.nucleus.phonemes[Math.floor(Math.random() * rules.nucleus.phonemes.length)];

    if (rules.nucleus.diphthong()) {
      syllable += rules.nucleus.phonemes[Math.floor(Math.random() * rules.nucleus.phonemes.length)];
    }

    if (rules.coda.existence()) {
      syllable += rules.coda.phonemes[Math.floor(Math.random() * rules.coda.phonemes.length)];
    }

    return syllable;
  }

  transliterate(word) {
    let transliteratedWord = '';

    for (let i = 0, len = word.length; i < len; i += 1) {
      let letter = word[i];
      let letterWithDiacritic = letter + word[i + 1];

      //we check first with the next character
      if (this.transliteration[letterWithDiacritic]) {
        // console.log(`diacritic: ${letterWithDiacritic} => ${this.transliteration[letterWithDiacritic]}`);
        transliteratedWord += this.transliteration[letterWithDiacritic];
        i += 1;
        continue;
      }

      if (this.transliteration[letter]) {
        // console.log(`simple: ${letter} => ${this.transliteration[letter]}`);
        transliteratedWord += this.transliteration[letter];
        continue;
      }

      // console.log(`not found: ${letter} => ${letter}`);
      transliteratedWord += letter;
    }

    return transliteratedWord;
  }
};
