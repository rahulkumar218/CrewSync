const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    // Header se token lo
    const authHeader = req.headers.authorization;

    // Check karo token hai ya nahi
    if (!authHeader) {
        return res.status(401).json({
            message: "Access Denied. No Token Provided."
        });
    }

    // "Bearer TOKEN" me se TOKEN nikalo
    const token = authHeader.split(" ")[1];

    try {

        // Token verify karo
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // User information request me save karo
        req.user = decoded;

        // Next route par jao
        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or Expired Token"
        });

    }

};

module.exports = verifyToken;