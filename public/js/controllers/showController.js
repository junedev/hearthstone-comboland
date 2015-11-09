angular.module("comboApp")
  .controller("ShowController", ShowController);

ShowController.$inject = ["Combo", "$routeParams", "TokenService", "$location"];

function ShowController(Combo, $routeParams, TokenService, $location){
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

  self.deleteCombo = function(){
    if(self.current.user.id==TokenService.currentUserId()){
      Combo.delete({id: self.current._id});
      $location.path("/combos");
    }
  }
  
}
