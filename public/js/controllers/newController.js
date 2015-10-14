angular.module("comboApp")
  .controller("IndexController", IndexController);

IndexController.$inject = ["Combo","Card","TokenService", "$location"];

function IndexController(Combo, Card, TokenService, $location){
  var self = this;
  self.currentCard = null;
  self.all = Combo.query();
  self.cards = [];
  self.heros = [];
  self.newCombo = {cards:[], rating:0};

  self.getHeros = function(){ self.heros = Combo.heros(); }

  self.getHeros();

  self.getCards = function(){
    Card.allCards(self.newCombo.hero.playerClass)
      .then(function(result) { self.cards = result.data.sort(compare) });
    self.newCombo.cards = [];
  }

  self.addCard = function(){
    var card = self.currentCard;
    var newCard = {name: card.name, flavor: card.flavor, img: card.img, cardSet:card.cardSet}
    self.newCombo.cards.push(newCard);
    self.currentCard = null;
  }

  self.addCombo = function(){
    self.newCombo.user = TokenService.currentUserId();
    Combo.save(self.newCombo, function(combo) {
      self.all.unshift(combo);
      self.newCombo = {cards: [], rating:0};
      $location.url("/combos/");
    });
  }

}

function compare(card1,card2) {
  if (card1.name < card2.name) return -1;
  if (card1.name > card2.name) return 1;
  return 0;
}