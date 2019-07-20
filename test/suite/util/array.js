const assert = require('assert');
const { arrayIndexDiff } = require('../../../lib/util/array');

describe('#arrayIndexDiff(arr, a, b)', () => {
  it('should return the difference of position between to elements of an array', () => {
    const myArr = ['low', 'med-low', 'med', 'med-high', 'high'];

    const results = [
      arrayIndexDiff(myArr, 'med-low', 'med'),
      arrayIndexDiff(myArr, 'med', 'med-low'),
      arrayIndexDiff(myArr, 'low', 'high'),
    ];

    assert(results[0] === 1, `Diff between med-low and med should be 1, found ${results[0]}`);
    assert(results[1] === 1, `Diff between med and med-low should be 1, found ${results[1]}`);
    assert(results[2] === 4, `Diff between low and high should be 5, found ${results[2]}`);
  });
  it('should throw if the params are not in array', () => {
    const myArr = ['low', 'med-low', 'med', 'med-high', 'high'];

    assert.throws(() => arrayIndexDiff(myArr, 'low', 'ptdr'), 'Did not throw');
    assert.throws(() => arrayIndexDiff(myArr, 'xD', 'high'), 'Did not throw');
  });
});
