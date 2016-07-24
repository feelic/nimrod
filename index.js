const Language = require('./lib/language');
const french = require('./languages/french');

let lang = new Language();

//lang.printPhonologyDescription();
let a = () => french.makeSyllable();
let b = () => lang.makeSyllable();

//console.log(french.transliterate(`${a()} ${a()}${a()} ${a()} ${a()}${a()}${a()}`));
console.log(lang.transliterate(`${b()}${b()} ${b()} ${b()}${b()}${b()} ${b()}`));
console.log(lang.transliterate(`${b()} ${b()}${b()} ${b()} ${b()}${b()}${b()}`));
