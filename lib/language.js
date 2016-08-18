const bindInteger = require('./util/integer').bindInteger;
const gaussian = require('./util/random').gaussian;
const phonemes = require('./phonemes');
const nRandomFromArray = require('./util/random').nRandomFromArray;
const nRandomFromObject = require('./util/random').nRandomFromObject;
const randomWithCoef = require('./util/random').randomWithCoef;
const Table = require('cli-table');
const traits = require('./phonemes/traits');

const phonemicDistribution = {
  'consonants': {'min': 5, 'mean': 20, 'stdev': 8, 'max': 50},
  'vowels': {'min': 3, 'mean': 16, 'stdev': 6, 'max': 30}
};

module.exports = class Language {
  constructor (options = {}) {
    this.vowels = options.vowels || this.makePhonemeSet('vowels');
    this.consonants = options.consonants || this.makePhonemeSet('consonants');
    this.syllableRules = options.syllableRules || this.makeSyllableRules(this.consonants, this.vowels);
    this.transliteration = options.transliteration || this.makeTransliterationSystem();
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
      'standard': {
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
      }
    };
  }

  makeSyllable (specs = {}) {
    let position = specs.position || 'standard';

    if (! this.syllableRules[position]) {
      position = 'standard';
    }

    const rules = this.syllableRules[position];

    if (! rules) {
      throw new Error('Syllable rules must exist before creating syllables');
    }

    let syllable = '';

    if (specs.disableOnset && rules.onset.existence()) {
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

  makeMorpheme (syllables) {
    let morpheme = '';

    if (! syllables) {
      syllables = Math.ceil(Math.random() * 2);
    }

    for (let i = 0; i < syllables; i += 1) {
      let position = 'standard';

      if (i === 0) {
        position = 'initial';
      }
      if (i === syllables - 1) {
        position = 'final';
      }
      if (syllables === 1) {
        position = 'standard';
      }

      morpheme += this.makeSyllable({
        position
      });
    }
  }

  makeTransliterationSystem () {
    let system = {};

    for (let vowel of this.vowels) {
      system[vowel] = phonemes.vowels[vowel].translit;
    }
    for (let consonant of this.consonants) {
      system[consonant] = phonemes.consonants[consonant].translit;
    }

    return system;
  }

  transliterate (word) {
    let transliteratedWord = '';

    for (let i = 0, len = word.length; i < len; i += 1) {
      let letter = word[i];
      let letterWithDiacritic = letter + word[i + 1];

      //we check first with the next character
      if (this.transliteration[letterWithDiacritic]) {
        transliteratedWord += this.transliteration[letterWithDiacritic];
        i += 1;
        continue;
      }

      if (this.transliteration[letter]) {
        transliteratedWord += this.transliteration[letter];
        continue;
      }

      transliteratedWord += letter;
    }

    return transliteratedWord;
  }

  printPhonologyDescription () {
    const consonantsTable = new Table();
    const vowelsTable = new Table();

    // Consonants
    let header = [''];

    for (let place of traits.consonants.place) {
      header.push(place);
    }
    consonantsTable.push(header);

    for (let manner of traits.consonants.manner) {
      let line = [manner];

      for (let place of traits.consonants.place) {
        let cellContent = '';

        for (let consonant of this.consonants) {
          let phoneme = phonemes.consonants[consonant];

          if (phoneme.traits.place === place && phoneme.traits.manner === manner) {
            cellContent += consonant;
          }
        }
        line.push(cellContent);
      }
      consonantsTable.push(line);
    }

    console.log(consonantsTable.toString());
    // Vowels
    header = [''];

    for (let place of traits.vowels.backness) {
      header.push(place);
    }
    vowelsTable.push(header);

    for (let height of traits.vowels.height) {
      let line = [height];

      for (let backness of traits.vowels.backness) {
        let cellContent = '';

        for (let vowel of this.vowels) {
          let phoneme = phonemes.vowels[vowel];

          if (phoneme.traits.height === height && phoneme.traits.backness === backness) {
            cellContent += vowel;
          }
        }
        line.push(cellContent);
      }
      vowelsTable.push(line);
    }

    console.log(vowelsTable.toString());
  }
};
