var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').execSync;

module.exports = function(options) {
  console.log('[npm] Initialize package.json');
  var template = fs.readFileSync(path.join(__dirname, 'package.json')) + '';

  for (var key in options) {
    var rx = new RegExp('<%\\s?' + key + '\\s?%>', 'g');
    template = template.replace(rx, options[key]);
  }
  fs.writeFileSync(path.join(options.target, 'package.json'), template);
  console.log('[npm] Done');

  if (options.packages) {
    console.log('[npm] Installing packages');

    var args = options.packages.join(' ');

    exec('npm i --save ' + args, {cwd: options.target});

    console.log('[npm] Done');
  }
};
