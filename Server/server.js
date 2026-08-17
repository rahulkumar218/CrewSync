require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

// ================= CORS =================

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// ================= MIDDLEWARE =================

app.use(express.json());

// ================= IMPORT ROUTES =================

const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const payrollRoutes = require("./routes/payrollRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

// ================= HOME ROUTE =================

app.get("/", (req, res) => {
    res.send("CrewSync Backend Running 🚀");
});

// ================= API ROUTES =================

app.use("/employees", employeeRoutes);

app.use("/auth", authRoutes);

app.use("/attendance", attendanceRoutes);

app.use("/leaves", leaveRoutes);

app.use("/payroll", payrollRoutes);

app.use("/analytics", analyticsRoutes);

// ================= SERVER =================

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});