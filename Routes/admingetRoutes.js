const express = require('express');
const {
  getAllOrders,
  getAllDeliveryBoys,
  getAllDishes,
  getAllClients,
  getAllChefs
} = require('../controllers/allForAdmin'); // Import all functions

const router = express.Router();

// Routes for fetching data
router.get('/orders', getAllOrders);
router.get('/delivery-boys', getAllDeliveryBoys);
router.get('/dishes', getAllDishes);
router.get('/clients', getAllClients);
router.get('/chefs', getAllChefs);

module.exports = router;
