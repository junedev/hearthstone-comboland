angular
  .module("comboApp")
  .factory("Card", Card)

Card.$inject = ["$http"];

function Card($http){
  var promise = function(className){
  return $http.get("/api/cards/"+className)
  }
  return {allCards: promise}
}