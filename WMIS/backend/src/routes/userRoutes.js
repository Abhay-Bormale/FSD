const express = require('express');
const { body } = require('express-validator');

const { requireAuth } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const { handleValidation } = require('../utils/validation');

const router = express.Router();

router.get('/me', requireAuth, userController.getMe);

router.post(
  '/me/change-password',
  requireAuth,
  [
    body('currentPassword').isString().notEmpty().withMessage('currentPassword is required'),
    body('newPassword').isString().isLength({ min: 6 }).withMessage('newPassword must be at least 6 characters'),
  ],
  handleValidation,
  userController.changePassword
);

router.delete('/me', requireAuth, userController.deleteMe);

module.exports = router;

