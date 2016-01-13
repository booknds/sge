'use strict';

require('fs');
require('vm');

var Materialize = module.exports = {
  inject: function() {
    window.jQuery = require('./node_modules/jquery/dist/jquery.min.js');
    window.$ = window.jQuery;
    require('hammerjs');
    require('./bin/materialize.js');
  },
  bind: function(jQuery) {
    var context = {'$': jQuery};
    var src = fs.readFileSync(__dirname + '/bin/materialize.js', 'utf8');
    vm.runInNewContext(src, context);
    return context;
  }
}
