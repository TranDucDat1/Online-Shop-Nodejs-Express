

const fs = require('fs');
const path = require('path');
const { ProductService } = require('../service');

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
        return res.status(500).send('Lỗi server');
        console.log('error:', error);
    }
}

exports.getProduct = async (req, res) => {
    const items = await ProductService.findProduct();
    // console.log('data', items);
    res.render('renderImage', { items: items });
    // return res.status(200).send('thanh cong');
};

exports.getManyProduct = async (req, res) => {
    console.log('request: ', req.query);
    return res.status(200).send('thanh cong');
};