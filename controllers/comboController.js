var Combo = require('../models/combo');
var RawCard = require('../models/rawCard');

function getAll(req, res) {
  Combo.find({}, function(err, combos){
    res.status(200).send(combos);
  });
}

function getHeros(req, res) {
  RawCard.find({"cardId":/^HERO_0.$/}, function(err, cards){
    res.status(200).send(cards);
  });
}

function createCombo(req, res){
  Combo.create(req.body, function(err,combo){
    if (err){
      console.log(err);
      res.status(403).send({message: "Combo could not be saved because of " + err});
    } else {
      res.status(200).send(combo);
    }
  })
}

function updateCombo(req, res){
  var id = req.params.id;
  Combo.findByIdAndUpdate(id, req.body, function(err){
    if (err) {
      console.log(err);
      return res.status(500).send({message: "Combo could not be updated."});
    } else {
      return res.status(200).send({message: "Combo updated."});
    }
  })
}

function getCombo(req, res){
  var id = req.params.id;
  Combo.findById(id).populate("user").exec(function(err,combo){
    if (err) {
      console.log(err);
      return res.status(404).send({message: "Combo not found."});
    } else {
      return res.status(200).send(combo);
    }
  });
}

module.exports = {
  getAll: getAll,
  getHeros: getHeros,
  createCombo: createCombo,
  updateCombo: updateCombo,
  getCombo: getCombo
}