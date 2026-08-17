const db = require("../config/db");

// =====================================================
// GET ALL ATTENDANCE
// =====================================================

const getAttendance = (req, res) => {
    const sql = `
        SELECT
            a.attendance_id,
            a.employee_id,
            e.first_name,
            e.last_name,
            a.date,
            a.check_in,
            a.check_out,
            TIMEDIFF(a.check_out, a.check_in) AS working_hours,
            a.status
        FROM attendance a
        INNER JOIN employees e
            ON a.employee_id = e.employee_id
        ORDER BY a.date DESC, a.attendance_id DESC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Get Attendance Error:", err);

            return res.status(500).json({
                message: "Database Error"
            });
        }

        return res.status(200).json(result);
    });
};


// =====================================================
// ADD ATTENDANCE
// =====================================================

const addAttendance = (req, res) => {
    const {
        employee_id,
        date,
        check_in,
        check_out,
        status
    } = req.body;

    // Required fields
    if (!employee_id || !date || !status) {
        return res.status(400).json({
            message: "employee_id, date and status are required"
        });
    }

    // Allowed statuses
    const allowedStatuses = [
        "Present",
        "Late",
        "Absent"
    ];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
            message: "Invalid attendance status"
        });
    }

    // Check employee exists
    const employeeSql = `
        SELECT employee_id
        FROM employees
        WHERE employee_id = ?
    `;

    db.query(employeeSql, [employee_id], (employeeErr, employeeResult) => {

        if (employeeErr) {
            console.error(
                "Employee Check Error:",
                employeeErr
            );

            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (employeeResult.length === 0) {
            return res.status(404).json({
                message: "Employee Not Found"
            });
        }

        // Insert attendance
        const insertSql = `
            INSERT INTO attendance
            (
                employee_id,
                date,
                check_in,
                check_out,
                status
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            insertSql,
            [
                employee_id,
                date,
                check_in || null,
                check_out || null,
                status
            ],
            (err, result) => {

                if (err) {
                    console.error(
                        "Add Attendance Error:",
                        err
                    );

                    // Duplicate employee + date
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(409).json({
                            message:
                                "Attendance already exists for this employee on this date"
                        });
                    }

                    return res.status(500).json({
                        message: "Database Error"
                    });
                }

                return res.status(201).json({
                    message:
                        "Attendance Added Successfully",
                    attendanceId: result.insertId
                });
            }
        );
    });
};


// =====================================================
// UPDATE ATTENDANCE
// =====================================================

const updateAttendance = (req, res) => {
    const { id } = req.params;

    const {
        employee_id,
        date,
        check_in,
        check_out,
        status
    } = req.body;

    if (!employee_id || !date || !status) {
        return res.status(400).json({
            message: "employee_id, date and status are required"
        });
    }

    const allowedStatuses = [
        "Present",
        "Late",
        "Absent"
    ];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
            message: "Invalid attendance status"
        });
    }

    // Check employee exists
    const employeeSql = `
        SELECT employee_id
        FROM employees
        WHERE employee_id = ?
    `;

    db.query(
        employeeSql,
        [employee_id],
        (employeeErr, employeeResult) => {

            if (employeeErr) {
                console.error(
                    "Employee Check Error:",
                    employeeErr
                );

                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (employeeResult.length === 0) {
                return res.status(404).json({
                    message: "Employee Not Found"
                });
            }

            // Update attendance
            const updateSql = `
                UPDATE attendance
                SET
                    employee_id = ?,
                    date = ?,
                    check_in = ?,
                    check_out = ?,
                    status = ?
                WHERE attendance_id = ?
            `;

            db.query(
                updateSql,
                [
                    employee_id,
                    date,
                    check_in || null,
                    check_out || null,
                    status,
                    id
                ],
                (err, result) => {

                    if (err) {
                        console.error(
                            "Update Attendance Error:",
                            err
                        );

                        if (err.code === "ER_DUP_ENTRY") {
                            return res.status(409).json({
                                message:
                                    "Another attendance record already exists for this employee on this date"
                            });
                        }

                        return res.status(500).json({
                            message: "Database Error"
                        });
                    }

                    if (result.affectedRows === 0) {
                        return res.status(404).json({
                            message: "Attendance Not Found"
                        });
                    }

                    return res.status(200).json({
                        message:
                            "Attendance Updated Successfully"
                    });
                }
            );
        }
    );
};


// =====================================================
// DELETE ATTENDANCE
// =====================================================

const deleteAttendance = (req, res) => {
    const { id } = req.params;

    const sql = `
        DELETE FROM attendance
        WHERE attendance_id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.error(
                "Delete Attendance Error:",
                err
            );

            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Attendance Not Found"
            });
        }

        return res.status(200).json({
            message:
                "Attendance Deleted Successfully"
        });
    });
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
    getAttendance,
    addAttendance,
    updateAttendance,
    deleteAttendance
};