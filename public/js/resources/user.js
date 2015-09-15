angular
  .module('comboApp')
  .factory('User', User);

User.$inject = ['$resource'];

function User($resource) {
  return $resource(
    '/users/:id',
    {id: '@id'},
    {
      "login": { 
        url:"/users/login",
        method: "POST"
      },
      "signup": {
        url: "/users/signup",
        method: "POST"
      }
    }
  );
}