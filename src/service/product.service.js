const Product = require('../models/product.model');

exports.createProduct = async (data) => await Product.create(data);

exports.updateProduct = async (product_id, data) => await Product.create(product_id, data);

exports.findProduct = async () => await Product.find({});

exports.findProductById = async (id) => await Product.findById(id);

exports.findManyProductById = async (ids) => await Product.find({ _id: { $in: ids } });

exports.findProductDelete = async (id) => await Product.findOneDeleted({ _id: id });

exports.deleteProductById = async (id) => await Product.deleteOne({ _id: id });

exports.findManyProduct = async (name, filter, sortByPrice) => await Product.find(name)
                                                                            .sort(sortByPrice)
                                                                            .skip(filter.pageNumber * filter.limit)
                                                                            .limit(filter.limit);

exports.softDeleteProduct = async (id) => await Product.delete({ _id: id });

exports.restoreProduct = async (id) => await Product.findOneAndUpdateDeleted({ _id: id }, { $set: { deleted: false } });