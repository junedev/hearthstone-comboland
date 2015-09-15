var RawCard = require('../models/rawCard');

function getCards(req, res){
  hero = req.params.className;
  // TODO exclude type hero!!
  RawCard.find({img:{$exists:true}})
    .and({$or:[{playerClass:hero},{playerClass:{$exists:false}}]})
    .exec(function(err,rawCards){
      res.status(200).send(rawCards);
  })
}

module.exports = {
  getCards: getCards
}