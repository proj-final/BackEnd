// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { reserveOrder, getOrders, deleteOrderById } = require('../Controller/OrderController');

// Route to reserve an order
router.post('/reserve', reserveOrder);
router.get('/orders', getOrders);
router.delete("/orders/:id", deleteOrderById);

module.exports = router;
