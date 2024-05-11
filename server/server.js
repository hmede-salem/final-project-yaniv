const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const Customer = require("./models/customerModel");
app.use(express.json());
const PORT = 5002;

app.post("/login", async(req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res
            .status(400)
            .send({ success: false, msg: error.details[0].message });
    } else {
        const { email, password } = req.body;
        try {
            const customer = await Customer.findOne({ email });
            if (!customer) {
                res.status(400).send({
                    success: false,
                    msg: "Invalid email or password.",
                });
            } else {
                const validPassword = await bcrypt.compare(password, customer.password);
                if (validPassword) {
                    // const token = customer.generateAuthToken();
                    return res.status(200).send({
                        success: true,
                        // token: token,
                        id: customer._id,
                        firstName: customer.firstName,
                        lastName: customer.lastName,
                        email: customer.email,
                        role: customer.role,
                        msg: "loggedin",
                    });
                } else {
                    return res.status(400).send({
                        success: false,
                        msg: "Invalid email or password.",
                    });
                }
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).send(err.message);
        }
    }
});

app.post("/register", async(req, res) => {
    const { error } = validateRegister(req.body);
    if (error)
        res.status(400).send({
            success: false,
            data: {},
            msg: error.details[0].message,
        });
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
                    role: "customer",
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
            res.status(500).send(err.message);
        }
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

app.listen(PORT, () => {
    mongoose
        .connect("mongodb://localhost/eCommerceProject")
        .then(() => console.log("Connected to MongoDB..."))
        .catch((err) => console.log(err.message));

    console.log(`Listening to PORT ${PORT}..`);
});