const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        user_name: { type: String },
        user_phone: { type: String },
        uer_address: { type: String },
        user_id: { type: mongoose.Types.ObjectId },
        items: [{ product_name: { type: String }, amount: { type: Number }, totalPriceProduct: { type: Number }}],
        totalPrice: { type: Number },
        status: { type: Number },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        collection: 'orders',
    }
);

module.exports = mongoose.model('orders', orderSchema);