const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
getSettings,
updateSettings,
getProfile,
updateProfile,
changePassword,
} = require("../Controllers/settingsController");

// ================= PROFILE =================

router.get("/profile", verifyToken, getProfile);

router.put("/profile", verifyToken, updateProfile);

// ================= PASSWORD =================

router.put("/password", verifyToken, changePassword);

// ================= SETTINGS =================

router.get("/:userId", verifyToken, getSettings);

router.put("/:userId", verifyToken, updateSettings);

module.exports = router;
