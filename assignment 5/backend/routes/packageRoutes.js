const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', packageController.getAllPackages);
router.get('/:id', packageController.getPackage);

// Admin routes (protected)
router.post('/', authMiddleware, packageController.createPackage);
router.put('/:id', authMiddleware, packageController.updatePackage);
router.delete('/:id', authMiddleware, packageController.deletePackage);

module.exports = router;
