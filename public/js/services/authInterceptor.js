angular
  .module('comboApp')
  .factory('authInterceptor', AuthInterceptor)

AuthInterceptor.$inject = ["TokenService"];
function AuthInterceptor(TokenService) {

  return {
    
    request: function(config) {
      var token = TokenService.getToken();
      console.log(token);

      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    
    response: function(res) {
      if(res.data.token) {
        TokenService.saveToken(res.data.token);
      }
      return res;
    }
  }

}