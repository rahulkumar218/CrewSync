const db = require("../config/db");

// ================= GET ALL LEAVES =================

const getLeaves = (req, res) => {
  const sql = `
    SELECT
      lr.leave_id,
      lr.employee_id,
      e.first_name,
      e.last_name,
      lr.leave_type,
      lr.start_date,
      lr.end_date,
      lr.reason,
      lr.status
    FROM leave_requests lr
    JOIN employees e
      ON lr.employee_id = e.employee_id
    ORDER BY lr.leave_id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Get Leaves Error:", err);

      return res.status(500).json({
        message: "Failed to fetch leave requests",
      });
    }

    res.status(200).json(results);
  });
};

// ================= GET LEAVE BY ID =================

const getLeaveById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT
      lr.leave_id,
      lr.employee_id,
      e.first_name,
      e.last_name,
      lr.leave_type,
      lr.start_date,
      lr.end_date,
      lr.reason,
      lr.status
    FROM leave_requests lr
    JOIN employees e
      ON lr.employee_id = e.employee_id
    WHERE lr.leave_id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Get Leave Error:", err);

      return res.status(500).json({
        message: "Failed to fetch leave request",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Leave request not found",
      });
    }

    res.status(200).json(results[0]);
  });
};

// ================= ADD LEAVE =================

const addLeave = (req, res) => {
  const {
    employee_id,
    leave_type,
    start_date,
    end_date,
    reason,
  } = req.body;

  if (
    !employee_id ||
    !leave_type ||
    !start_date ||
    !end_date
  ) {
    return res.status(400).json({
      message:
        "employee_id, leave_type, start_date and end_date are required",
    });
  }

  if (new Date(start_date) > new Date(end_date)) {
    return res.status(400).json({
      message: "Start date cannot be after end date",
    });
  }

  const checkEmployeeSql = `
    SELECT employee_id
    FROM employees
    WHERE employee_id = ?
  `;

  db.query(
    checkEmployeeSql,
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

      const sql = `
        INSERT INTO leave_requests
        (
          employee_id,
          leave_type,
          start_date,
          end_date,
          reason,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [
          employee_id,
          leave_type,
          start_date,
          end_date,
          reason || null,
          "Pending",
        ],
        (err, result) => {
          if (err) {
            console.error("Add Leave Error:", err);

            return res.status(500).json({
              message: "Failed to add leave request",
            });
          }

          res.status(201).json({
            message: "Leave Request Added Successfully",
            leaveId: result.insertId,
          });
        }
      );
    }
  );
};

// ================= UPDATE LEAVE =================

const updateLeave = (req, res) => {
  const { id } = req.params;

  const {
    leave_type,
    start_date,
    end_date,
    reason,
    status,
  } = req.body;

  if (
    !leave_type ||
    !start_date ||
    !end_date ||
    !status
  ) {
    return res.status(400).json({
      message:
        "leave_type, start_date, end_date and status are required",
    });
  }

  if (new Date(start_date) > new Date(end_date)) {
    return res.status(400).json({
      message: "Start date cannot be after end date",
    });
  }

  const sql = `
    UPDATE leave_requests
    SET
      leave_type = ?,
      start_date = ?,
      end_date = ?,
      reason = ?,
      status = ?
    WHERE leave_id = ?
  `;

  db.query(
    sql,
    [
      leave_type,
      start_date,
      end_date,
      reason || null,
      status,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Update Leave Error:", err);

        return res.status(500).json({
          message: "Failed to update leave request",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Leave request not found",
        });
      }

      res.status(200).json({
        message: "Leave Request Updated Successfully",
      });
    }
  );
};

// ================= DELETE LEAVE =================

const deleteLeave = (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM leave_requests
    WHERE leave_id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete Leave Error:", err);

      return res.status(500).json({
        message: "Failed to delete leave request",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Leave request not found",
      });
    }

    res.status(200).json({
      message: "Leave Request Deleted Successfully",
    });
  });
};

module.exports = {
  getLeaves,
  getLeaveById,
  addLeave,
  updateLeave,
  deleteLeave,
};