import template from './header.html';
import controller from './header.controller.js';


/**
 */
const headerComponent = () => {
  console.log(controller);
  return {
    template,
    controller,
    controllerAs: 'header',
    restrict: 'E',
  }
};

export default headerComponent;

