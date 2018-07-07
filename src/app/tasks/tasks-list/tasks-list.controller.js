'use strict';
export default class TasksListCtrl {

	constructor(todoService, $stateParams, $uibModal, $rootScope) {
		this.todoService = todoService;
		this.$stateParams = $stateParams;
		this.$uibModal = $uibModal;
		this.$rootScope = $rootScope;
		this.editedTask = {};

		this.loadCategoryTasks();
	}

	loadCategoryTasks() {
		this.todoService.getCategoryById(this.$stateParams.id)
			.then(data => this.categoryItem = data);
	}

	isEditInputVisible(key, index) {
		return this.editedTask.key === key && this.editedTask.index === index;
	}

	editTask(key, index, taskTitle) {
		this.updateTaskName();
		this.editedTask = { key: key, index: index, prevValue: taskTitle };
	}

	isDone(isTaskDone) {
		return isTaskDone ? 'task-done' : '';
	}

	updateTaskName() {
		const key = this.editedTask.key;
		const index = this.editedTask.index;
		
		if(!key) {
			return;
		}
		
		const currentTask = this.categoryItem.items[key][index];
		if(currentTask.title === this.editedTask.prevValue) {
			this.editedTask = {};
			return;
		}

		this.todoService.updateTask({
			catId: this.$stateParams.id, 
			dateKey: key, 
			taskId: index, 
			task: currentTask
		}).then(() => {
			this.editedTask = {};
		});
	}

	finishTask(key, index){	
		const currentTask = this.categoryItem.items[key][index];
		currentTask.done = true;
		this.todoService.updateTask({
			catId: this.$stateParams.id, 
			dateKey: key, 
			taskId: index, 
			task: currentTask
		});
	}

	removeTask(key, index) {
		this.todoService.removeTask(this.$stateParams.id, key, index).then(() => {
			const dateTask = this.categoryItem.items;
			if(dateTask[key].length > 1) {
				dateTask[key].splice(index, 1);
			} else {
				delete dateTask[key];
			}
			
			this.$rootScope.$broadcast('updateCategoriesQuantity', null);
		});
	}

	addTask() {
		const modalInstance = this.$uibModal.open({
            animation: true,
            template: require('../new-task/new-task.template.html'),
            controller: 'NewTaskCtrl as newTaskCtrl'
        });

        modalInstance.result.then((task) => {
			this.todoService.addTask(task, this.$stateParams.id)
			.then(() => {	
				this.$rootScope.$broadcast('updateCategoriesQuantity', null);
				this.loadCategoryTasks();
			});
            
        });
	}

	hasTasks() {
		if(!this.categoryItem) {
			return false;
		}

		return (Object.keys(this.categoryItem.items).length > 0);
	}

}

TasksListCtrl.$inject = ['todoService', '$stateParams', '$uibModal', '$rootScope'];