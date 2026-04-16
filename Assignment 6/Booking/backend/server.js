const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/providers", require("./routes/providerRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
    app.listen(5001, () => console.log("Server running on port 5001"));
})
.catch(err => console.log(err));