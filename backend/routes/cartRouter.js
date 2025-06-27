const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/auth');
const verifyJwt = require('../middlewares/auth');

const cartRouter = express.Router();

cartRouter.post('/add', verifyJwt, addToCart);
cartRouter.get('/get', verifyJwt, getCart);
cartRouter.post('/remove', verifyJwt, removeFromCart);

module.exports = cartRouter;