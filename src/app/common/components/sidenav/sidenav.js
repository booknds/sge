import angular from 'angular';
import SidenavComponent from './sidenav.component';

let SidenavModule =
  angular.module('SidenavModule', [])
          .directive("sgSidenav", SidenavComponent);

export default SidenavModule;
