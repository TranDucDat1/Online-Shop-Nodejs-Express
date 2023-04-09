import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const catalogSchema = new Schema(
    {
        name: { type: String },
        items: [{ product_id: { type: String } }]
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        collection: 'catalogs',
    }
);

module.exports = mongoose.model('catalogs', catalogSchema);