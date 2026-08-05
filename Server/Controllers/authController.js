const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================

const register = async (req, res) => {

    const { full_name, email, password, role } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users
            (full_name, email, password, role)
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                full_name,
                email,
                hashedPassword,
                role || "Employee"
            ],
            (err, result) => {

                if (err) {

                    console.error(err);

                    return res.status(500).json({
                        message: "Database Error"
                    });

                }

                res.status(201).json({
                    message: "User Registered Successfully",
                    userId: result.insertId
                });

            }
        );

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// ================= LOGIN =================

const login = (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                message: "Database Error"
            });

        }

        if (result.length === 0) {

            return res.status(404).json({
                message: "User Not Found"
            });

        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(
            {
                id: user.user_id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({

            message: "Login Successful",

            token,

            user: {
                id: user.user_id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }

        });

    });

};

// ================= EXPORT =================

module.exports = {
    register,
    login
};