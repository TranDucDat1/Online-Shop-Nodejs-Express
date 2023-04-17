const express = require('express')
const router = express.Router()

//using multer
const upload = require('../configs/multer.config');
const { Product } = require('../controllers');
const checkAuth = require('../middlewares/auth.middleware');

router.get('/get-many-product', Product.getManyProduct);
router.get('/get-product/:id', Product.getProduct);
router.post('/create-product', upload.single('image'), Product.createProduct);
router.delete('/soft-delete-product/:id', checkAuth, Product.softDeleteProduct);
router.get('/restore-product/:id', checkAuth, Product.restoreProduct);
router.patch('/update-product/:id', checkAuth, Product.updateProduct);
router.delete('/delete-product/:id', checkAuth, Product.deleteProduct);

module.exports = router;