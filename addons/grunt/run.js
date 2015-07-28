var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').execSync;

module.exports = function(options) {
  var read = fs.createReadStream(path.join(__dirname, options.type + '.js'));
  var write = fs.createWriteStream(path.join(options.target, 'Gruntfile.js'));

  read.pipe(write);

  var packages = require(path.join(__dirname, 'packages.json'));
  var args = ['grunt'].concat(packages[options.type]);

  console.log('[grunt] Installing node modules');
  exec('npm i --save-dev ' + args.join(' '), {cwd: options.target});
  console.log('[grunt] Done');
};
