import template from './category-list.template.html';

export const CategoryListComponent = {
  bindings: {
    categories: "<",
    hideMenu: "&",
    deleteCategory: "&"
  },
  template,
}