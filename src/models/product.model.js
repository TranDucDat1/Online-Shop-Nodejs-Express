const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoose_delete = require('mongoose-delete');

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
        view: { type: Number },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        collection: 'products',
    }
);

productSchema.plugin(mongoose_delete, { overrideMethods: true });

module.exports = mongoose.model('products', productSchema);