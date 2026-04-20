const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', destinationController.getAllDestinations);
router.get('/:id', destinationController.getDestination);

// Admin routes (protected)
router.post('/', authMiddleware, destinationController.createDestination);
router.put('/:id', authMiddleware, destinationController.updateDestination);
router.delete('/:id', authMiddleware, destinationController.deleteDestination);

module.exports = router;
