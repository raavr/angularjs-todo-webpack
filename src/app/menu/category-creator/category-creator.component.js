import template from './category-creator.template.html';

class CategoryCreatorCtrl {

  constructor($timeout) {
    this.$timeout = $timeout;
  }

  setCategoryFormClass(showFormClass) {
    this.showFormClass = showFormClass;
  }

  addCategory(categoryName) {
    return this.onCategoryAdded({categoryName}).then(() => {
      this.$timeout(() => {
        this.setCategoryFormClass('');
      }, 200);
    })
  }

  $onInit() {
    this.showFormClass = "";
  }

}

CategoryCreatorCtrl.$inject = ['$timeout']

export const CategoryCreatorComponent = {
  bindings: {
    onCategoryAdded: "&",
  },
  template,
  controller: CategoryCreatorCtrl
}