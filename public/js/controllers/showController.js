angular.module("comboApp")
  .controller("ShowController", ShowController);

ShowController.$inject = ["Combo", "$routeParams", "TokenService"];

function ShowController(Combo, $routeParams, TokenService){
  var self = this;
  self.current = Combo.get({id: $routeParams.comboId});
  self.newCommentText = "";

  self.addComment = function(combo) {
    var comment = {};
    comment.user = TokenService.currentUserId();
    comment.text = self.newCommentText;
    Combo.update({id: combo._id}, {$push: {comments: comment}}, function(){
      self.current.comments.push(comment);
      self.newCommentText = "";
    });
  }

  self.rate = function(combo,number){
    if(TokenService.currentUserId()){
      Combo.update({id: combo._id}, {$inc:{rating: number}},function(){
        self.current.rating += number;
      });
    }
  }
}

  // function deleteCombo(combo){
  //   Combo.delete({id:combo._id});
  //   var index = self.all.indexOf(combo);
  //   self.all.splice(index, 1);
  // }