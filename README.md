# Nimrod
> Language generation and mutation

Nimrod is the old king of Babylon who lead the construction of the tower of Babel.

This package aims to generate human languages

## Language generation

The language is generated in layers:

### Phonemes
Each language will get a random set of vowels and consonants.

### Morphemes
Language will use their phonemes to build morphemes. 

Those morphemes will have a statistical repartition that will represent their frequency.

### Semantics
Words will be generated from those morphemes to represent concepts in a dictionary.

### Grammar
A set of grammar rules will be defined to manipulate the words of the dictionary and create sentences.

## Mutations
Once a language is created, an other language can be created from the first with random mutations on any of the four layers.

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
