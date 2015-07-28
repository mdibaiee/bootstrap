var fs = require('fs'),
    path = require('path');

module.exports = function(options) {
  var license = (options.license || 'mit').toLowerCase();

  console.log('[license] Doing some work');
  var template = fs.readFileSync(path.join(__dirname, 'files', license)) + '';

  template = template.replace(/\[year\]/g, new Date().getFullYear());

  fs.writeFileSync(path.join(options.target, 'LICENSE'), template);
  console.log('[license] Done');
};
