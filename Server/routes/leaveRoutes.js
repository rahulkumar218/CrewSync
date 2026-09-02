const express = require("express");

const {
  getLeaves,
  getLeaveById,
  addLeave,
  updateLeave,
  deleteLeave,
} = require("../Controllers/leaveController");

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", verifyToken, getLeaves);

router.get("/:id", verifyToken, getLeaveById);

router.post(
  "/",
  verifyToken,
  authorizeRoles("Admin", "HR"),
  addLeave
);

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("Admin", "HR"),
  updateLeave
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("Admin"),
  deleteLeave
);

module.exports = router;