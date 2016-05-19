import template from './InfoEdit.html';
import controller from './InfoEdit.controller';

export default {
  bindings: {
    infoState: '<',
    editableInfo: '<',
  },
  template,
  controller,
};
