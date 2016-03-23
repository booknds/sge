/**
 * Created by eric on 3/15/16.
 */

require('babel-register');
require('babel-polyfill');

global.document = require('jsdom').jsdom('<body ng-app="SwaggerGraphicalEditor"></body>');
global.window = document.defaultView;
global.navigator = window.navigator;