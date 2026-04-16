const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
    name: String,
    email: String,
    specialization: String,
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Provider", providerSchema);