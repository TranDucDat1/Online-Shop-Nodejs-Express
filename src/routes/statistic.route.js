const express = require('express')
const router = express.Router()

const checkAuth = require('../middlewares/auth.middleware');
const { Statistic } = require('../controllers');

router.get('/get-top-ten-product-of-month', Statistic.getTopTenProduct);

module.exports = router;