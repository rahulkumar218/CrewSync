const db = require("../config/db");
const bcrypt = require("bcrypt");

// ================= GET SETTINGS =================

const getSettings = (req, res) => {
    const { userId } = req.params;

    // User can access only their own settings
    if (Number(req.user.id) !== Number(userId)) {
        return res.status(403).json({
            message: "Access denied",
        });
    }

    const sql = `
        SELECT
            user_id,
            email_notifications,
            payroll_alerts,
            leave_requests,
            birthday_reminders,
            attendance_alerts,
            theme,
            accent_color
        FROM settings
        WHERE user_id = ?
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Get settings error:", err);

            return res.status(500).json({
                message: "Failed to fetch settings",
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Settings not found",
            });
        }

        res.status(200).json(results[0]);
    });
};


// ================= UPDATE SETTINGS =================

const updateSettings = (req, res) => {
    const { userId } = req.params;

    if (Number(req.user.id) !== Number(userId)) {
        return res.status(403).json({
            message: "Access denied",
        });
    }

    const {
        email_notifications,
        payroll_alerts,
        leave_requests,
        birthday_reminders,
        attendance_alerts,
        theme,
        accent_color,
    } = req.body;

    const sql = `
        UPDATE settings
        SET
            email_notifications = ?,
            payroll_alerts = ?,
            leave_requests = ?,
            birthday_reminders = ?,
            attendance_alerts = ?,
            theme = ?,
            accent_color = ?
        WHERE user_id = ?
    `;

    const values = [
        email_notifications,
        payroll_alerts,
        leave_requests,
        birthday_reminders,
        attendance_alerts,
        theme,
        accent_color,
        userId,
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Update settings error:", err);

            return res.status(500).json({
                message: "Failed to update settings",
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Settings not found",
            });
        }

        res.status(200).json({
            message: "Settings updated successfully",
        });
    });
};


// ================= GET PROFILE =================

const getProfile = (req, res) => {
    const userId = req.user.id;

    const sql = `
        SELECT
            user_id,
            full_name,
            email,
            phone,
            role
        FROM users
        WHERE user_id = ?
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Get profile error:", err);

            return res.status(500).json({
                message: "Failed to fetch profile",
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json(results[0]);
    });
};


// ================= UPDATE PROFILE =================

const updateProfile = (req, res) => {
    const userId = req.user.id;

    const {
        full_name,
        email,
        phone,
    } = req.body;

    if (!full_name || !email) {
        return res.status(400).json({
            message: "Full name and email are required",
        });
    }

    const sql = `
        UPDATE users
        SET
            full_name = ?,
            email = ?,
            phone = ?
        WHERE user_id = ?
    `;

    db.query(
        sql,
        [full_name, email, phone || null, userId],
        (err, result) => {
            if (err) {
                console.error("Update profile error:", err);

                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        message: "Email already exists",
                    });
                }

                return res.status(500).json({
                    message: "Failed to update profile",
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            res.status(200).json({
                message: "Profile updated successfully",
            });
        }
    );
};


// ================= CHANGE PASSWORD =================

const changePassword = async (req, res) => {
    const userId = req.user.id;

    const {
        currentPassword,
        newPassword,
    } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({
            message: "Current password and new password are required",
        });
    }

    if (newPassword.length < 6) {
        return res.status(400).json({
            message: "New password must contain at least 6 characters",
        });
    }

    try {
        const sql = `
            SELECT password
            FROM users
            WHERE user_id = ?
        `;

        db.query(sql, [userId], async (err, results) => {
            if (err) {
                console.error("Get password error:", err);

                return res.status(500).json({
                    message: "Database Error",
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            const user = results[0];

            const isMatch = await bcrypt.compare(
                currentPassword,
                user.password
            );

            if (!isMatch) {
                return res.status(401).json({
                    message: "Current password is incorrect",
                });
            }

            const hashedPassword = await bcrypt.hash(
                newPassword,
                10
            );

            const updateSql = `
                UPDATE users
                SET password = ?
                WHERE user_id = ?
            `;

            db.query(
                updateSql,
                [hashedPassword, userId],
                (updateErr, result) => {
                    if (updateErr) {
                        console.error(
                            "Update password error:",
                            updateErr
                        );

                        return res.status(500).json({
                            message: "Failed to update password",
                        });
                    }

                    if (result.affectedRows === 0) {
                        return res.status(404).json({
                            message: "User not found",
                        });
                    }

                    res.status(200).json({
                        message: "Password updated successfully",
                    });
                }
            );
        });
    } catch (error) {
        console.error("Password change error:", error);

        return res.status(500).json({
            message: "Server Error",
        });
    }
};


module.exports = {
    getSettings,
    updateSettings,
    getProfile,
    updateProfile,
    changePassword,
};