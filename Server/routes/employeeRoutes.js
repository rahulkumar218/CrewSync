const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeController");


// View Employees → Any logged-in user
router.get("/", verifyToken, getEmployees);


// Add Employee → Admin + HR only
router.post(
    "/",
    verifyToken,
    authorizeRoles("Admin", "HR"),
    addEmployee
);


// Update Employee → Admin + HR only
router.put(
    "/:id",
    verifyToken,
    authorizeRoles("Admin", "HR"),
    updateEmployee
);


// Delete Employee → Admin only
router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("Admin"),
    deleteEmployee
);


module.exports = router;