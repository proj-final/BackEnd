const express = require('express');
const { getAllChefs } = require('../Controllers/getallchief.js')
const getAllChefsRouter = express.Router();


getAllChefsRouter.get('/chefs', getAllChefs);




module.exports = getAllChefsRouter;