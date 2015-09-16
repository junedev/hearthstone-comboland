angular
  .module('comboApp')
  .controller('UserController', UserController)

UserController.$inject = ['User','TokenService','$window']
function UserController(User, TokenService, $window) {
  var self = this;

  self.user = {};
  self.message = null;

  function showMessage(res) {
      self.message = res.data.message;
      self.user = {};
  }

  function redirect(res){
    $window.location.href = "/";
  }

  self.login = function() {
    User.login(self.user, redirect, showMessage);
  }

  self.signup = function() {
    User.signup(self.user, redirect, showMessage);
  }

  self.logout = function() {
    TokenService.removeToken();
    self.user = {};
  }

  self.isLoggedIn = function() {
    return TokenService.isLoggedIn();
  }

  if (self.isLoggedIn()) {
    self.user = TokenService.parseJwt();
  }

}