const express = require('express');
const { getAllOrders, updateOrderStatus } = require('../controllers/adminOrderController');
const verifyAdminJwt = require('../middlewares/verifyAdminJwt');
// Optionally: use a separate `verifyAdmin` middleware
const adminOrderRouter = express.Router();

// 🛠️ ADMIN ROUTES
adminOrderRouter.get('/orders', verifyAdminJwt, getAllOrders);               // Get all orders
adminOrderRouter.put('/orders/status', verifyAdminJwt, updateOrderStatus);  // Update order status

module.exports = adminOrderRouter;
