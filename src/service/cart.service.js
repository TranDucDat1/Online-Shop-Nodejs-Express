const Cart = require('../models/cart.model');

exports.createCart = async (data) => await Cart.create(data);

exports.findCartByUserId = async (user_id) => await Cart.findOne({ user_id }).lean();

exports.updateCart = async (user_id, items) => await Cart.update({ user_id }, { items });

exports.findAndUpdateCart = async (user_id, items) => await Cart.findOneAndUpdate({ user_id }, { items }, { upsert: true });