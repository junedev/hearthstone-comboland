angular.module("comboApp",["ngRoute","ngResource","angular-jwt","ui.bootstrap","wu.masonry"])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push("authInterceptor");
  })
  .config(MainRouter);

MainRouter.$inject = ["$routeProvider", "$locationProvider"];

function MainRouter($routeProvider, $locationProvider){
  $routeProvider
    .when("/all", {
      templateUrl: "templates/combos.html",
      controller: "ComboController as combos"
    })
    .when("/combos/new", {
      templateUrl: "templates/new.html",
      controller: "ComboController as combos"
    })
    .when("/login", {
      templateUrl: "templates/login.html"
    })
    .when("/", {
      templateUrl: "templates/landing.html"
    })
}
