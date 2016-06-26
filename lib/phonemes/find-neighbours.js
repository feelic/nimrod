const arrayIndexDiff = require('../util/array').arrayIndexDiff;

function findNeighbours (phoneme, specs, dictionary) {
  let neighbours = [];

  for (let key in dictionary) {
    let neighbour = dictionary[key];
    let diff = comparePhonemes(specs, phoneme, neighbour);

    if (diff === 1) {
      neighbours.push(neighbour.symbol);
    }
  }

  return neighbours;
}

function comparePhonemes (specs, a, b) {
  let diff = 0;

  for (trait in specs) {
    diff += arrayIndexDiff(specs[trait], a.traits[trait], b.traits[trait]);
  }

  return diff;
}

module.exports = findNeighbours;
module.exports.comparePhonemes = comparePhonemes;
