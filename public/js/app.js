angular.module("comboApp",["ngRoute","ngResource"])
  .config(MainRouter);

MainRouter.$inject = ['$routeProvider', '$locationProvider'];

function MainRouter($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html'
      //controller: 'CriminalsController as criminals'
    })
    .when('/combos/new', {
      templateUrl: 'templates/new.html',
      controller: 'ComboController as combos'
    })
}