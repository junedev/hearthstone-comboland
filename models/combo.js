var mongoose = require("mongoose");
var Card = require("../models/card");
var Comment = require("../models/comment");

var comboSchema = new mongoose.Schema({
  name: String,
  description: String,
  rating: Number,
  hero : mongoose.Schema.Types.Mixed,
  cards: [Card.schema],
  comments: [Comment.schema],
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var Combo = mongoose.model("Combo", comboSchema);

module.exports = Combo;