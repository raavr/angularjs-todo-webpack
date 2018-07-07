'use strict';
export default class MenuCtrl {

	constructor(todoService, $timeout, $window, $state, $stateParams, $scope) {
		this.todoService = todoService;
		this.$timeout = $timeout;
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
		if(this.$window.confirm('Are you sure?')) {
			this.todoService.deleteCategory(id)
				.then(index => { 
					this.categories.splice(index, 1); 
					if(id === this.$stateParams.id) {
						this.$state.go('home');
					}
				}
			);
		}
	}

	cancelNewCategory() {
		this.newCategoryTitle = '';
	}

	addNewCategory() {
		this.todoService.addCategory(this.newCategoryTitle)
			.then(() => {
				this.getCategories();
				this.$timeout(() => {
					this.showForm = '';
				}, 200);

				this.cancelNewCategory();
			});
	}

	goToCategory(catId) {
		this.$state.go('category', { id: catId });
		this.closeMenu();
	}

	activeItem(catId) {
		return catId === this.$stateParams.id ? 'active' : '';
	}

	openMenu() {
		this.showMenu = 'show-menu';
	}

	closeMenu() {
		this.showMenu = ''; 
	}

}

MenuCtrl.$inject = ['todoService', '$timeout', '$window', '$state', '$stateParams', '$scope'];