const { model, Schema, default: mongoose } = require("mongoose");

const productSchema = new Schema({
    id: {
        type: String,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    images: [{
        type: String,
        required: true,
        min: 1,
    }, ],
    sold: {
        type: Number,
        default: 0,
    },
    type: {
        type: String,
        required: true,
    },
});

const Product = model("Product", productSchema);

module.exports = Product;