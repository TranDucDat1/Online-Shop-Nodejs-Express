const Review = require('../models/review.model');

exports.createReview = async (data) => await Review.create(data);

exports.findReviewByProductId = async (prd_id) => await Review.find(prd_id);