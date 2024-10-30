// routes/orderRoutes.js
const express = require('express');
const Orderouter = express.Router();
const { reserveOrder,getClientOrders, deleteOrderById } = require('../Controllers/OrderController');

// Route to reserve an order
Orderouter.post('/reserve', reserveOrder);

// Route to fetch all orders
// routes/orderRoutes.js
Orderouter.get('/orders/:clientId', getClientOrders);

// Route to delete an order by ID
Orderouter.delete("/orders/:id", deleteOrderById);

module.exports = Orderouter;
