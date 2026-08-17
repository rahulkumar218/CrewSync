const db = require("../config/db");

// ================= ANALYTICS SUMMARY =================

const getAnalyticsSummary = (req, res) => {
    const employeeSql = `
        SELECT COUNT(*) AS totalEmployees
        FROM employees
    `;

    const attendanceSql = `
        SELECT
            ROUND(
                (SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END)
                / NULLIF(COUNT(*), 0)) * 100,
                1
            ) AS avgAttendance
        FROM attendance
    `;

    const leaveSql = `
        SELECT COUNT(*) AS totalLeaves
        FROM leave_requests
    `;

    db.query(employeeSql, (err, employeeResult) => {
        if (err) {
            console.error("Analytics Employee Error:", err);

            return res.status(500).json({
                message: "Database Error"
            });
        }

        db.query(attendanceSql, (err, attendanceResult) => {
            if (err) {
                console.error("Analytics Attendance Error:", err);

                return res.status(500).json({
                    message: "Database Error"
                });
            }

            db.query(leaveSql, (err, leaveResult) => {
                if (err) {
                    console.error("Analytics Leave Error:", err);

                    return res.status(500).json({
                        message: "Database Error"
                    });
                }

                res.status(200).json({
                    totalEmployees:
                        employeeResult[0].totalEmployees,

                    avgAttendance:
                        attendanceResult[0].avgAttendance || 0,

                    totalLeaves:
                        leaveResult[0].totalLeaves
                });
            });
        });
    });
};


// ================= ATTENDANCE OVERVIEW =================

const getAttendanceOverview = (req, res) => {

    const sql = `
        SELECT
            DATE_FORMAT(date, '%Y-%m') AS month,

            COUNT(*) AS totalRecords,

            SUM(
                CASE
                    WHEN status = 'Present'
                    THEN 1
                    ELSE 0
                END
            ) AS present,

            SUM(
                CASE
                    WHEN status = 'Late'
                    THEN 1
                    ELSE 0
                END
            ) AS late,

            SUM(
                CASE
                    WHEN status = 'Absent'
                    THEN 1
                    ELSE 0
                END
            ) AS absent,

            ROUND(
                (
                    SUM(
                        CASE
                            WHEN status = 'Present'
                            THEN 1
                            ELSE 0
                        END
                    ) / COUNT(*)
                ) * 100,
                1
            ) AS attendancePercentage

        FROM attendance

        GROUP BY DATE_FORMAT(date, '%Y-%m')

        ORDER BY month ASC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.error(
                "Attendance Overview Error:",
                err
            );

            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.status(200).json(result);
    });
};


// ================= LEAVE DISTRIBUTION =================

const getLeaveDistribution = (req, res) => {

    const sql = `
        SELECT
            leave_type,
            COUNT(*) AS total

        FROM leave_requests

        GROUP BY leave_type

        ORDER BY total DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.error(
                "Leave Distribution Error:",
                err
            );

            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.status(200).json(result);
    });
};


// ================= EMPLOYEE GROWTH =================

const getEmployeeGrowth = (req, res) => {

    const sql = `
        SELECT
            DATE_FORMAT(hire_date, '%Y-%m') AS month,
            COUNT(*) AS newEmployees

        FROM employees

        WHERE hire_date IS NOT NULL

        GROUP BY DATE_FORMAT(hire_date, '%Y-%m')

        ORDER BY month ASC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.error(
                "Employee Growth Error:",
                err
            );

            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.status(200).json(result);
    });
};


// ================= EXPORT =================

module.exports = {
    getAnalyticsSummary,
    getAttendanceOverview,
    getLeaveDistribution,
    getEmployeeGrowth
};