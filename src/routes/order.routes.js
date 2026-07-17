const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/order.controller");

// Create a new order
router.post("/orders", OrderController.createOrder);

// Get all orders
router.get("/orders", OrderController.getAllOrders);

// Get a single order
router.get("/orders/:id", OrderController.getOrderById);

// Get all orders for a buyer
router.get("/orders/buyer/:buyerId", OrderController.getBuyerOrders);

// Get all orders for a farmer
router.get("/orders/farmer/:farmerId", OrderController.getFarmerOrders);

// Update order status
router.patch("/orders/:id/status", OrderController.updateOrderStatus);

// Delete an order
router.delete("/orders/:id", OrderController.deleteOrder);

module.exports = router;
