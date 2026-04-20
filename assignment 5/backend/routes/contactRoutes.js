const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route
router.post('/', contactController.createContact);

// Admin routes (protected)
router.get('/', authMiddleware, contactController.getAllContacts);
router.get('/:id', authMiddleware, contactController.getContact);
router.put('/:id', authMiddleware, contactController.updateContact);
router.delete('/:id', authMiddleware, contactController.deleteContact);

module.exports = router;
