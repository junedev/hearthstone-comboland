angular.module("comboApp")
  .factory("Combo", Combo);

Combo.$inject = ["$resource"];

function Combo($resource){
  var ComboResource = $resource("/combos/:id", 
    {id: "@_id"},
    {
      "update": {method: "PUT"},
      "heros": {method: "GET", url: "/combos/heros", isArray: true }
    }
  );

  return ComboResource;
}