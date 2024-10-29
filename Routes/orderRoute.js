// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { reserveOrder, getOrders, deleteOrderById } = require('../Controller/OrderController');

// Route to reserve an order
router.post('/reserve', reserveOrder);

// Route to fetch all orders
router.get('/orders', getOrders);

// Route to delete an order by ID
router.delete("/orders/:id", deleteOrderById);

module.exports = Orderouter;
