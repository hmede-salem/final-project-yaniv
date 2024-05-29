const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const Customer = require("./models/customerModel");
const Category = require("./models/categoryModel");
const auth = require("./middleware/auth");
const Product = require("./models/productModel");
app.use(cors());
app.use(express.json());
const PORT = 5002;

app.post("/login", async(req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res
            .status(400)
            .json({ success: false, msg: error.details[0].message || error });
    } else {
        const { email, password } = req.body;
        try {
            const customer = await Customer.findOne({ email })
                .populate({
                    path: "cart",
                    populate: {
                        path: "productId",
                    },
                })
                .populate("orders");
            if (!customer) {
                res.status(400).json({
                    success: false,
                    msg: "Invalid email or password.",
                });
            } else {
                const validPassword = await bcrypt.compare(password, customer.password);
                if (validPassword) {
                    const token = customer.generateAuthToken();

                    return res.status(200).json({
                        success: true,
                        token: token,
                        id: customer._id,
                        orders: customer.orders,
                        firstName: customer.firstName,
                        lastName: customer.lastName,
                        email: customer.email,
                        role: customer.role,
                        cart: customer.cart,
                        msg: "loggedin",
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        msg: "Invalid email or password.",
                    });
                }
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ success: false, message: err.message || err });
        }
    }
});

app.post("/register", async(req, res) => {
    const { error } = validateRegister(req.body);
    if (error)
        res
        .status(400)
        .json({ success: false, msg: error.details[0].message || err });
    else {
        const { firstName, lastName, email, password } = req.body;

        try {
            let customer = await Customer.findOne({ email });
            if (customer) {
                res.status(400).send({
                    success: false,
                    msg: "User already registered.",
                });
            } else {
                customer = new Customer({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                });

                customer.password = await bcrypt.hash(password, 10);
                customer = await customer.save();
                res.status(200).send({
                    success: true,
                    data: customer,
                    msg: "User registered!",
                });
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ success: false, message: err.message || err });
        }
    }
});

app.get("/categories", async(req, res) => {
    try {
        const categories = await Category.find({ valid: true });
        res.status(200).json({
            success: true,
            data: categories,
            msg: "Categories sent.",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, message: err.message || err });
    }
});

app.delete("/category", async({ query: { catId } }, res) => {
    if (!catId) {
        return res.status(400).json({
            succes: false,
            message: "Category ID required!",
        });
    }
    try {
        const category = await Category.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(catId) }, { $set: { valid: false } });

        res.status(200).json({
            success: true,
            message: "Category Deleted.",
            data: category,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message || err });
    }
});
app.post("/category", auth, async(req, res) => {
    try {
        const newCategory = new Category({
            id: crypto.randomUUID(),
            category: req.body.newCategoryName,
        });
        newCategory.save();

        res.status(200).json({
            success: true,
            message: "Category Added.",
            data: newCategory,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message || err });
    }
});

app.put("/category", async({ body: { newCatName, catId } }, res) => {
    try {
        console.log(catId, newCatName);
        const category = await Category.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(catId) }, { $set: { category: newCatName } }, { new: true });
        // console.log(category);
        res.status(200).json({
            success: true,
            message: "Category Updated.",
            data: category,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || err,
        });
    }
});

app.get("/products", auth, async(req, res) => {
    const {
        query: { category, searchText },
    } = req;

    const regex = `\\b${searchText}`;
    try {
        const products = await Product.find({
            ...(searchText ? { title: new RegExp(regex, "i") } : {}),
            ...(category === "all" ? {} : { category: category }),
        }).populate({
            path: "category",
        });

        let response = products || [];

        res.status(200).json({
            data: response,
            success: true,
            message: "Ok",
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message || err });
    }
});

app.get("/products/:id", auth, async(req, res) => {
    try {
        const product = await Product.findOne({
            id: req.params.id,
        });
        res.status(200).json({
            data: product,
            success: true,
            msg: ` Product ID ${product.id}.`,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, message: err.message || err });
    }
});

app.post("/products/:id/update", auth, async(req, res) => {
    try {
        const product = await Product.findOneAndReplace({
                id: req.params.id,
            },
            req.body.product
        );
        res.status(200).json({
            success: true,
            data: product,
            msg: "Product Updated.",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, message: err.message || err });
    }
});

app.post("/product/add", auth, async(req, res) => {
    const { error } = validateProduct(req.body.product);
    if (error)
        return res.status(400).json({
            success: false,
            data: {},
            msg: error.details[0].message,
        });
    try {
        let product = new Product({...req.body.product });
        product = await product.save();
        res.status(200).json({
            success: true,
            data: product,
            msg: "Product Added Successfully!",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, message: err.message || err });
    }
});

