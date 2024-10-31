const express = require('express');
const categoryRouter = express.Router();
const { getDishesByCategory } = require('../Controllers/categoryDish.js');

// Route to get dishes by category
categoryRouter.get('/dishes/:category', getDishesByCategory);

module.exports = categoryRouter;