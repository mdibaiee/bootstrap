#!/usr/bin/env node --harmony

require('babel/polyfill');

var fs = require('fs'),
    path = require('path');

var cwd = process.cwd(),
    args = process.argv.slice(2);

var config = require('./config.json');

const params = [];
const user = args.reduce(function(a, b) {
  if (b.includes('--')) {
    var keyValue = b.slice(2).split('=');
    var key = keyValue[0];
    var value = keyValue[1];
    a[key] = value;
  } else {
    params.push(b);
  }
  return a;
}, {});

const defaults = {
  type: 'lib',
  name: params[0] || ''
};

const options = Object.assign({}, defaults, user);
var target = options.target = path.join(cwd, params[0] || '');

if (!fs.existsSync(target)) {
  fs.mkdirSync(target);
}

config.files[options.type].forEach(function(file) {
  if (file.includes('dir:')) {
    fs.mkdirSync(path.join(target, file.slice(4)));
  } else {
    fs.openSync(path.join(target, file), 'a');
  }
});

config.addons[options.type].forEach(function(addon) {
  require(path.join(__dirname, 'addons', addon, 'run.js'))(options);
});
