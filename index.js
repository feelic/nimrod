//const Language = require('./lib/language');
const french = require('./languages/french');

//let lang = new Language();

for (let i = 0; i < 5; i += 1) {
  console.log(french.makeSyllable() + french.makeSyllable());
}
