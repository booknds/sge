import controller from './PathViewMax.controller.js';
import template from './PathViewMax.html';

export default {
  bindings: {
    path: '<',
    pathName: '<',
    pathState: '<',
    minimize: '<',
    editPath: '<',
    deletePath: '<',
  },
  template,
  controller,
};
