const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String },
    code: { type: String, unique: true, required: true },
    stock: { type: Number, required: true, min: 0 },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
