import template from './task-form.template.html';

class TaskFormCtrl {

  constructor() {
    this.task = {};
    this.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1,
      opened: false
    };
  }

  openCalendar() {
    this.dateOptions.opened = true;
  }

  addTask() {
    this.close({$value: this.task});
  }

  cancel() {
    this.dismiss({$value: 'cancel'});
  }
}

export const TaskFormComponent = {
  bindings: {
    close: '&',
    dismiss: '&'
  },
  template,
  controller: TaskFormCtrl
}