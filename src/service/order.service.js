const Order = require('../models/order.model');

exports.createOrder = async (data) => await Order.create(data);

exports.findOrdersUser = async (data, pageNumber, limit) => await Order.find(data).sort({ createdAt: 'asc'}).skip(pageNumber * limit).limit(limit);

exports.findOrderById = async (id) => await Order.findById(id);

exports.updateOrderById = async (id, data) => await Order.updateOne({ _id: id }, data, { upsert: true });

