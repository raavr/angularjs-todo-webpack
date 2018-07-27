class MenuComponentCtrl {
  constructor() {
    this.showMenuClass = '';
  }
  setMenuClass(showMenuClass) {
    this.showMenuClass = showMenuClass;
  }
}

export const MenuComponent = {
  template: `
    <back-shadow menu-class="$ctrl.showMenuClass" hide-menu="$ctrl.setMenuClass('')"></back-shadow>
    <hamburger-btn open-menu="$ctrl.setMenuClass('show-menu')"></hamburger-btn>
    <navbar menu-class="$ctrl.showMenuClass" hide-menu="$ctrl.setMenuClass('')"></navbar>
  `,
  controller: MenuComponentCtrl
}