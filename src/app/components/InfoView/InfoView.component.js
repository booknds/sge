import template from './InfoView.html';
import controller from './InfoView.controller.js';

export default {
  bindings: {
    infoState: '<',
    info: '<',
    infoEdit: '<',
  },
  template,
  controller,
};
