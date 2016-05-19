import template from './PathEdit.html';
import controller from './PathEdit.controller';

export default {
  bindings: {
    pathState: '<',
    path: '<',
    pathName: '<',
  },
  template,
  controller,
};
