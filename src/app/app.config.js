'use strict';
export default function AppConfig($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
		.state('home', {
			url : '/',
			template: require('./home/home.template.html')
		})
		.state('category', {
			url: '/category/:id',
			template: require('./tasks/tasks-list/tasks-list.template.html'),
			controller: 'TasksListCtrl',
			controllerAs: 'tasksListCtrl'
		});
		

	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);
}

AppConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];