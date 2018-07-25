export default function MenuDirective() {
  return {
    restrict: 'E',
    template: require('./menu.template.html'),
    controller: 'MenuCtrl as menuCtrl',
    replace: true
  };
}