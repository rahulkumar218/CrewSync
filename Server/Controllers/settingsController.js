const db = require("../config/db");

// ================= GET SETTINGS =================

const getSettings = (req, res) => {
    const { userId } = req.params;

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

module.exports = {
    getSettings,
    updateSettings,
};