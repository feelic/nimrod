const assert = require('assert');
const { nRandomFromArray } = require('../../../lib/util/random');

describe('#nRandomFromArray(arr, n)', () => {
  it('should return an array of n elements', () => {
    const myArr = ['a', 'b', 'c', 'd', 'e'];

    assert(nRandomFromArray(myArr, 3).length === 3, 'Not returning expected number of elements');
  });
  it('should return an array of the total length of the pool if more was asked', () => {
    const myArr = ['a', 'b', 'c', 'd', 'e'];

    assert(nRandomFromArray(myArr, 6).length === 5, 'Not returning expected number of elements');
  });
});
