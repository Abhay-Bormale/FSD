const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    userId: String,
    providerId: String,
    date: String,
    time: String,
    status: {
        type: String,
        default: "booked"
    }
});

module.exports = mongoose.model("Appointment", appointmentSchema);