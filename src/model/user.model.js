const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: { type: String, required: true},
        phone: { type: String},
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

module.exports = mongoose.model('users', userSchema);

