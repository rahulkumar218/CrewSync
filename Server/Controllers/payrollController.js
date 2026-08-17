const db = require("../config/db");

// ================= GET ALL PAYROLL =================

const getPayroll = (req, res) => {
    const sql = `
        SELECT
            p.payroll_id,
            p.employee_id,
            e.first_name,
            e.last_name,
            p.salary_month,
            p.basic_salary,
            p.bonus,
            p.deductions,
            p.\`net-salary\`,
            p.payment_date
        FROM payroll p
        JOIN employees e
            ON p.employee_id = e.employee_id
        ORDER BY p.payroll_id DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Get Payroll Error:", err);

            return res.status(500).json({
                message: "Failed to fetch payroll records",
            });
        }

        res.status(200).json(results);
    });
};

// ================= GET PAYROLL BY ID =================

const getPayrollById = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT
            p.payroll_id,
            p.employee_id,
            e.first_name,
            e.last_name,
            p.salary_month,
            p.basic_salary,
            p.bonus,
            p.deductions,
            p.\`net-salary\`,
            p.payment_date
        FROM payroll p
        JOIN employees e
            ON p.employee_id = e.employee_id
        WHERE p.payroll_id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Get Payroll Error:", err);

            return res.status(500).json({
                message: "Failed to fetch payroll record",
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Payroll record not found",
            });
        }

        res.status(200).json(results[0]);
    });
};

// ================= ADD PAYROLL =================

const addPayroll = (req, res) => {
    const {
        employee_id,
        salary_month,
        basic_salary,
        bonus,
        deductions,
        payment_date,
    } = req.body;

    if (
        !employee_id ||
        !salary_month ||
        basic_salary === undefined ||
        !payment_date
    ) {
        return res.status(400).json({
            message:
                "employee_id, salary_month, basic_salary and payment_date are required",
        });
    }

    const bonusAmount = Number(bonus) || 0;
    const deductionAmount = Number(deductions) || 0;
    const basicSalary = Number(basic_salary);

    if (basicSalary < 0 || bonusAmount < 0 || deductionAmount < 0) {
        return res.status(400).json({
            message: "Salary values cannot be negative",
        });
    }

    const netSalary =
        basicSalary + bonusAmount - deductionAmount;

    if (netSalary < 0) {
        return res.status(400).json({
            message: "Net salary cannot be negative",
        });
    }

    // Check employee
    const employeeSql = `
        SELECT employee_id
        FROM employees
        WHERE employee_id = ?
    `;

    db.query(
        employeeSql,
        [employee_id],
        (err, employeeResults) => {
            if (err) {
                console.error("Employee Check Error:", err);

                return res.status(500).json({
                    message: "Database error",
                });
            }

            if (employeeResults.length === 0) {
                return res.status(404).json({
                    message: "Employee not found",
                });
            }

            // Check duplicate payroll
            const duplicateSql = `
                SELECT payroll_id
                FROM payroll
                WHERE employee_id = ?
                AND salary_month = ?
            `;

            db.query(
                duplicateSql,
                [employee_id, salary_month],
                (err, duplicateResults) => {
                    if (err) {
                        console.error(
                            "Duplicate Payroll Check Error:",
                            err
                        );

                        return res.status(500).json({
                            message: "Database error",
                        });
                    }

                    if (duplicateResults.length > 0) {
                        return res.status(409).json({
                            message:
                                "Payroll already exists for this employee and month",
                        });
                    }

                    const insertSql = `
                        INSERT INTO payroll
                        (
                            employee_id,
                            salary_month,
                            basic_salary,
                            bonus,
                            deductions,
                            \`net-salary\`,
                            payment_date
                        )
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    `;

                    db.query(
                        insertSql,
                        [
                            employee_id,
                            salary_month,
                            basicSalary,
                            bonusAmount,
                            deductionAmount,
                            netSalary,
                            payment_date,
                        ],
                        (err, result) => {
                            if (err) {
                                console.error(
                                    "Add Payroll Error:",
                                    err
                                );

                                return res.status(500).json({
                                    message:
                                        "Failed to add payroll record",
                                });
                            }

                            res.status(201).json({
                                message:
                                    "Payroll Added Successfully",
                                payrollId: result.insertId,
                                netSalary: netSalary,
                            });
                        }
                    );
                }
            );
        }
    );
};

// ================= UPDATE PAYROLL =================

const updatePayroll = (req, res) => {
    const { id } = req.params;

    const {
        salary_month,
        basic_salary,
        bonus,
        deductions,
        payment_date,
    } = req.body;

    if (
        !salary_month ||
        basic_salary === undefined ||
        !payment_date
    ) {
        return res.status(400).json({
            message:
                "salary_month, basic_salary and payment_date are required",
        });
    }

    const basicSalary = Number(basic_salary);
    const bonusAmount = Number(bonus) || 0;
    const deductionAmount = Number(deductions) || 0;

    if (
        basicSalary < 0 ||
        bonusAmount < 0 ||
        deductionAmount < 0
    ) {
        return res.status(400).json({
            message: "Salary values cannot be negative",
        });
    }

    const netSalary =
        basicSalary + bonusAmount - deductionAmount;

    if (netSalary < 0) {
        return res.status(400).json({
            message: "Net salary cannot be negative",
        });
    }

    const sql = `
        UPDATE payroll
        SET
            salary_month = ?,
            basic_salary = ?,
            bonus = ?,
            deductions = ?,
            \`net-salary\` = ?,
            payment_date = ?
        WHERE payroll_id = ?
    `;

    db.query(
        sql,
        [
            salary_month,
            basicSalary,
            bonusAmount,
            deductionAmount,
            netSalary,
            payment_date,
            id,
        ],
        (err, result) => {
            if (err) {
                console.error("Update Payroll Error:", err);

                return res.status(500).json({
                    message: "Failed to update payroll record",
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Payroll record not found",
                });
            }

            res.status(200).json({
                message: "Payroll Updated Successfully",
                netSalary: netSalary,
            });
        }
    );
};

// ================= DELETE PAYROLL =================

const deletePayroll = (req, res) => {
    const { id } = req.params;

    const sql = `
        DELETE FROM payroll
        WHERE payroll_id = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Delete Payroll Error:", err);

            return res.status(500).json({
                message: "Failed to delete payroll record",
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Payroll record not found",
            });
        }

        res.status(200).json({
            message: "Payroll Deleted Successfully",
        });
    });
};

module.exports = {
    getPayroll,
    getPayrollById,
    addPayroll,
    updatePayroll,
    deletePayroll,
};