const express = require('express');
const { showDishes } = require('../Controllers/DetailsDish');
const detailsrouter = express.Router();

detailsrouter.get('/dishesDetails', showDishes);

module.exports = detailsrouter;