app.post("/customers", auth, async(req, res) => {
    try {
        const customers = await Customer.find().populate({
            path: "orders",
            populate: {
                path: "productId",
            },
        });
        res.send(customers);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, message: err.message || err });
    }
});

app.get("/customer/cart", auth, async(req, res) => {
    try {
        const customer = await Customer.findById({ _id: req.customer._id });
        if (!customer) {
            res.status(404).send({
                success: false,
                msg: "Customer not found.",
            });
        }
        const { cart } = await customer.populate({
            path: "cart",
            populate: {
                path: "productId",
            },
        });
        res.status(200).json({
            data: cart,
            success: true,
            message: "Customer's cart sent",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, message: err.message || err });
    }
});

app.put(
    "/customer/cart/:implementation/:productId",
    auth,
    async({ params: { implementation, productId }, customer }, res) => {
        try {
            const client = await Customer.findById({
                _id: customer._id,
            }).populate({
                path: "cart",
                populate: {
                    path: "productId",
                },
            });

            if (!client) {
                res.status(404).json({
                    success: false,
                    msg: "Client not authenticated to modify cart.",
                });
            }

            const index = client.cart.findIndex(
                (item) => item.productId._id.toString() === productId.toString()
            );

            if (index >= 0) {
                if (implementation === "decrement" && client.cart[index].count > 1) {
                    client.cart[index].count -= 1;
                } else if (implementation === "increment") {
                    client.cart[index].count += 1;
                }
            } else {
                let newItem = {
                    productId: new mongoose.Types.ObjectId(productId),
                    count: 1,
                };
                client.cart.push(newItem);
            }

            await client.save();

            const newClient = await Customer.findById({
                _id: customer._id,
            }).populate({
                path: "cart",
                populate: {
                    path: "productId",
                },
            });

            res.status(200).json({
                success: true,
                msg: "Card modify successfully.",
                newCart: newClient.cart,
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ success: false, message: err.message || err });
        }
    }
);

app.delete(
    "/customer/cart/delete/:productId",
    auth,
    async({ params: { productId }, customer }, res) => {
        try {
            const client = await Customer.findById({ _id: customer._id }).populate({
                path: "cart",
                populate: {
                    path: "productId",
                },
            });

            if (!client) {
                res.status(404).send({
                    success: false,
                    msg: "Client not authenticated to mutate information.",
                });
            }

            client.cart = client.cart.filter(
                (product) => product.productId._id.toString() !== productId
            );

            await client.save();

            res.status(200).send({
                success: true,
                msg: "Item deleted successfully.",
                data: client.cart,
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ success: false, message: err.message || err });
        }
    }
);

app.post("/customer/order/add", auth, async(req, res) => {
    try {
        const customer = await Customer.findById({
            _id: req.customer._id,
        }).populate({
            path: "cart",
            populate: {
                path: "productId",
            },
        });
        // console.log(customer);
        if (!customer) {
            return res.status(404).json({
                success: false,
                msg: "Client not authenticated to post information.",
            });
        } else if (customer.cart.length === 0) {
            return res.status(200).json({
                success: false,
                msg: "Client's cart is empty!",
            });
        }

        customer.cart.forEach(async(p) => {
            customer.orders.push({ count: p.count, productId: p.productId });
            let product = await Product.findById(p.productId);

            product.stock = product.stock - p.count;
            product.sold = product.sold + p.count;
            await product.save();
        });

        customer.cart = [];
        await customer.save();

        res.status(200).json({
            success: true,
            msg: "Order has been successfully.",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, message: err.message || err });
    }
});

const validateUser = function(customer) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    });
    return schema.validate(customer);
};

const validateRegister = function(customer) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(customer);
};

const validateProduct = function(product) {
    const schema = Joi.object({
        id: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        details: Joi.string(),
        price: Joi.number().required(),
        discountPercentage: Joi.number(),
        rating: Joi.number(),
        stock: Joi.number(),
        brand: Joi.string().required(),
        // category: ObjectId.ObjectId().required(),
        category: Joi.string().required(),
        images: Joi.array().items(Joi.string().min(1)).required(),
        type: Joi.string().required(),
        sold: Joi.number(),
    });
    return schema.validate(product);
};

app.listen(PORT, () => {
    mongoose
        .connect("mongodb://localhost/eCommerceProject")
        .then(() => console.log("Connected to MongoDB..."))
        .catch((err) => console.log(err.message));
    console.log(`App is up and running on port:${PORT}`);
});