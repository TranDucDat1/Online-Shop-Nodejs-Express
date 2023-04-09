import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        name: { type: String },
        user_id: { type: String },
        cart_id: { type: String }
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