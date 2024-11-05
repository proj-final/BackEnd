
const express = require('express');
const { signupAdmin, loginAdmin } = require('../Controllers/adminAuth.js');
const routerAdmin = express.Router();

routerAdmin.post('/signup/admin', signupAdmin);
routerAdmin.post('/login/admin', loginAdmin);

module.exports = routerAdmin; 
