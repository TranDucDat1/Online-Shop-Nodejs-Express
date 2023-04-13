const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoose_delete = require('mongoose-delete');

const reviewSchema = new Schema(
    {
        user_id: { type: String },
        product_id: { type: String },
        comment: { type: String },
        rate: { type: Number },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        collection: 'reviews',
    }
);

reviewSchema.plugin(mongoose_delete, { overrideMethods: true });

module.exports = mongoose.model('reviews', reviewSchema);

