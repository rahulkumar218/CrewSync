const express = require("express");

const {
    getAttendance,
    addAttendance,
    updateAttendance,
    deleteAttendance
} = require("../Controllers/attendanceController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();


// =====================================================
// GET ALL ATTENDANCE
// Admin / HR / authenticated users
// =====================================================

router.get(
    "/",
    verifyToken,
    getAttendance
);


// =====================================================
// ADD ATTENDANCE
// Admin + HR
// =====================================================

router.post(
    "/",
    verifyToken,
    authorizeRoles("Admin", "HR"),
    addAttendance
);


// =====================================================
// UPDATE ATTENDANCE
// Admin + HR
// =====================================================

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("Admin", "HR"),
    updateAttendance
);


// =====================================================
// DELETE ATTENDANCE
// Admin only
// =====================================================

router.delete(
    "/:id",
    verifyToken,
    authorizeRoles("Admin"),
    deleteAttendance
);


module.exports = router;