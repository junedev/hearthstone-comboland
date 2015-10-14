angular.module("comboApp")
  .controller("IndexController", IndexController);

IndexController.$inject = ["Combo", "TokenService", "$location"];

function IndexController(Combo, Card, TokenService, $location){
  var self = this;
  self.all = Combo.query();

  self.rate = function(combo,number){
    if(TokenService.currentUserId()){
      Combo.update({id: combo._id}, {$inc:{rating: number}},function(){
        // FIXME change rating without reloading
        self.all = Combo.query();
      })
    }
  }

  self.show = function(combo){
    $location.url("/combos/"+combo._id);
  }

}