const Order = require('../models/order.model');

exports.createOrder = async (data) => await Order.create(data);

