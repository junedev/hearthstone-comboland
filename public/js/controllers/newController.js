angular.module("comboApp")
  .controller("NewController", NewController);

NewController.$inject = ["Combo","Card","TokenService", "$location"];

function NewController(Combo, Card, TokenService, $location){
  var self = this;
  this.currentCard = null;
  this.cards = [];
  this.heros = [];
  this.newCombo = {cards:[], rating:0};

  this.getHeros = function(){ self.heros = Combo.heros(); }

  this.getHeros();

  this.getCards = function(){
    Card.allCards(this.newCombo.hero.playerClass)
      .then(function(result) { self.cards = result.data.sort(compare) });
    this.newCombo.cards = [];
  }

  this.addCard = function(){
    var card = this.currentCard;
    var newCard = {name: card.name, flavor: card.flavor, img: card.img, cardSet:card.cardSet}
    this.newCombo.cards.push(newCard);
    this.currentCard = null;
  }

  this.addCombo = function(){
    this.newCombo.user = TokenService.currentUserId();
    Combo.save(this.newCombo, function() {
        $location.url("/combos/");
    });
  }

}

function compare(card1,card2) {
  if (card1.name < card2.name) return -1;
  if (card1.name > card2.name) return 1;
  return 0;
}