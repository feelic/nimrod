const makeSyllable = require('./make-syllable');

module.exports = function makeWord(lang, length) {
  const syllables = new Array(length)
    .fill(1)
    .map((a, idx) => makeSyllable(lang, (idx === 0 && 'initial') || 'standard'));

  return syllables.flat();
};
