import controller from './PathViewMin.controller.js';
import template from './PathViewMin.html';

export default {
  bindings: {
    path: '<',
    pathName: '<',
    pathState: '<',
    maximize: '<',
    editPath: '<',
    deletePath: '<',
  },
  template,
  transclude: true,
  controller,
};
