export default function TasksConfig($stateProvider) {
  $stateProvider
    .state('category', {
      name: 'category',
      url: '/category/{id}',
      component: 'tasksContainer'
    });
}

TasksConfig.$inject = ['$stateProvider'];