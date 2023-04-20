const _ = require('lodash');
const moment = require('moment');

const { OrderService, CartService, ProductService, UserService } = require('../service');
const STATUS = require('../constants/order.constants');

exports.getAllOrderUser = async (req, res) => {
    const pageNumber = Number(req.query.pageNumber);
    const limit = Number(req.query.limit);
    const data = _.omitBy({
        user_id: req.user.user_id,
        _id: req.query.idOrder,
        status: Number(req.query.status)
    }, _.isNil)

    const order = await OrderService.findOrdersUser(data, pageNumber, limit);

    const result = {
        order,
        pageNumber,
    }
    
    return res.status(200).json(result);
};

exports.getDetailOrder = async (req, res) => {
    const order = await OrderService.findOrderById(req.params.id);
    if(_.isNil(order)) { return res.status(404).send('không tìm thấy sản phẩm')}
    return res.status(200).json(order);
};

// BE sử lý, khi FE call api này thì chỉ cần có value trong cart
exports.createOrder = async (req, res) => {
    const user = req.user;
    const dayNow = moment().format("DD-MM-YYYY hh:mm");

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
        user_id: user.user_id,
        items: itemsOrder,
        totalPrice: Number(totalPrice),
        status: 0,
        pending_date: dayNow
    }

    await OrderService.createOrder(data);

    return res.status(200).send('Thành công');
};

exports.cancelOrder = async (req, res) => {
    const order_id = req.params.id;
    const dateNow = moment().format("DD-MM-YYYY hh:mm");
    const order = await OrderService.findOrderById(order_id);
    if(order.status === STATUS.STATUS.pending) {
        const data ={
            status: 1,
            status_change: `Chuyển trạng thái từ: 'pending' sang 'cancel'`,
            cancel_date: dateNow
        }
        console.log('true', data);
        await OrderService.updateOrderById(order_id, data);
    } else if(order.status === STATUS.STATUS.shipping) {
        const data ={
            status: 1,
            status_change: order.status_change + ` sang 'cancel'`,
            cancel_date: dateNow
        }
        console.log('true', data);
        await OrderService.updateOrderById(order_id, data);
    } else {
        return res.status(404).send('Không được phép hủy');
    }

    return res.status(200).send('Thành công');
};

exports.shippingOrder = async (req, res) => {
    const order_id = req.params.id;
    console.log('order_id', order_id);
    const dateNow = moment().format("DD-MM-YYYY hh:mm");
    const order = await OrderService.findOrderById(order_id);
    if(_.isNil(order)) { return res.status(404).send('Order không tồn tại')};
    if(order.status === STATUS.STATUS.pending) {
        const data ={
            status: 2,
            status_change: `Chuyển trạng thái từ: 'pending' sang 'shipping'`,
            shipping_date: dateNow
        }
        console.log('true', data);
        await OrderService.updateOrderById(order_id, data);
    } else {
        return res.status(404).send('Không được phép chuyển trạng thái shipping');
    }

    return res.status(200).send('Thành công');
};

exports.successOrder = async (req, res) => {
    const order_id = req.params.id;
    console.log('order_id', order_id);
    const dateNow = moment().format("DD-MM-YYYY hh:mm");
    const order = await OrderService.findOrderById(order_id);
    if(_.isNil(order)) { return res.status(404).send('Order không tồn tại')};
    if(order.status === STATUS.STATUS.pending) {
        const data ={
            status: 3,
            status_change: `Chuyển trạng thái từ: 'pending' sang 'success'`,
            success_date: dateNow
        }
        console.log('true', data);
        await OrderService.updateOrderById(order_id, data);
    } else if(order.status === STATUS.STATUS.shipping) {
        const data ={
            status: 3,
            status_change: order.status_change + ` sang 'success'`,
            success_date: dateNow
        }
        console.log('true', data);
        await OrderService.updateOrderById(order_id, data);
    } else {
        return res.status(404).send('Không được phép chuyển trạng thái success');
    }

    return res.status(200).send('Thành công');
};