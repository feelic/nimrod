/* eslint-disable no-continue */
module.exports = function transliterate(transliterationMap, word) {
  let transliteratedWord = '';

  for (let i = 0, len = word.length; i < len; i += 1) {
    const letter = word[i];
    const letterWithDiacritic = letter + word[i + 1];

    // we check first with the next character
    if (transliterationMap[letterWithDiacritic]) {
      transliteratedWord += transliterationMap[letterWithDiacritic];
      i += 1;
      continue;
    }

    if (transliterationMap[letter]) {
      transliteratedWord += transliterationMap[letter];
      continue;
    }

    transliteratedWord += letter;
  }

  return transliteratedWord;
};
