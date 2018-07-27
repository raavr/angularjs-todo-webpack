import template from './category-form.template.html';

class CategoryFormCtrl {

  constructor() {
    this.categoryName = "";
  }

  submitForm() {
    this.addCategory({ categoryName: this.categoryName }).then(() => {
      this.clearCategoryName();
    });
  }

  clearCategoryName() {
    this.categoryName = "";
  }

  cancelCategoryAdding() {
    this.clearCategoryName();
    this.hideForm();
  }
}

export const CategoryFormComponent = {
  bindings: {
    addCategory: "&",
    hideForm: "&"
  },
  template,
  controller: CategoryFormCtrl
}