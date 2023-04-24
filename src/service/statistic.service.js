const Product = require('../models/product.model');
const Order = require('../models/order.model');

exports.findTopTenOfMonth = async (firstDay, lastDay) => await Order.find({ created_at: { $gte: new Date(firstDay), $lte: new Date(lastDay) }});