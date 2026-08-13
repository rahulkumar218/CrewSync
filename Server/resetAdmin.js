const db = require("./config/db");
const bcrypt = require("bcrypt");

const email = "rahul@gmail.com";
const newPassword = "Admin@123";

bcrypt.hash(newPassword, 10, (err, hash) => {
    if (err) {
        console.error("Password hashing error:", err);
        process.exit(1);
    }

    const sql = `
        UPDATE users
        SET password = ?, role = 'Admin'
        WHERE email = ?
    `;

    db.query(sql, [hash, email], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            process.exit(1);
        }

        if (result.affectedRows === 0) {
            console.log("Admin user not found.");
        } else {
            console.log("Admin password updated successfully!");
            console.log("Email:", email);
            console.log("Password:", newPassword);
            console.log("Role: Admin");
        }

        process.exit(0);
    });
});