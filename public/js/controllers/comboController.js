angular.module("comboApp")
  .controller("ComboController", ComboController);

//ComboController.$inject = ['Combo','Card'];

function ComboController(){
  // var self = this;
  // this.all = [];
  // this.classes = [];
  // this.allCards = [];
  // this.newCombo = {cards:[]};
  // this.addCombo = addCombo;
  // this.getCards = getCards;
  // this.deleteCombo = deleteCombo;
  // this.addCard = addCard;

  // self.all = Combo.query();

  // self.classes = Combo.classes();

  // function getCards(className){
  //   Card.allCards(className).then(function(result) { self.allCards = result.data;});
  //   self.newCombo.cards = [];
  // }

  // function addCombo(){
  //   console.log(self.newCombo);
  //   Combo.save(self.newCombo, function(combo) {
  //     self.all.push(combo);
  //     self.newCombo = {};
  //     window.location.href = "/";
  //   });
  // }

  // function addCard(index){
  //   var card = self.allCards[index];
  //   var newCard = {name: card.name, flavor: card.flavor, img: card.img, cardSet:card.cardSet}
  //   self.newCombo.cards.push(newCard);
  // }

  // function deleteCombo(combo){
  //   Combo.delete({id:combo._id});
  //   var index = self.all.indexOf(combo);
  //   self.all.splice(index, 1);
  // }
}