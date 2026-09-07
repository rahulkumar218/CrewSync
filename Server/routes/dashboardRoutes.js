const express = require("express");

const {
    getDashboardData
} = require("../Controllers/dashboardController");

const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// ================= DASHBOARD =================

router.get(
    "/",
    verifyToken,
    getDashboardData
);

module.exports = router;