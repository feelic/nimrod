const Language = require('./lib/language');
const nRandomFromObject = require('./lib/util/random').nRandomFromObject;

let lang = new Language();

for (let i = 0; i < 30; i +=1) {
  console.log(lang.makeSyllable());
}
