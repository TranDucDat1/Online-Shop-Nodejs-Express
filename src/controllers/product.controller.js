const fs = require('fs');
const path = require('path');
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

exports.getProduct = async (req, res) => {
    // using view engine
    // const items = await ProductService.findProduct();
    // res.render('renderImage', { items: items });
    
    const product_id = req.params.id;
    
    const [ product, review ] = await Promise.all([
        ProductService.findProductById(product_id),
        ReviewService.findReviewByProductId({ product_id })
    ])

    const result = {
        product,
        review
    }

    return res.status(200).send(result);
};

exports.getManyProduct = async (req, res) => {
    console.log('request: ', req.query);
    return res.status(200).send('thanh cong');
};