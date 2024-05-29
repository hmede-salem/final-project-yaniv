const { model, Schema, default: mongoose } = require("mongoose");

const categorySchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    valid: {
        type: Boolean,
        default: true,
    },
});

const Category = model("Category", categorySchema);

module.exports = Category;