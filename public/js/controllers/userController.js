angular
  .module('comboApp')
  .controller('UserController', UserController);

UserController.$inject = ['User', 'TokenService','$location'];

function UserController(User, TokenService, $location) {
  var self = this;
  self.currentUser = null;
  self.existingUser = null;
  self.newUser = null;
  self.message = null;

  function showMessage(res) {
      self.message = res.data.message;
      self.user = null;
  }

  function redirect(res){
    self.message = null;
    if (self.isLoggedIn()) {
      self.currentUser = TokenService.parseJwt();
    }
    $location.path("/");
  }

  self.login = function() {
    User.login(self.existingUser, redirect, showMessage);
    self.existingUser = null;
    self.newUser = null;
  };

  self.signup = function() {
    User.signup(self.newUser, redirect, showMessage);
    self.existingUser = null;
    self.newUser = null;
  };

  self.logout = function() {
    TokenService.removeToken();
    self.currentUser = null;
  };

  self.isLoggedIn = function() {
    return TokenService.isLoggedIn();
  };

  if (self.isLoggedIn()) {
    self.currentUser = TokenService.parseJwt();
  }

  return self;

}