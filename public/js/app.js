angular.module("comboApp",["ngRoute","ngResource",'angular-jwt','ui.bootstrap'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
  .config(MainRouter);

MainRouter.$inject = ['$routeProvider', '$locationProvider'];

function MainRouter($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html',
      controller: 'ComboController as combos'
    })
    .when('/combos/new', {
      templateUrl: 'templates/new.html',
      controller: 'ComboController as combos'
    })
    .when('/login', {
      templateUrl: 'templates/login.html'
    })
}