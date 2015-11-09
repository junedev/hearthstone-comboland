angular.module("comboApp")
  .factory("Combo", Combo);

Combo.$inject = ["$resource"];

function Combo($resource){
  var ComboResource = $resource("/api/combos/:id", 
    {id: "@_id"},
    {
      "update": {method: "PUT"},
      "heros": {method: "GET", url: "/api/combos/heros", isArray: true }
    }
  );

  return ComboResource;
}