import headerComponent from './HeaderNav.component';
import './assets/github-icon.svg';
import angular from 'angular';

export default angular
  .module('HeaderNav', [])
  .component('headerNav', headerComponent);
