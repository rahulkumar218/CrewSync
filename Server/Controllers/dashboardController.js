const db = require("../config/db");

// ================= DASHBOARD DATA =================

const getDashboardData = (req, res) => {
    const employeeSql = `
        SELECT COUNT(*) AS totalEmployees
        FROM employees
    `;

    const attendanceSql = `
        SELECT
            SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) AS present,
            SUM(CASE WHEN status = 'Late' THEN 1 ELSE 0 END) AS late,
            SUM(CASE WHEN status = 'Absent' THEN 1 ELSE 0 END) AS absent,
            COUNT(*) AS total
        FROM attendance
    `;

    const leaveSql = `
        SELECT
            COUNT(*) AS totalLeaves,
            SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pendingLeaves,
            SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) AS approvedLeaves,
            SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) AS rejectedLeaves
        FROM leave_requests
    `;

    const payrollSql = `
        SELECT
            COUNT(*) AS totalPayroll,
            COALESCE(SUM(\`net-salary\`), 0) AS totalPayrollAmount
        FROM payroll
    `;

    db.query(employeeSql, (err, employeeResult) => {
        if (err) {
            console.error("Dashboard Employee Error:", err);
            return res.status(500).json({
                message: "Database Error"
            });
        }

        db.query(attendanceSql, (err, attendanceResult) => {
            if (err) {
                console.error("Dashboard Attendance Error:", err);
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            db.query(leaveSql, (err, leaveResult) => {
                if (err) {
                    console.error("Dashboard Leave Error:", err);
                    return res.status(500).json({
                        message: "Database Error"
                    });
                }

                db.query(payrollSql, (err, payrollResult) => {
                    if (err) {
                        console.error("Dashboard Payroll Error:", err);
                        return res.status(500).json({
                            message: "Database Error"
                        });
                    }

                    res.status(200).json({
                        employees: {
                            total: employeeResult[0].totalEmployees
                        },

                        attendance: {
                            present: attendanceResult[0].present || 0,
                            late: attendanceResult[0].late || 0,
                            absent: attendanceResult[0].absent || 0,
                            total: attendanceResult[0].total || 0
                        },

                        leaves: {
                            total: leaveResult[0].totalLeaves || 0,
                            pending: leaveResult[0].pendingLeaves || 0,
                            approved: leaveResult[0].approvedLeaves || 0,
                            rejected: leaveResult[0].rejectedLeaves || 0
                        },

                        payroll: {
                            total: payrollResult[0].totalPayroll || 0,
                            totalAmount:
                                Number(
                                    payrollResult[0].totalPayrollAmount
                                ) || 0
                        }
                    });
                });
            });
        });
    });
};

module.exports = {
    getDashboardData
};