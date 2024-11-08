const express = require('express');
const { deleteClient } = require('../controllers/deleteClient');
const deleteClientrouter = express.Router();


deleteClientrouter.delete('/client/:id', deleteClient);

module.exports = deleteClientrouter;