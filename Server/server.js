require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

// ================= MIDDLEWARE =================

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

app.use(express.json());


// ================= HOME ROUTE =================

app.get("/", (req, res) => {
    res.json({
        message: "CrewSync Backend Running 🚀"
    });
});


// ================= ROUTES =================

const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/employees", employeeRoutes);
app.use("/auth", authRoutes);


// ================= SERVER =================

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});