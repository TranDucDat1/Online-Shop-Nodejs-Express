const _ = require('lodash');

const { CartService, ProductService } = require('../service');

exports.getCart = async (req, res) => {
    const user_id = req.user.user_id;
    const cart = await CartService.findCartByUserId(user_id);
    return res.status(200).send(cart);
}

//only add one
exports.addProductToCart = async (req, res) => {
    const user_id = req.user.user_id;
    const product_id = req.body.items[0].product_id;
    const quantity = Number(req.body.items[0].quantity);

    const items = [{product_id, quantity}]

    const product = await ProductService.findProductById(product_id);
    if(product.amount < quantity) { return res.status(404).send('hết hàng') }

    await CartService.findAndUpdateCart(user_id, items);

    return res.status(200).send('Thành công');
};

exports.deleteAllCart = async (req, res) => {
    const user_id = req.user.user_id;
    const items = [];
    await CartService.updateCart(user_id, items)
    return res.status(200).send('Thành công');
}