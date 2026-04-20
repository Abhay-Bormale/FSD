const Booking = require('../models/Booking');

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('packageId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single booking
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('packageId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new booking
exports.createBooking = async (req, res) => {
  const { name, email, packageId, date, persons } = req.body;

  if (!name || !email || !packageId || !date || !persons) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const booking = new Booking({
    name,
    email,
    packageId,
    date,
    persons
  });

  try {
    const newBooking = await booking.save();
    await newBooking.populate('packageId');
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update booking status
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (req.body.status) booking.status = req.body.status;
    if (req.body.date) booking.date = req.body.date;
    if (req.body.persons) booking.persons = req.body.persons;

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
