import template from './Operation.html';
import controller from './Operation.controller';

export default {
  bindings: {
    operation: '<',
    operationType: '@',
  },
  require: {
    path: '^pathEdit',
  },
  template,
  controller,
};
