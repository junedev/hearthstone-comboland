var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var logger = require("morgan");
var passport   = require("passport");
var mongoose = require("mongoose");
var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost/hearthstone-comboland';
var port = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(logger('dev'));

app.set("views", "./public");
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

mongoose.connect(databaseURL);

app.get("/", function(req,res){
 res.render("index.html");
})

app.use(require('./config/routes'));

app.listen(port, function(err){
  if(err) console.log(err);
  console.log("Hearthstone Comboland running on port " + port)
});