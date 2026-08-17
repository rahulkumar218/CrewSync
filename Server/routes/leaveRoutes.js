const express = require("express");

const {
  getLeaves,
  getLeaveById,
  addLeave,
  updateLeave,
  deleteLeave,
} = require("../Controllers/leaveController");

const router = express.Router();

router.get("/", getLeaves);

router.get("/:id", getLeaveById);

router.post("/", addLeave);

router.put("/:id", updateLeave);

router.delete("/:id", deleteLeave);

module.exports = router;