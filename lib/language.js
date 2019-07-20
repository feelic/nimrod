module.exports = class Language {
  constructor(options = {}) {
    this.vowels = options.vowels || this.makePhonemeSet('vowels');
    this.consonants = options.consonants || this.makePhonemeSet('consonants');
    this.syllableRules = options.syllableRules || this.makeSyllableRules(this.consonants, this.vowels);
    this.transliteration = options.transliteration || this.makeTransliterationSystem();
  }

  makeSyllableRules(consonants, vowels) {
    const standard = gaussian(0.9, 0.12, false);
    const allowedOnsetsNumber = Math.round(consonants.length * bindInteger(standard(), 0, 1));
    const allowedCodasNumber = Math.round(consonants.length * bindInteger(standard(), 0, 1));

    return {
      standard: {
        onset: {
          existence: randomWithCoef([
            { value: () => true, coef: 5 },
            {
              value: () => true && Math.round(Math.random()),
              coef: 10,
            },
            { value: () => false, coef: 1 },
          ]),
          consonantCluster: randomWithCoef([
            {
              value: () => () => true && Math.round(Math.random() * Math.random()),
              coef: 2,
            },
            { value: () => false, coef: 1 },
          ]),
          phonemes: nRandomFromArray(consonants, allowedOnsetsNumber),
        },
        nucleus: {
          diphthong: randomWithCoef([
            {
              value: () => true && Math.round(Math.random() * Math.random()),
              coef: 2,
            },
            { value: () => false, coef: 1 },
          ]),
          phonemes: vowels,
        },
        coda: {
          existence: randomWithCoef([
            { value: () => true, coef: 1 },
            {
              value: () => true && Math.round(Math.random()),
              coef: 10,
            },
            { value: () => false, coef: 5 },
          ]),
          phonemes: nRandomFromArray(consonants, allowedCodasNumber),
        },
      },
    };
  }

  makeSyllable(specs = {}) {
    let position = specs.position || 'standard';

    if (!this.syllableRules[position]) {
      position = 'standard';
    }

    const rules = this.syllableRules[position];

    if (!rules) {
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

  makeMorpheme(syllables) {
    let morpheme = '';

    if (!syllables) {
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
        position,
      });
    }
  }



  printPhonologyDescription() {
    const consonantsTable = new Table();
    const vowelsTable = new Table();

    // Consonants
    let header = [''];

    for (const place of traits.consonants.place) {
      header.push(place);
    }
    consonantsTable.push(header);

    for (const manner of traits.consonants.manner) {
      const line = [manner];

      for (const place of traits.consonants.place) {
        let cellContent = '';

        for (const consonant of this.consonants) {
          const phoneme = phonemes.consonants[consonant];

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

    for (const place of traits.vowels.backness) {
      header.push(place);
    }
    vowelsTable.push(header);

    for (const height of traits.vowels.height) {
      const line = [height];

      for (const backness of traits.vowels.backness) {
        let cellContent = '';

        for (const vowel of this.vowels) {
          const phoneme = phonemes.vowels[vowel];

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
