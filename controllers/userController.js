var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = "23epahlq562dnf5as3";
var passport = require('passport');

function login(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) return res.status(500).send(err);

    if (!user) return res.status(403).send({ message: 'Wrong login credentials.' });

    if (!user.validPassword(req.body.password)) return res.status(403).send({ message: 'Wrong login credentials.' });

    var token = jwt.sign(user, secret, { expiresInMinutes: 1440 });

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

module.exports = {
  login: login,
  signup: signup
};