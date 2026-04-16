const router = require("express").Router();
const Appointment = require("../models/Appointment");

// ✅ STEP 3: Book Appointment (ADD HERE)
router.post("/", async (req, res) => {
    const { userId, providerId, date, time } = req.body;

    const exists = await Appointment.findOne({
        providerId,
        date,
        time,
        status: "booked"
    });

    if (exists) {
        return res.status(400).json({
            message: "Slot already booked"
        });
    }

    const appointment = new Appointment({
        userId,
        providerId,
        date,
        time
    });

    await appointment.save();

    res.json({ message: "Appointment booked successfully" });
});


// ✅ Get appointments
router.get("/:userId", async (req, res) => {
    const data = await Appointment.find({
        userId: req.params.userId
    });

    res.json(data);
});


// ✅ Cancel appointment
router.delete("/:id", async (req, res) => {
    await Appointment.findByIdAndUpdate(req.params.id, {
        status: "cancelled"
    });

    res.json({ message: "Appointment cancelled" });
});

module.exports = router;