angular
  .module('comboApp')
  .factory('User', User);

User.$inject = ['$resource'];

function User($resource) {
  return $resource(
    '/api/users/:id',
    {id: '@id'},
    {
      "login": { 
        url:"/api/users/login",
        method: "POST"
      },
      "signup": {
        url: "/api/users/signup",
        method: "POST"
      }
    }
  );
}