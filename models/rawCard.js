var mongoose = require("mongoose");

var rawCardSchema =  new mongoose.Schema({}, { strict: false });

// var rawCardSchema = new mongoose.Schema({ 
//   allCards: [apiCardsSchema],
//   info: mongoose.Schema.Types.Mixed
// });

var RawCard = mongoose.model('RawCard', rawCardSchema);

module.exports = RawCard;