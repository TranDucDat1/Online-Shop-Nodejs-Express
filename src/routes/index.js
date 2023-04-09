const express = require('express');
const router = express.Router();

const User = require('./user.route');
const Product = require('./product.route');
const Cart = require('./cart.route');
const Catalog = require('./catalog.route');
const Order = require('./order.route');


router.use('/user', User);
router.use('/product', Product);
router.use('/cart', Cart);
router.use('/catalog', Catalog);
router.use('/order', Order);


module.exports = router;