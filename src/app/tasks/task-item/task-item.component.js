import template from './task-item.template.html';

class TaskItemCtrl {

  constructor($scope) {
    this.$scope = $scope;
  }

  $onInit() {
    this.setEditing(false);
    this.$scope.$on('clearEditing', () => {
      this.setEditing(false);
    });
  }

  setEditing(isEdited) {
    this.isEdited = isEdited;
  }

  startEditing() {
    this.editTask({ 
      task: {
        index: this.taskIdx, 
        prevValue: this.task.title
      }
    });
    this.setEditing(true);
  }

  isDone() {
    return this.task.done ? 'task__title--done' : '';
  }
}

TaskItemCtrl.$inject = ['$scope']

export const TaskItemComponent = {
  bindings: {
    task: "<",
    taskIdx: "<",
    editTask: "&",
    removeTask: "&",
    finishTask: "&"
  },
  template,
  controller: TaskItemCtrl
}