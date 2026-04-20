const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/', bookingController.createBooking);
router.get('/', authMiddleware, bookingController.getAllBookings);
router.get('/:id', bookingController.getBooking);

// Admin routes (protected)
router.put('/:id', authMiddleware, bookingController.updateBooking);
router.delete('/:id', authMiddleware, bookingController.deleteBooking);

module.exports = router;
