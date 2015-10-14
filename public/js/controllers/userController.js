angular
  .module('comboApp')
  .controller('UserController', UserController)

UserController.$inject = ['User', 'TokenService','$location']
function UserController(User, TokenService, $location) {
  var self = this;

  self.user = null;
  self.message = null;

  function showMessage(res) {
      self.message = res.data.message;
      self.user = null;
  }

  function redirect(res){
    $location.url("/");
  }

  self.login = function() {
    User.login(self.user, redirect, showMessage);
  }

  self.signup = function() {
    User.signup(self.user, redirect, showMessage);
  }

  self.logout = function() {
    TokenService.removeToken();
    self.user = null;
  }

  self.isLoggedIn = function() {
    return TokenService.isLoggedIn();
  }

  if (self.isLoggedIn()) {
    self.user = TokenService.parseJwt();
  }

}