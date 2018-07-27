import template from './navbar.template.html';

class NavbarComponentCtrl {

  constructor(todoService, $window, $state, $stateParams, $scope) {
    this.todoService = todoService;
    this.$window = $window;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$scope = $scope;

    this.getCategories();
    this.$scope.$on('updateCategoriesQuantity', () => {
      this.getCategories();
    });
  }

  getCategories() {
    this.todoService.getAllCategoriesWithQuantity()
      .then(data => this.categories = data);
  }

  deleteCategory(id) {
    if (this.$window.confirm('Are you sure?')) {
      this.todoService.deleteCategory(id)
        .then(index => {
          this.categories.splice(index, 1);
          if (id === this.$stateParams.id) {
            this.$state.go('home');
          }
        });
    }
  }

  addCategory(categoryName) {
    return this.todoService.addCategory(categoryName)
      .then(() => {
        this.getCategories();
      });
  }

}

NavbarComponentCtrl.$inject = ['todoService', '$window', '$state', '$stateParams', '$scope'];

export const NavbarComponent = {
  bindings: {
    menuClass: "<",
    hideMenu: "&"
  },
  template,
  controller: NavbarComponentCtrl
}