const authorizeRoles = (...allowedRoles) => {

    return (req, res, next) => {

        // Check karo user authenticated hai ya nahi
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized. Please login first."
            });
        }

        // Check karo user ka role allowed hai ya nahi
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access Forbidden. You don't have permission."
            });
        }

        // Role allowed hai
        next();
    };
};

module.exports = authorizeRoles;