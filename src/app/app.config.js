export default function AppConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('home', {
      name: 'home',
      url: '/',
      component: 'home'
    })
    .state('category', {
      name: 'category',
      url: '/category/{id}',
      component: 'tasksContainer'
    });

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
}

AppConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];