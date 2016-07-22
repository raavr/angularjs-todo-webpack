'use strict';

import 'bootstrap/dist/css/bootstrap.css';
import './app.style.scss';
import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';

import AppConfig from './app.config';
import TodoService from './services/todo.service';
import NewTaskCtrl from './tasks/new-task/new-task.controller';
import TasksListCtrl from './tasks/tasks-list/tasks-list.controller';
import MenuCtrl from './menu/menu.controller';
import BackShadowDir from './menu/back-shadow/back-shadow.directive';
import HamburgerBtnDir from './menu/hamburger-btn/hamburger-btn.directive';
import NewCategoryDir from './menu/new-category/new-category.directive';
import MenuDir from './menu/menu.directive';
import MaxLenFilter from './filters/max-len.filter';
import ToArrayFilter from './tasks/tasks-list/to-array.filter';
import ToCustomDateFilter from './tasks/tasks-list/to-custom-date.filter';

export default angular.module('TodoApp', [uirouter, uibootstrap])
	.config(AppConfig)
	.service('todoService', TodoService)
	.controller('NewTaskCtrl', NewTaskCtrl)
	.controller('TasksListCtrl', TasksListCtrl)
	.controller('MenuCtrl', MenuCtrl)
	.directive('backShadow', BackShadowDir)
	.directive('hamburgerBtn', HamburgerBtnDir)
	.directive('newCategoryForm', NewCategoryDir)
	.directive('menu', MenuDir)
	.filter('maxLen', MaxLenFilter)
	.filter('toArray', ToArrayFilter)
	.filter('toCustomDate',  ToCustomDateFilter);