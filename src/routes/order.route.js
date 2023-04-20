const express = require('express')
const router = express.Router()

const { Order } = require('../controllers');
const checkAuth = require('../middlewares/auth.middleware');

router.get('/get-all-order-user', checkAuth, Order.getAllOrderUser);
router.get('/get-detail-order/:id', checkAuth, Order.getDetailOrder);
router.get('/cancel-order/:id', checkAuth, Order.cancelOrder);
router.get('/shipping-order/:id', checkAuth, Order.shippingOrder);
router.get('/success-order/:id', checkAuth, Order.successOrder);
router.post('/create-order', checkAuth, Order.createOrder);

module.exports = router;