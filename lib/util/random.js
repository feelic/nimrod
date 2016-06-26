// This function was found here http://stackoverflow.com/a/35599181
const gaussian = function gaussian (mean, stdev, integer = true) {
  let y2;
  let use_last = false;

  return function() {
    let y1;

    if (use_last) {
      y1 = y2;
      use_last = false;
    } else {
      let x1, x2, w;

      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w  = x1 * x1 + x2 * x2;
      } while( w >= 1.0);

      w = Math.sqrt((-2.0 * Math.log(w))/w);
      y1 = x1 * w;
      y2 = x2 * w;
      use_last = true;
    }

    let retval = mean + stdev * y1;

    if(integer) {
      retval = Math.round(retval);
    }

    return Math.abs(retval);
  };
};

const randomWithCoef = function randomWithCoef (values) {
  let pool = [];

  for (let i = 0, len = values.length; i < len; i += 1) {
    let value = values[i];

    for (let j = 0, len = value.coef; j < len; j += 1) {
      pool.push(value.value);
    }
  }

  return pool[Math.floor(Math.random() * pool.length)];
};

const nRandomFromArray = function nRandomFromArray (arr, n) {
  let max = n > arr.length ? arr.length : n;
  let result = [];
  let pool = JSON.parse(JSON.stringify(arr));

  while(result.length < max) {
    let index = Math.floor(Math.random() * pool.length);
    let elt = pool[index];

    pool = [...pool.slice(0, index), ...pool.slice(index + 1)];
    result.push(elt);
  }

  return result;
};

const nRandomFromObject = function nRandomFromObject (obj, n) {
  let result = [];
  let pool = Object.keys(obj);
  let keys = nRandomFromArray(pool, n);

  for (let i = 0, len = keys.length; i < len; i += 1) {
    result.push(keys[i]);
  }

  return result;
};

module.exports = {
  gaussian,
  randomWithCoef,
  nRandomFromArray,
  nRandomFromObject
};
