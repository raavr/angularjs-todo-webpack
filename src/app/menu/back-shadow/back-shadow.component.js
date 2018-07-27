export const BackShadowComponent = {
  bindings: {
    menuClass: "<",
    hideMenu: "&"
  },
  template: '<div class="backshadow" ng-class="$ctrl.menuClass" ng-click="$ctrl.hideMenu()"></div>',
}