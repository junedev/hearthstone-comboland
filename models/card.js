var mongoose = require("mongoose");

var cardSchema = new mongoose.Schema({
  name: String,
  cardSet: String,
  flavor: String,
  img: String
});

var Card = mongoose.model("Card", cardSchema);

module.exports = Card;

