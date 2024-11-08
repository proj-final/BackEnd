// routes/chiefRoutes.js
const express = require('express');
const { deleteChief } = require('../Controllers/deleteChief')
const deleteChiefrouter = express.Router();


deleteChiefrouter.delete('/chiefs/:id', deleteChief);

module.exports = deleteChiefrouter;
