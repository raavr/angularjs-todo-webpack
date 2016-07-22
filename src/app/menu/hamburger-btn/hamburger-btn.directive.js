'use strict';
export default function HamburgerBtnDirective() {
	return {
		restrict: 'E',
		template: require('./hamburger-btn.template.html'),
		replace: true,
		controller: 'MenuCtrl as menuCtrl'
	};
}