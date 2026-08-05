require("dotenv").config();

const express = require("express");
const db = require("./config/db");

const app = express();

// Import Routes
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("CrewSync Backend Running 🚀");
});

// Employee Routes
app.use("/employees", employeeRoutes);

// Auth Routes
app.use("/auth", authRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});