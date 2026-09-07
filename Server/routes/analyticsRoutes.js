const express = require("express");

const {
    getAnalyticsSummary,
    getAttendanceOverview,
    getLeaveDistribution,
    getEmployeeGrowth,
    getDepartmentPerformance
} = require("../Controllers/analyticsController");

const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// ================= ANALYTICS SUMMARY =================

router.get(
    "/summary",
    verifyToken,
    getAnalyticsSummary
);

// ================= ATTENDANCE OVERVIEW =================

router.get(
    "/attendance",
    verifyToken,
    getAttendanceOverview
);

// ================= LEAVE DISTRIBUTION =================

router.get(
    "/leave-distribution",
    verifyToken,
    getLeaveDistribution
);

// ================= EMPLOYEE GROWTH =================

router.get(
    "/employee-growth",
    verifyToken,
    getEmployeeGrowth
);

// ================= DEPARTMENT PERFORMANCE =================

router.get(
    "/department-performance",
    verifyToken,
    getDepartmentPerformance
);

module.exports = router;