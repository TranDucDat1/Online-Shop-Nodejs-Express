const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const { ProductService, ReviewService } = require('../service');

exports.createProduct = async (req, res) => {
    const data = req.body;
    const newData = {
        name: data.name,
        price: Number(data.price),
        amount: Number(data.amount),
        description: data.description,
        image: {
            data: fs.readFileSync(path.join(__dirname, '..', 'uploads', req.file.filename)),
            contentType: 'image/png'
        },
        catalog_name: data.catalog_name
    }
    try {
        await ProductService.createProduct(newData);
        return res.status(200).send('thanh cong');
    } catch (error) {
        console.log('error:', error);
        return res.status(500).send('Lỗi server');
    }
}

exports.softDeleteProduct = async (req, res) => {
    const product_id = req.params.id;

    try {
        const product = await ProductService.findProductById(product_id);
        if(_.isNil(product)) { return res.status(404).send('không tìm thấy sản phẩm') };

        await ProductService.softDeleteProduct(product_id);
        return res.status(200).send('Thành công');
    } catch (error) {
        console.log('error:', error);
        return res.status(500).send('Lỗi server');
    }
};

exports.restoreProduct = async (req, res) => {
    const product_id = req.params.id;

    try {
        const product = await ProductService.findProductDelete(product_id);
        if(_.isNil(product)) { return res.status(404).send('không tìm thấy sản phẩm') };

        await ProductService.restoreProduct(product_id);
        return res.status(200).send('Thành công');
    } catch (error) {
        console.log('error:', error);
        return res.status(500).send('Lỗi server');
    }
};

exports.updateProduct = async (req, res) => {
    const data = req.body;
    const product_id = { _id: data.id };
    const newData = {
        name: data.name,
        price: Number(data.price),
        amount: Number(data.amount),
        description: data.description,
        image: {
            data: fs.readFileSync(path.join(__dirname, '..', 'uploads', req.file.filename)),
            contentType: 'image/png'
        },
    }
    try {
        await ProductService.updateProduct(product_id, newData);
        return res.status(200).send('thanh cong');
    } catch (error) {
        console.log('error:', error);
        return res.status(500).send('Lỗi server');
    }
};

exports.deleteProduct = async (req, res) => {
    const product_id = req.params.id;

    try {
        const product = await ProductService.findProductDelete(product_id);
        if(_.isNil(product)) { return res.status(404).send('không tìm thấy sản phẩm') };

        await ProductService.deleteProductById(product_id);
        return res.status(200).send('Thành công');
    } catch (error) {
        console.log('error:', error);
        return res.status(500).send('Lỗi server');
    }
};

exports.getProduct = async (req, res) => {
    // using view engine
    // const items = await ProductService.findProduct();
    // res.render('renderImage', { items: items });
    
    try {
        const product_id = req.params.id;
        
        const [ product, review ] = await Promise.all([
            ProductService.findProductById(product_id),
            ReviewService.findReviewByProductId({ product_id })
        ])
        if(_.isNil(product)) { return res.status(404).send('Không tìm thấy sản phẩm') }
        if(_.isNil(review)) { return res.status(404).send('Không tìm thấy đánh giá') }
    
        const result = {
            product,
            review
        }
    
        return res.status(200).send(result);
    } catch (error) {
        console.log('error', error);
        return res.status(500).send('Lỗi hệ thống');
    }
};

exports.getManyProduct = async (req, res) => {
    const name = { name: new RegExp(req.query.name, 'i') };
    const filter = {
        pageNumber: req.query.pageNumber ? Number(req.query.pageNumber) : 0,
        limit: req.query.limit ? Number(req.query.limit) : 10
    };
    const sortByPrice = _.omitBy({ price: req.query.sort }, _.isNil)

    const products = await ProductService.findManyProduct(name, filter, sortByPrice);
    if(_.isEmpty(products)) { return res.status(404).send('Không tìm thấy sản phẩm nào')};

    const result = {
        products,
        pageNumber: filter.pageNumber
    }
    return res.status(200).send(result);
}; 