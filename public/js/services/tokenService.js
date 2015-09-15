angular
  .module('comboApp')
  .service('TokenService', TokenService)

TokenService.$inject = ['$window' , 'jwtHelper']
function TokenService($window, jwtHelper) {

  var self = this;

  self.parseJwt = function() {
    var token = self.getToken();
    return jwtHelper.decodeToken(token);
  }

  self.saveToken = function(token) {
    $window.localStorage['comboland-token'] = token;
  }

  self.getToken = function() {
    return $window.localStorage['comboland-token'];
  }

  self.removeToken = function() {
    $window.localStorage.removeItem('comboland-token');
  }

  self.isLoggedIn = function() {
    var token = self.getToken();

    if (token) {
      return true;
    } else {
      return false;
    }
  }

  return this;

}