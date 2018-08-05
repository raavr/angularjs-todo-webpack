import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';

import { TaskFormComponent } from "./task-form/task-form.component";
import { TasksContainerComponent } from "./tasks-container/tasks-container.component";
import { TasksGroupComponent } from "./tasks-group/tasks-group.component";
import { TasksListComponent } from "./tasks-list/tasks-list.component";
import { TaskItemComponent } from "./task-item/task-item.component";
import ToArrayFilter from "./tasks-container/to-array.filter";
import ToCustomDateFilter from "./tasks-group/to-custom-date.filter";
import TasksConfig from "./tasks.config";

export default angular.module('tasks', [uirouter, uibootstrap])
  .config(TasksConfig)
  .component('taskForm', TaskFormComponent)
  .component('tasksContainer', TasksContainerComponent)
  .component('tasksGroup', TasksGroupComponent)
  .component('tasksList', TasksListComponent)
  .component('taskItem', TaskItemComponent)
  .filter('toArray', ToArrayFilter)
  .filter('toCustomDate', ToCustomDateFilter)
  .name;