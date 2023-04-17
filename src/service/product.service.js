const Product = require('../models/product.model');

exports.createProduct = async (data) => await Product.create(data);

exports.findProduct = async () => await Product.find({});

exports.findProductById = async (id) => await Product.findById(id);