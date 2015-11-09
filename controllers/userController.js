var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = process.env.HEARTHSTONE_SECRET;
var passport = require('passport');

function login(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) return res.status(500).send(err);

    if (!user) return res.status(403).send({ message: 'Wrong login credentials.' });

    if (!user.validPassword(req.body.password)) return res.status(403).send({ message: 'Wrong login credentials.' });

    var token = jwt.sign({id: user.id}, secret, { expiresInMinutes: 1440 });

    return res.status(200).send({
      success: true,
      message: 'Successfully logged in.',
      token: token
    });
  });
};

function signup(req, res){
  passport.authenticate('local-signup', function(err, user) {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(401).send({ error: 'User already exists!' });

    var token = jwt.sign(user, secret, { expiresInMinutes: 1440 });

    return res.status(200).send({
      success: true,
      message: "Successfully registered.",
      token: token
    });
  })(req,res);
}

function getUser(req, res){
  var id = req.params.id;
  User.findById(id).exec(function(err,user){
    if (err) {
      console.log(err);
      return res.status(404).send({message: "User not found."});
    } else {
      return res.status(200).send(user);
    }
  });
}

module.exports = {
  getUser: getUser,
  login: login,
  signup: signup
};