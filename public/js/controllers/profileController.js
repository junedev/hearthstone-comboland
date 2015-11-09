angular
  .module('comboApp')
  .controller('ProfileController', ProfileController);

ProfileController.$inject = ['User', 'Combo', '$routeParams', '$location'];

function ProfileController(User, Combo, $routeParams, $location) {
  this.user = User.get({id: $routeParams.userId});

  this.combos = Combo.query();

  this.showCombo = function(combo){
    $location.url("/combos/" + combo._id);
  }
}