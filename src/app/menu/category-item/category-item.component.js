import template from './category-item.template.html';

class CategoryItemCtrl {
  constructor($stateParams) {
    this.$stateParams = $stateParams;
  }
  
  getClass() {
    return this.category.id === this.$stateParams.id ? 'active' : '';
  }
}

export const CategoryItemComponent = {
  bindings: {
    category: "<",
    deleteCategory: "&",
    hideMenu: "&"
  },
  template,
  controller: CategoryItemCtrl
}

CategoryItemComponent.$inject = ['$stateParams']