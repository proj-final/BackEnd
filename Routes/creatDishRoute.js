// routes/dishRoutes.js
const express = require('express');
const { createDish } = require('../Controllers/creatdishController.js');

const creatdishRouter = express.Router();

// Route for creating a new dish
creatdishRouter.post('/creatDishes', createDish);

module.exports = creatdishRouter;
