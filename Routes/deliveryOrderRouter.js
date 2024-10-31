const express = require("express");
const { fetchAllOrders } = require("../Controllers/DeliveryOrder");

const allOrdersrouter = express.Router();


allOrdersrouter.get("/orders/all", fetchAllOrders);

module.exports = allOrdersrouter;