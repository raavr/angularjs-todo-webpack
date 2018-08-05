export default function AppConfig($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
}

AppConfig.$inject = ['$urlRouterProvider', '$locationProvider'];