# Nimrod
> Language generation and mutation

Nimrod is the old king of Babylon who lead the construction of the tower of Babel.

This package aims to randomly generate human languages.

## Language generation

The language is generated in layers:

### Phonemes
Each language will get a random set of vowels and consonants.
- 4 to 20 vowels
- 5 to 30 consonants

### Syllables
Rules will define the way syllables are generated.

#### onset
- existence: mandatory | optional | prohibited
- consonant cluster: allowed | prohibited
- allowed consonants: array of consonants allowed for syllable onsets, can be an array for clusters

#### nucleus
- allowed phonemes : array of vowels and approximants allowed for nucleus, can be array for diphthongs
- diphthong: allowed | prohibited

#### coda
- existence: mandatory | optional | prohibited
- allowed consonants: array of consonants allowed for syllable codas

### Semantics
#### Morphemes
Morphemes will be made using one or more syllable. Each morpheme will be free or bound.

Bound morphemes will be a prefix or a suffix, with a precedence value (to order them when more than one affix is used).

The rules for morpheme creation will be:
- ratio of free/bound morphemes
- distribution of the number of syllables
- ratio of prefix/suffix

#### Words
Words will be generated from free morphemes or morphemes acting as root and affixed with bound morphemes.

Words will be generated to map a dictionary of concepts.

### Grammar
A set of grammar rules will be defined to manipulate the words of the dictionary and create sentences.

## Mutations
Once a language is created, an other language can be created from the first with random mutations on any layer.

## Usage

### Generate a new language
```js
  const Language = require('nimrod').language;
  
  const language = new Language();
```

### Mutate a language
```js
  const Language = require('nimrod').language;
  
  const language = new Language();
  const mutatedLanguage = new Language({
    'mutateFrom': language
  });
```

### Generate proper nouns
```js
  const Language = require('nimrod').language;
  
  const language = new Language();
  
  language.makeToponym({
    'type': 'mountain'
  });
  language.makeAnthroponym();
```

## Resources
### Books
Le langage : introduction linguistique à l'histoire, Joseph Vendryes.  
https://archive.org/details/lelangageintrodu00venduoft

Problèmes de linguistique générale, Émile Benveniste.  
http://www.gallimard.fr/Catalogue/GALLIMARD/Tel/Problemes-de-linguistique-generale2

### Websites
#### Language creation
The Language Construction Kit  
http://www.zompist.com/kit.html

#### IPA and phonetics
IPA charts with sounds  
http://www.internationalphoneticalphabet.org/ipa-sounds/ipa-chart-with-sounds/

Wikipedia article for vowel  
https://en.wikipedia.org/wiki/Vowel

Wikipedia article for consonant  
https://en.wikipedia.org/wiki/Consonant

#### Syllables
Wikipedia article for syllable  
https://en.wikipedia.org/wiki/Syllable

StackExchange question on languages with few phonemes  
http://linguistics.stackexchange.com/questions/4561/languages-with-the-fewest-phonemes

Quora question on languages with most phonemes  
https://www.quora.com/Phonetics-Which-language-has-the-most-amount-of-sounds

#### Semantics
Wikipedia article for morpheme  
https://en.wikipedia.org/wiki/Morpheme

#### Language mutations
Wikipedia article for consonant mutation  
https://en.wikipedia.org/wiki/Consonant_mutation

Wikipedia article for sound change  
https://en.wikipedia.org/wiki/Sound_change

#### General Linguistics
Youtube linguistics channel "The Ling Space"  
https://www.youtube.com/user/thelingspace
