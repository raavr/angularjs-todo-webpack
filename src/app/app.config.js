export default function AppConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('home', {
      name: 'home',
      url: '/',
      component: 'home'
    })
    .state('category', {
      url: '/category/{id}',
      template: require('./tasks/tasks-list/tasks-list.template.html'),
      controller: 'TasksListCtrl',
      controllerAs: 'tasksListCtrl'
    });

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
}

AppConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];