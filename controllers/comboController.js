var Combo = require('../models/combo');

function getAll(req, res) {
  res.send({message: "hello"});
}

module.exports = {
  getAll: getAll
}