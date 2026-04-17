const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/authController');
const { handleValidation } = require('../utils/validation');

const router = express.Router();

router.post(
  '/register',
  [
    body('username').isString().isLength({ min: 2 }).withMessage('username is required'),
    body('email').isEmail().withMessage('email must be valid'),
    body('password').isString().isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
  ],
  handleValidation,
  authController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('email must be valid'),
    body('password').isString().notEmpty().withMessage('password is required'),
  ],
  handleValidation,
  authController.login
);

module.exports = router;

