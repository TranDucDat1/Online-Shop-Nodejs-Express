// const bcrypt = require('bcrypt');
const _ = require('lodash');

// const password = '123';
// // const hashPassword = function hashPassword(){ bcrypt.hash(password, 10, async (err, hash) => {
// //     return hash
// // })};

// const hash = bcrypt.hashSync(password, 10);
// console.log('hashPassword: ', hash);

const products = {};
const items = [
    {
        _id: '6445e88db77ec72c8ccbd1d1',
        product_id: '64396eeac4bc3e318811f240',
        product_name: 'áo thun',
        amount: 1,
        totalPriceProduct: 10000
    },
    {
        _id: '6445e88db77ec72c8ccbd1d2',
        product_id: '643f648198ee131ddcbab90f',
        product_name: 'Áo bò',
        amount: 20,
        totalPriceProduct: 2010000
    },
    {
        _id: '6445e88db77ec72c8ccbd1d3',
        product_id: '643f64c898ee131ddcbab912',
        product_name: 'Quần bò',
        amount: 5,
        totalPriceProduct: 3010000
    }

]

for (const item of items) {
    if(_.isNil(item.product_id)) { continue; }
    
    // Check if product already exists in products object
    if(products[item.product_id]) {
       products[item.product_id].amount += item.amount;
    } else {
        // If product does NOT exist in products object
        products[item.product_id] = {
            product_name: item.product_name,
            amount: item.amount,
        }
    }
}

console.log('a: ', products);

const topTenProducts = Object.keys(products)


console.log(topTenProducts);
