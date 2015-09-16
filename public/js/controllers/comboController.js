angular.module("comboApp")
  .controller("ComboController", ComboController);

ComboController.$inject = ["Combo","Card","TokenService"];

function ComboController(Combo, Card, TokenService){
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
  }

  self.addCombo = function(){
    self.newCombo.user = self.currentUserId();
    Combo.save(self.newCombo, function(combo) {
      self.all.unshift(combo);
      self.newCombo = {cards: [], rating:0};
      window.location.href = "/";
    });
  }

  self.rate = function(combo,number){
    Combo.update({id: combo._id}, {$inc:{rating: number}},function(){
      self.all = Combo.query();
    })
  }

  self.addComment = function(combo, text) {
    var comment = {};
    comment.user = self.currentUserId();
    comment.text = text;
    Combo.update({id: combo._id}, {$push: {comments: comment}}, function(){
      self.all = Combo.query();
    })
  }

  self.currentUserId = function(){
    if (TokenService.isLoggedIn()) {
      return TokenService.parseJwt().id;
    } else {
      return null;
    }
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