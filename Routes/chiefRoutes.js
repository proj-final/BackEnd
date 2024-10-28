// Routes/chiefRoutes.js
const express = require('express');
const { createChief } = require('../Controllers/chiefController.js');

const chiefRouter = express.Router();

// Route for creating a new chief
chiefRouter.post('/createChief', createChief);

module.exports = chiefRouter;
