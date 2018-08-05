export default function HomeConfig($stateProvider) {
  $stateProvider
    .state('home', {
      name: 'home',
      url: '/',
      component: 'home'
    });
}

HomeConfig.$inject = ['$stateProvider'];