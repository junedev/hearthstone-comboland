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
    $window.sessionStorage.setItem('comboland-token',token);
  }

  self.getToken = function() {
    return $window.sessionStorage.getItem('comboland-token');
  }

  self.removeToken = function() {
    $window.sessionStorage.removeItem('comboland-token');
  }

  self.isLoggedIn = function() {
    var token = self.getToken();

    if (token) {
      return true;
    } else {
      return false;
    }
  }

  self.currentUserId = function(){
    if (this.isLoggedIn()) {
      return this.parseJwt().id;
    } else {
      return null;
    }
  }
  
  return this;

}