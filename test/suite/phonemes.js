const assert = require('assert');
const { findNeighbours } = require('../../lib/phonemes/find-neighbours');
const { comparePhonemes } = require('../../lib/phonemes/find-neighbours');

describe('Phonemes processing', () => {
  describe('#findNeighbours(vowel, vowels)', () => {
    it('', () => {});
  });
  describe('#comparePhonemes(specs, a, b)', () => {
    it('should return the number of differences between two phonemes', () => {
      const a = {
        symbol: 'a',
        traits: {
          height: 'open',
          backness: 'front',
          roundedness: false,
          nasalization: false,
        },
      };
      const b = {
        symbol: 'æ',
        traits: {
          height: 'near-open',
          backness: 'front',
          roundedness: false,
          nasalization: false,
        },
      };
      const vowelTraits = {
        height: ['close', 'near-close', 'close-mid', 'mid', 'open-mid', 'near-open', 'open'],
        backness: ['front', 'central', 'back'],
        roundedness: [true, false],
        nasalization: [true, false],
      };
      const result = comparePhonemes(vowelTraits, a, b);
      assert(result === 1, `Expected 1,  got ${result}`);
    });
  });
});
