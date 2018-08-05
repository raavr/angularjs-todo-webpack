import template from './tasks-group.template.html';

class TaskGroupCtrl {

  editTask({task}) {
    this.onTaskEdited({ 
      taskGroup: { 
        key: this.taskGroup.$key, 
        taskIdx: task.index, 
        prevValue: task.prevValue 
      } 
    });
  }

  removeTask(task) {
    this.onTaskRemoved({
      taskGroup: {
        key: this.taskGroup.$key, 
        taskIdx: task.taskIdx
      }
    });
  }

  finishTask(task) {
    this.onTaskFinished({
      taskGroup: {
        key: this.taskGroup.$key, 
        taskIdx: task.taskIdx
      }
    });
  }

}

export const TasksGroupComponent = {
  bindings: {
    taskGroup: "<",
    onTaskEdited: "&",
    onTaskRemoved: "&",
    onTaskFinished: "&"
  },
  template,
  controller: TaskGroupCtrl
}