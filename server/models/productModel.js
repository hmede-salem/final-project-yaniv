const { model, Schema } = require("mongoose");

const productSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: [{
        type: String,
        required: true,
        min: 1,
    }, ],
});

const Product = model("Product", productSchema);

module.exports = Product;