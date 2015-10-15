angular
  .module('comboApp')
  .controller('ProfileController', ProfileController);

ProfileController.$inject = ['User', '$routeParams'];

function ProfileController(User, $routeParams) {
  this.user = User.get({id: $routeParams.userId});
}