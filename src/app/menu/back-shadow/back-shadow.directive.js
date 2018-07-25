export default function BackShadowDirective() {
  return {
    restrict: 'E',
    template: '<div class="backshadow" ng-class="menuCtrl.showMenuClass" ng-click="menuCtrl.setMenuClass(\'\')"></div>',
    replace: true,
    controller: 'MenuCtrl as menuCtrl'
  };
}