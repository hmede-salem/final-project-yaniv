const { model, Schema, default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const cartSchema = new Schema({
    count: {
        type: Number,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
});

const customerSchema = new Schema({
    firstName: {
        type: String,
        minlength: 2,
        required: true,
    },
    lastName: {
        type: String,
        minlength: 2,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlenght: 6,
        required: true,
    },
    role: {
        type: String,
        default: 'customer',
    },
    cart: [{
        type: cartSchema,
    }, ],
});

// customerSchema.methods.generateAuthToken = function() {
//     return jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
// };

const Customer = model("Customer", customerSchema);

module.exports = Customer;