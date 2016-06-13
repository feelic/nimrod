/**
 * Returns the beautified Json to write in the file
 *
 * @param  {Array} json - a single line json string containing one language file.
 * @return  {Object} result - A beautified JS module containing the language json file.
 */
module.exports = function jsonBeautifier (json) {
  var result = '';
  var content = JSON.stringify(json);
  var cleanUp = [
    {'replace': /'/g, 'with': '\\\''},
    {'replace': /"/g, 'with': '\''},
    {'replace': /\{'/g, 'with': '{\n\''},
    {'replace': /:\{/g, 'with': ': {'},
    {'replace': /:\['/g, 'with': ': [\n\''},
    {'replace': /':'/g, 'with': '\': \''},
    {'replace': /',/g, 'with': '\',\n'},
    {'replace': /'\}/g, 'with': '\'\n}'},
    {'replace': /'\]},/g, 'with': '\'\n]\n},\n'},
    {'replace': /'\]}/g, 'with': '\'\n]\n}\n'},
  ];

  cleanUp.forEach(function clean (value) {
    content = content.replace(value.replace, value.with);
  });

  var lineByLine = content.split('\n');
  var indent = '';

  lineByLine = lineByLine.map(function reindent (value) {
    if (value.match(/\}/) || value.match(/\]/)) {
      indent = indent.substr(0, indent.length - 2);
    }

    value = indent + value;
    if (value.match(/\{/) || value.match(/\[/)) {
      indent += '  ';
    }

    return value;
  });

  content = lineByLine.join('\n');

  //assemble the pieces
  result += 'module.exports = ';
  result += content;
  result += ';\n';

  return result;
};
