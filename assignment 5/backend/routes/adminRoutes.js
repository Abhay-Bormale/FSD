const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route
router.post('/login', adminController.adminLogin);

// Protected route
router.get('/profile', authMiddleware, adminController.getAdminProfile);

module.exports = router;
