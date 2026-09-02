const db = require("../config/db");

// ================= GET ALL EMPLOYEES =================
const getEmployees = (req, res) => {

    const sql = "SELECT * FROM employees";

    db.query(sql, (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.json(result);
    });
};


// ================= ADD EMPLOYEE =================
const addEmployee = (req, res) => {

    const {
        first_name,
        last_name,
        email,
        phone,
        department,
        designation,
        salary,
        hire_date,
        attendance,
        status
    } = req.body;

    const sql = `
    INSERT INTO employees
    (
        first_name,
        last_name,
        email,
        phone,
        department,
        designation,
        salary,
        hire_date,
        attendance,
        status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
    db.query(
        sql,
        [
            first_name,
            last_name,
            email,
            phone,
            department,
            designation,
            salary,
            hire_date,
            attendance,
            status
        ],
        (err, result) => {

            if (err) {
                console.error("ADD EMPLOYEE ERROR:", err);

                return res.status(500).json({
                    message: "Database Error",
                    error: err.sqlMessage
                });
            }

            res.status(201).json({
                message: "Employee Added Successfully",
                employeeId: result.insertId
            });
        }
    );
};


// ================= UPDATE EMPLOYEE =================
const updateEmployee = (req, res) => {

    const { id } = req.params;

    const {
        first_name,
        last_name,
        email,
        phone,
        department,
        designation,
        salary,
        hire_date,
        attendance,
        status
    } = req.body;

    const sql = `
        UPDATE employees
        SET
            first_name = ?,
            last_name = ?,
            email = ?,
            phone = ?,
            department = ?,
            designation = ?,
            salary = ?,
            hire_date = ?,
            attendance = ?,
            status = ?
        WHERE employee_id = ?
    `;

    db.query(
        sql,
        [
            first_name,
            last_name,
            email,
            phone,
            department,
            designation,
            salary,
            hire_date,
            attendance,
            status,
            id
        ],
        (err, result) => {

            if (err) {
                console.error("UPDATE EMPLOYEE ERROR:", err);

                return res.status(500).json({
                    message: "Database Error",
                    error: err.sqlMessage
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Employee Not Found"
                });
            }

            res.json({
                message: "Employee Updated Successfully"
            });
        }
    );
};


// ================= DELETE EMPLOYEE =================
const deleteEmployee = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM employees WHERE employee_id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.error("DELETE EMPLOYEE ERROR:", err);

            return res.status(500).json({
                message: "Database Error",
                error: err.sqlMessage
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Employee Not Found"
            });
        }

        res.json({
            message: "Employee Deleted Successfully"
        });
    });
};


// ================= EXPORT =================
module.exports = {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
};