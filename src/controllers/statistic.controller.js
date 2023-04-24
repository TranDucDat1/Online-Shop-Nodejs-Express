const _ = require('lodash');

const { CatalogService, Statistic } = require('../service');
const formatDate = require('../utils/format.date');

exports.getTopTenProduct = async (req, res) => {
    try {
        // Lấy ngày hiện tại
        const today = new Date();

        // Lấy ngày đầu tiên của tháng
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // Lấy ngày cuối cùng của tháng
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        console.log('last day of month: ' + lastDayOfMonth);

        const firstDay = formatDate.formatDate(firstDayOfMonth);
        const lastDay = formatDate.formatDate(lastDayOfMonth);

        const orders = await Statistic.findTopTenOfMonth(firstDay, lastDay);
        const products = {};
        for (const order of orders) {
            for (const item of order.items) {
                if(_.isNil(item.product_id)) { continue; }
                
                if(products[item.product_id]) {
                    products[item.product_id].amount += item.amount;
                } else {
                    products[item.product_id] = {
                        product_name: item.product_name,
                        amount: item.amount
                    }
                }
            }
        }

        console.log('products: ', products);

        const topTenProducts = Object.values(products).sort((a, b) => b.amount - a.amount).slice(0, 10)

        console.log('topTen: ', topTenProducts);

        return res.status(200).json({
            success: true,
            data: topTenProducts
        });
    } catch (error) {
        console.log('error:', error);
        return res.status(500).send('Lỗi server');
    }
}
