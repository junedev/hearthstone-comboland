var express = require('express');
var router = express.Router();

var comboController = require('../controllers/comboController');
var cardController = require('../controllers/cardController');

router.route('/combos/heros')
  .get(comboController.getHeros)

router.route('/combos')
  .get(comboController.getAll)
  .post(comboController.createCombo)

router.route('/cards/:className')
  .get(cardController.getCards)

module.exports = router