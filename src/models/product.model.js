const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        name: { type: String, default: 'Một sản phẩm'},
        price: { type: Number },
        amount: { type: Number },
        description: { type: String },
        image: { 
            data: { type: Buffer },
            contentType: { type: String }    
        },
        // thẻ select
        catalog_name: { type: String },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        collection: 'products',
    }
);

module.exports = mongoose.model('products', productSchema);