const express = require('express')
const router = express.Router()

const { Order } = require('../controllers');
const checkAuth = require('../middlewares/auth.middleware');

router.get('/get-order', checkAuth, Order.getOrder);
router.post('/create-order', checkAuth, Order.createOrder);

module.exports = router;