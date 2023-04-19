const _ = require('lodash');

const { CartService, ProductService } = require('../service');

exports.getCart = async (req, res) => {
    const user_id = req.user.user_id;
    const cart = await CartService.findCartByUserId(user_id);
    return res.status(200).send(cart);
}

// để bên FE xử lý cộng amount, BE chỉ thực hiện update khi FE gửi dữ liệu lên
exports.addProductToCart = async (req, res) => {
    const user_id = req.user.user_id;
    const items = req.body.items;
    
    const products_id = [];
    for (const item of items) {
        products_id.push(item.product_id);
    }
    console.log('items:', items);

    // xử lý khi một sản phẩm đã hết hàng thì không cho sản phẩm đó vào giỏ hàng
    const soldOut = [];
    const products = await ProductService.findManyProductById(products_id);
    for (const product of products) {
        for (const item in items) {
            if(String(product._id) === String(items[item].product_id)) {
                if(product.amount < Number(items[item].quantity)) {
                    soldOut.push(product.name);
                    items.splice(item, 1);
                }
            }
        }
    }

    console.log('sau khi cat items: ', items);
    console.log('soldOut', soldOut);

    await CartService.findAndUpdateCart(user_id, items);

    return res.status(200).send(items);
};

exports.deleteAllCart = async (req, res) => {
    const user_id = req.user.user_id;
    const items = [];
    await CartService.updateCart(user_id, items)
    return res.status(200).send('Thành công');
}