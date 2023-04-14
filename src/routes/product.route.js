const express = require('express')
const router = express.Router()

const { Product } = require('../controllers');
const upload = require('../configs/multer.config');

router.get('/get-many-product', Product.getManyProduct);
router.get('/get-product', Product.getProduct);
router.post('/create-product', upload.single('image'), Product.createProduct);

module.exports = router;