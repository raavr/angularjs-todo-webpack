'use strict';
export default function BackShadowDirective() {
	return {
		restrict: 'E',
		template: '<div class="backshadow" ng-class="menuCtrl.showMenu" ng-click="menuCtrl.closeMenu()"></div>',
		replace: true,
		controller: 'MenuCtrl as menuCtrl'
	};
}