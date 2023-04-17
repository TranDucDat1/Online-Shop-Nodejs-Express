const express = require('express')
const router = express.Router()

const checkAuth = require('../middlewares/auth.middleware');
const { Review } = require('../controllers');

router.post('/create-comment-rate',checkAuth, Review.createReview);

module.exports = router;