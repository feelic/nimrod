const { arrayIndexDiff } = require('../util/array');

function findNeighbours(phoneme, specs, dictionary) {
  const neighbours = [];

  for (const key in dictionary) {
    const neighbour = dictionary[key];
    const diff = comparePhonemes(specs, phoneme, neighbour);

    if (diff === 1) {
      neighbours.push(neighbour.symbol);
    }
  }

  return neighbours;
}

function comparePhonemes(specs, a, b) {
  let diff = 0;

  for (const trait in specs) {
    diff += arrayIndexDiff(specs[trait], a.traits[trait], b.traits[trait]);
  }

  return diff;
}

module.exports = findNeighbours;
module.exports.comparePhonemes = comparePhonemes;
