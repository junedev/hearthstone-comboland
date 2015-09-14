var mongoose = require("mongoose");
var Card = require("../models/card");

var comboSchema = new mongoose.Schema({
  name: String,
  className: String,
  cards: [Card],
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var Combo = mongoose.model("Combo", comboSchema);

module.exports = Combo;