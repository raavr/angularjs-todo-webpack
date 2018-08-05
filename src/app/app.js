import 'bootstrap/dist/css/bootstrap.css';
import './app.style.scss';
import angular from 'angular';

import home from './home/home';
import menu from './menu/menu';
import tasks from './tasks/tasks';
import AppConfig from './app.config';
import TodoService from './services/todo.service';
import MaxLenFilter from './filters/max-len.filter';

export default angular.module('TodoApp', [
  home,
  menu,
  tasks
]).config(AppConfig)
  .service('todoService', TodoService)
  .filter('maxLen', MaxLenFilter)
