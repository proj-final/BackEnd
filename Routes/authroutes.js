const express = require('express');
const {
    registerClient,
    registerChef,
    registerDeliveryBoy,
    login
} = require('../Controllers/authController');

const router = express.Router();

// Client Routes
router.post('/client/register', registerClient);

// Chef Routes
router.post('/chef/register', registerChef);

// DeliveryBoy Routes
router.post('/deliveryboy/register', registerDeliveryBoy);

/// login 
 router.post('/login',login)

module.exports = router;
