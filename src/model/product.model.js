const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        name: { type: String, default: 'Một sản phẩm'},
        price: { type: Number },
        amount: { type: Number },
        description: { type: String },
        rate: { type: Number },
        comments: [{ user_id: { type: String}, body: { type: String }}],
        image: { type: String }, // cos thay doi
        catalog_id: { type: String },
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