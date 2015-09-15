angular.module("comboApp")
  .controller("ComboController", ComboController);

ComboController.$inject = ["Combo","Card"];

function ComboController(Combo, Card){
  var self = this;
  self.all = Combo.query();
  self.cards = [];
  self.heros = [];
  self.newCombo = {cards:[]};

  self.getHeros = function(){ self.heros = Combo.heros(); }
  self.getHeros();

  self.getCards = function(){
    Card.allCards(self.newCombo.hero.playerClass)
      .then(function(result) { self.cards = result.data.sort(compare) });
    self.newCombo.cards = [];
  }

  self.addCard = function(index){
    var card = self.cards[index];
    var newCard = {name: card.name, flavor: card.flavor, img: card.img, cardSet:card.cardSet}
    self.newCombo.cards.push(newCard);
  }

  self.addCombo = function(){
    Combo.save(self.newCombo, function(combo) {
      self.all.unshift(combo);
      self.newCombo = {cards: []};
      window.location.href = "/";
    });
  }

  // function deleteCombo(combo){
  //   Combo.delete({id:combo._id});
  //   var index = self.all.indexOf(combo);
  //   self.all.splice(index, 1);
  // }

}

function compare(card1,card2) {
  if (card1.name < card2.name)
    return -1;
  if (card1.name > card2.name)
    return 1;
  return 0;
}