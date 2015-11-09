var express = require('express');
var router = express.Router();

var comboController = require('../controllers/comboController');
var cardController = require('../controllers/cardController');
var userController = require('../controllers/userController');

router.route('/api/combos/heros')
  .get(comboController.getHeros);

router.route('/api/combos')
  .get(comboController.getAll)
  .post(comboController.createCombo);

router.route('/api/combos/:id')
  .get(comboController.getCombo)
  .put(comboController.updateCombo)
  .delete(comboController.deleteCombo);

router.route('/api/cards/:className')
  .get(cardController.getCards);

router.route('/api/users/login')
  .post(userController.login);

router.route('/api/users/signup')
  .post(userController.signup);

router.route('/api/users/:id')
  .get(userController.getUser);

module.exports = router;