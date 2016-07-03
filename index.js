//const Language = require('./lib/language');
const french = require('./languages/french');

//let lang = new Language();

for (let i = 0; i < 10; i += 1) {
  // french.transliterate(french.makeSyllable() + french.makeSyllable());
  console.log(french.transliterate(french.makeSyllable() + french.makeSyllable()));
}
