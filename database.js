var request = require("request");
var mongoose = require("mongoose");
var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/hearthstone-comboland';
var RawCard = require("./models/rawCard");


module.exports.initialize = function(){
  if(mongoose.connection.readyState==0){
    mongoose.connect(databaseURL);
    mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
    mongoose.connection.on('open', function (ref) {
      console.log('Connected to mongo server ' + databaseURL);
      resetRawData();
    });
  } else {
    resetRawData();
  }
}

function resetRawData(){
  RawCard.findOne({}, '_id' ,function(err, data){
    if (err) console.log(err);
    RawCard.remove({},function(){});
    fetchAPIdata();
  })
}

function fetchAPIdata(){
  console.log("Fetching data from API.")
  var options = {
    url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1',
    headers: {"X-Mashape-Key": process.env.HEARTHSTONE_KEY}
  };

  request(options, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      var data = JSON.parse(body);

      Object.keys(data).forEach(function(key){
        data[key].forEach(function(card){
          RawCard.create(card, function(err){
            if(err) console.log(err);
          });
        });
      });
    }
  });
}