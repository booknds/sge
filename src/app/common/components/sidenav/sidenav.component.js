import template from './sidenav.html';
import controller from './sidenav.controller';

const sideNavComp = ['$document', SidenavComponent];

export default sideNavComp;

/**
 */
function SidenavComponent($document) {
  return {
    restrict: 'E',
    template,
    controller,
    replace: true,
    controllerAs: 'sidenav',
    link(scope, element) {
      // Initialize collapse button
      // $('.button-collapse').sideNav(
      element.find('.button-collapse').sideNav(
        {
          menuWidth: 300, // Default is 240
          edge: 'right', // Choose the horizontal origin
          closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
      );

      $document.ready(() => {
        element.find('.collapsible').collapsible({
        // A setting that changes the collapsible behavior to expandable instead of the default accordion style
          accordion: false,
        });
      });
    },
  };
}
