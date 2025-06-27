const express = require('express');
const { placeOrder, verifyPayment, getOrders } = require('../controllers/orderController');
const verifyJwt = require('../middlewares/auth');
const orderRouter = express.Router();

orderRouter.post('/place', verifyJwt, placeOrder);
orderRouter.post('/verify', verifyPayment);
orderRouter.get('/user', verifyJwt, getOrders);

module.exports = orderRouter;