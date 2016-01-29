import angular from 'angular';
import SidenavComponent from './sidenav.component';
import './booknds_logo_reverse.png'

let SidenavModule =
  angular.module('SidenavModule', [])
          .directive("sgSidenav", SidenavComponent);

export default SidenavModule;
