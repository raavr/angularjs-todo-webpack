import 'bootstrap/dist/css/bootstrap.css';
import './app.style.scss';
import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';

import AppConfig from './app.config';
import TodoService from './services/todo.service';
import NewTaskCtrl from './tasks/new-task/new-task.controller';
import TasksListCtrl from './tasks/tasks-list/tasks-list.controller';
import MaxLenFilter from './filters/max-len.filter';
import ToArrayFilter from './tasks/tasks-list/to-array.filter';
import ToCustomDateFilter from './tasks/tasks-list/to-custom-date.filter';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './menu/navbar/navbar.component';
import { HamburgerBtnComponent } from './menu/hamburger-btn/hamburger-btn.component';
import { BackShadowComponent } from './menu/back-shadow/back-shadow.component';
import { MenuComponent } from './menu/menu.component';
import { CategoryFormComponent } from './menu/category-form/category-form.component';
import { CategoryCreatorComponent } from './menu/category-creator/category-creator.component';
import { CategoryListComponent } from './menu/category-list/category-list.component';
import { CategoryItemComponent } from './menu/category-item/category-item.component';

export default angular.module('TodoApp', [uirouter, uibootstrap])
  .config(AppConfig)
  .service('todoService', TodoService)
  .controller('NewTaskCtrl', NewTaskCtrl)
  .controller('TasksListCtrl', TasksListCtrl)
  .component('home', HomeComponent)
  .component('navbar', NavbarComponent)
  .component('appMenu', MenuComponent)
  .component('categoryList', CategoryListComponent)
  .component('categoryItem', CategoryItemComponent)
  .component('categoryCreator', CategoryCreatorComponent)
  .component('categoryForm', CategoryFormComponent)
  .component('backShadow', BackShadowComponent)
  .component('hamburgerBtn', HamburgerBtnComponent)
  .filter('maxLen', MaxLenFilter)
  .filter('toArray', ToArrayFilter)
  .filter('toCustomDate', ToCustomDateFilter);