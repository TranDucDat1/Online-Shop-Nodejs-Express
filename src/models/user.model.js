const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoose_delete = require('mongoose-delete');

const userSchema = new Schema(
    {
        name: { type: String, required: true},
        phone: { type: String, required: true},
        email: { type: String, required: true},
        password: { type: String, required: true},
        role: { type: Number },
        cart_id: { type: String },
        status: { type: Number },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        collection: 'users',
    }
);

userSchema.plugin(mongoose_delete, { overrideMethods: true });

module.exports = mongoose.model('users', userSchema);

