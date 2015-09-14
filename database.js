var request = require("request");
var mongoose = require("mongoose");
var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/hearthstone-comboland';

var apidataSchema = new mongoose.Schema({ 
  allCards: mongoose.Schema.Types.Mixed,
  info: mongoose.Schema.Types.Mixed
});

var APIdata = mongoose.model('APIdata', apidataSchema);

module.exports.initialize = function(){


  mongoose.connect(databaseURL);
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connection.on('open', function (ref) {

    console.log('Connected to mongo server ' + databaseURL);

    APIdata.findOne({}, '_id' ,function(err, data){
      if (err) console.log(err);
      var lastWeek = new Date(Date.now() - 7*24*60*60*1000);
      if(!data || data._id.getTimestamp() < lastWeek){
        APIdata.remove({},function(){});
        fetchAPIdata();
      }
    })
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
      var allCards = [];

      Object.keys(data).forEach(function(key){
        allCards = allCards.concat(data[key]);
      });

      APIdata.create({allCards: allCards},function(err){
        if(err) console.log(err);
        fetchInfo();
      });

    }
  });
}

function fetchInfo(){
  var options = {
    url: 'https://omgvamp-hearthstone-v1.p.mashape.com/info',
    headers: {"X-Mashape-Key": process.env.HEARTHSTONE_KEY}
  };

  request(options, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      var info = JSON.parse(body);

      APIdata.findOneAndUpdate({},{info: info},function(err){
        if(err) console.log(err);
      });
    }
  });
}