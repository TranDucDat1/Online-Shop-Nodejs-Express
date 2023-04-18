const express = require('express')
const router = express.Router()

const checkAuth = require('../middlewares/auth.middleware');
const { Cart } = require('../controllers');

router.get('/get-cart', checkAuth, Cart.getCart);
router.post('/create-cart', checkAuth, Cart.addProductToCart);
router.post('/delete-all-cart', checkAuth, Cart.deleteAllCart);

module.exports = router;