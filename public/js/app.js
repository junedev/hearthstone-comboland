angular.module("comboApp",["ngRoute","ngResource","angular-jwt","ui.bootstrap","wu.masonry"])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push("authInterceptor");
  })
  .config(MainRouter);

MainRouter.$inject = ["$routeProvider", "$locationProvider"];

function MainRouter($routeProvider, $locationProvider){
  $routeProvider
    .when("/combos/new", {
      templateUrl: "templates/new.html",
      controller: "NewController as combos"
    })
    .when("/combos/:comboId", {
      templateUrl: "templates/show.html",
      controller: "ShowController as combo"
    })
    .when("/combos", {
      templateUrl: "templates/combos.html",
      controller: "IndexController as combos"
    })
    .when("/users/:userId", {
      templateUrl: "templates/profile.html",
      controller: "ProfileController as profile"
    })
    .when("/login", {
      templateUrl: "templates/login.html"
    })
    .when("/", {
      templateUrl: "templates/landing.html"
    })
    .otherwise({
      redirectTo: "/combos"
    });
}
