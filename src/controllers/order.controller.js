const _ = require('lodash');

const { OrderService, CartService, ProductService, UserService } = require('../service');

exports.getOrder = async (req, res) => {
    const user = req.user;
    console.log('user', user);
    return res.status(200).send('Thành công');
};

// BE sử lý, khi FE call api này thì chỉ cần có value trong cart
exports.createOrder = async (req, res) => {
    const user = req.user;

    const [getCart, getUser] = await Promise.all([CartService.findCartByUserId(user.user_id), UserService.findUserById(user.user_id)]);
    if(_.isNil(getCart)) { return res.status(404).send('không tìm thấy cart') }

    const items = getCart.items;

    const products_id = [];
    for (const item of items) {
        products_id.push(item.product_id);
    }

    let totalPrice = 0;
    const itemsOrder = [];
    const products = await ProductService.findManyProductById(products_id);
    for (const product of products) {
        for (const item of items) {
            if(String(item.product_id) === String(product._id)) {
                totalPrice = totalPrice + item.quantity * product.price;
                itemsOrder.push({
                    product_name: product.name,
                    amount: Number(item.quantity),
                    totalPriceProduct: Number(totalPrice),
                })
            }
        }
    }

    const data = {
        user_name: user.name,
        user_phone: user.phone,
        user_address: getUser.address ? getUser.address : 'địa chỉ không xác định',
        user_id: user.id,
        items: itemsOrder,
        totalPrice: Number(totalPrice),
        status: 0
    }

    await OrderService.createOrder(data);

    return res.status(200).send('Thành công');
};