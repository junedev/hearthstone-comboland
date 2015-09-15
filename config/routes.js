var express = require('express');
var router = express.Router();

var comboController = require('../controllers/comboController');
var cardController = require('../controllers/cardController');
var userController = require('../controllers/userController');

router.route('/combos/heros')
  .get(comboController.getHeros)

router.route('/combos')
  .get(comboController.getAll)
  .post(comboController.createCombo)

router.route('/cards/:className')
  .get(cardController.getCards)

router.route('/users/login')
  .post(userController.login)

router.route('/users/signup')
  .post(userController.signup)

module.exports = router