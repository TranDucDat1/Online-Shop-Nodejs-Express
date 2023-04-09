import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema(
    {
        items: [{ product_id: {type: String } }]
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        collection: 'carts',
    }
);

module.exports = mongoose.model('carts', cartSchema);