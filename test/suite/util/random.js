const assert = require('assert');
const nRandomFromArray = require('../../../lib/util/random').nRandomFromArray;

describe('#nRandomFromArray(arr, n)', function () {
  it('should return an array of n elements', function () {
    let myArr = ['a', 'b', 'c', 'd', 'e'];

    assert(nRandomFromArray(myArr, 3).length === 3, 'Not returning expected number of elements');
  });
  it('should return an array of the total length of the pool if more was asked', function () {
    let myArr = ['a', 'b', 'c', 'd', 'e'];

    assert(nRandomFromArray(myArr, 6).length === 5, 'Not returning expected number of elements');
  });
});
