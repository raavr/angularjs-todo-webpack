import template from './tasks-container.template.html';

export default class TasksContainerCtrl {

  constructor(todoService, $stateParams, $uibModal, $rootScope, $scope) {
    this.todoService = todoService;
    this.$stateParams = $stateParams;
    this.$uibModal = $uibModal;
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.editedTask = {};
    this.categoryItem = {};
  }
  
  $onInit() {
    this.loadCategoryTasks();
  }

  loadCategoryTasks() {
    this.todoService.getCategoryById(this.$stateParams.id)
      .then(data => this.categoryItem = data || {});
  }

  shouldUpdateBeforeEditing() {
    return Object.keys(this.editedTask).length !== 0; 
  }

  editTask({taskGroup}) {
    if(this.shouldUpdateBeforeEditing()) {
      this.updateTaskName();
    }
    this.editedTask = { 
      key: taskGroup.key, 
      index: taskGroup.taskIdx, 
      prevValue: taskGroup.prevValue
    };
  }

  updateTaskName() {
    this.$scope.$broadcast('clearEditing', null);
    const key = this.editedTask.key;
    const index = this.editedTask.index;
    
    if (!key) {
      return;
    }
    
    const currentTask = this.categoryItem.items[key][index];
    if (currentTask.title === this.editedTask.prevValue) {
      this.editedTask = {};
      return;
    }

    this.todoService.updateTask({
      catId: this.$stateParams.id,
      task: {
        key,
        index,
        data: currentTask
      }
    });
    this.editedTask = {};
  }

  finishTask({taskGroup}) {
    const currentTask = this.categoryItem.items[taskGroup.key][taskGroup.taskIdx];
    currentTask.done = true;
    this.todoService.updateTask({
      catId: this.$stateParams.id,
      task: {
        key: taskGroup.key,
        index: taskGroup.taskIdx,
        data: currentTask
      }
    });
  }

  removeTask({taskGroup}) {
    this.todoService.removeTask({
      catId: this.$stateParams.id, 
      task: {
        key: taskGroup.key, 
        index: taskGroup.taskIdx
      }
    }).then(() => {
      const categoryTasks = this.categoryItem.items;
      if (categoryTasks[taskGroup.key].length > 1) {
        categoryTasks[taskGroup.key].splice(taskGroup.taskIdx, 1);
      } else {
        delete categoryTasks[taskGroup.key];
      }

      this.$rootScope.$broadcast('updateCategoriesQuantity', null);
    });
  }

  addTask() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      component: 'taskForm'
    });

    modalInstance.result
      .then((task) => {
        this.todoService.addTask({
          catId: this.$stateParams.id,
          task
        }).then(() => {
          this.$rootScope.$broadcast('updateCategoriesQuantity', null);
          this.loadCategoryTasks();
        });
      }).catch(() => {});
  }

  hasTasks() {
    const items = this.categoryItem.items || [];
    return Object.keys(items).length > 0;
  }
}

TasksContainerCtrl.$inject = ['todoService', '$stateParams', '$uibModal', '$rootScope', '$scope'];

export const TasksContainerComponent = {
  template,
  controller: TasksContainerCtrl
}