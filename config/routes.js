var express = require('express');
var router = express.Router();

var comboController = require('../controllers/comboController');

router.route('/combos')
  .get(comboController.getAll)

module.exports = router