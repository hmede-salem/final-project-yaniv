const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json("Access denied, No token provided.");
    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        if (!decoded) return res.status(400).json("Invalid token.");
        req.customer = decoded;
        next();
    } catch (ex) {
        res.status(400).json("Invalid token.");
    }
};