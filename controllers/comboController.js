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

module.exports = {
  getAll: getAll,
  getHeros: getHeros,
  createCombo: createCombo
}