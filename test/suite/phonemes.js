const assert = require('assert');
const findNeighbours = require('../../lib/phonemes/find-neighbours').findNeighbours;
const comparePhonemes = require('../../lib/phonemes/find-neighbours').comparePhonemes;

describe('Phonemes processing', function() {
  describe('#findNeighbours(vowel, vowels)', function() {
    it('', function () {

    });
  });
  describe('#comparePhonemes(specs, a, b)', function() {
    it('should return the number of differences between two phonemes', function () {
      let a = {
        'symbol': 'a',
        'traits': {
          'height': 'open',
          'backness': 'front',
          'roundedness': false,
          'nasalization': false
        }
      };
      let b = {
        'symbol': 'æ',
        'traits': {
          'height': 'near-open',
          'backness': 'front',
          'roundedness': false,
          'nasalization': false
        }
      };
      let vowelTraits = {
          height: [
            'close',
            'near-close',
            'close-mid',
            'mid',
            'open-mid',
            'near-open',
            'open'
          ],
          backness: [
            'front',
            'central',
            'back'
          ],
          roundedness: [true, false],
          nasalization: [true, false]
      };
      let result = comparePhonemes(vowelTraits, a, b);
      assert(result === 1, `Expected 1,  got ${result}`);
    });
  });
});
