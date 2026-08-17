const express = require("express");

const {
    getPayroll,
    getPayrollById,
    addPayroll,
    updatePayroll,
    deletePayroll,
} = require("../Controllers/payrollController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// ================= PAYROLL ROUTES =================

// Get all payroll records
router.get(
    "/",
    authMiddleware,
    roleMiddleware("HR Manager", "Admin"),
    getPayroll
);

// Get payroll by ID
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("HR Manager", "Admin"),
    getPayrollById
);

// Add payroll
router.post(
    "/",
    authMiddleware,
    roleMiddleware("HR Manager", "Admin"),
    addPayroll
);

// Update payroll
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("HR Manager", "Admin"),
    updatePayroll
);

// Delete payroll
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("HR Manager", "Admin"),
    deletePayroll
);

module.exports = router;