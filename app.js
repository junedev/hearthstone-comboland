var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var passport = require("passport");
var expressJWT = require("express-jwt");
var database = require("./database");
var schedule = require("node-schedule");

var app = express();
var secret = process.env.HEARTHSTONE_SECRET;
var port = process.env.PORT || 9000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(logger('dev'));

database.initialize();
schedule.scheduleJob({hour: 23, minute: 30, dayOfWeek: 0}, function(){
  database.initialize();
});

app.set("views", "./public");
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


app.use('/api', expressJWT({secret: secret}).unless({
     path: ['/api/users/login', '/api/users/signup']
  })
);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({message: 'You need an authorization token to view confidential information.'});
  }
  next();
});

require('./config/passport')(passport);
app.use(passport.initialize());

app.get("/", function(req,res){
 res.render("index.html");
})

app.use(require('./config/routes'));

app.listen(port, function(err){
  if(err) console.log(err);
  console.log("Hearthstone Comboland running on port " + port)
});