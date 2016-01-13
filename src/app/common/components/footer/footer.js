import angular from 'angular';
import FooterComponent from './footer.component';

'use strict';

let FooterModule = angular.module("footer", [])
                    .directive('sgFooter', FooterComponent);

export default FooterModule;
