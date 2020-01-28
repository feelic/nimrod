const seedrandom = require('seedrandom');

let randomNumberGenerator = () => {
  throw new Error('you must set a seed before running random');
};
const random = () => randomNumberGenerator();

const setSeed = function setSeed(seed) {
  randomNumberGenerator = seedrandom(seed);
};

// This function was found here http://stackoverflow.com/a/35599181
const gaussian = function gaussian(mean, stdev, integer = true) {
  let y2;
  let useLast = false;

  return function g() {
    let y1;

    if (useLast) {
      y1 = y2;
      useLast = false;
    } else {
      let x1;
      let x2;
      let w;

      do {
        x1 = 2.0 * random() - 1.0;
        x2 = 2.0 * random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1.0);

      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      y1 = x1 * w;
      y2 = x2 * w;
      useLast = true;
    }

    let retval = mean + stdev * y1;

    if (integer) {
      retval = Math.round(retval);
    }

    return Math.abs(retval);
  };
};

const randomWithCoef = function randomWithCoef(values) {
  const pool = [];

  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];

    for (let j = 0; j < value.coef; j += 1) {
      pool.push(value.value);
    }
  }

  return pool[Math.floor(random() * pool.length)];
};

const nRandomFromArray = function nRandomFromArray(arr, n) {
  const max = n > arr.length ? arr.length : n;
  const result = [];
  let pool = JSON.parse(JSON.stringify(arr));

  while (result.length < max) {
    const index = Math.floor(random() * pool.length);
    const elt = pool[index];

    pool = [...pool.slice(0, index), ...pool.slice(index + 1)];
    result.push(elt);
  }

  return result;
};

module.exports = {
  random,
  setSeed,
  gaussian,
  randomWithCoef,
  nRandomFromArray,
};
