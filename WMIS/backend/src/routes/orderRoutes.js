const express = require('express');
const { body, param } = require('express-validator');

const { requireAuth } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');
const { handleValidation } = require('../utils/validation');

const router = express.Router();

router.get('/', requireAuth, orderController.getOrders);

router.post(
  '/',
  requireAuth,
  [
    body('warehouseId').isMongoId().withMessage('warehouseId is required'),
    body('items').isArray({ min: 1 }).withMessage('items must be a non-empty array'),
    body('items.*.productId').isMongoId().withMessage('items.productId is required'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('items.quantity must be >= 1'),
    body('items.*.unitPrice')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('items.unitPrice must be >= 0'),
  ],
  handleValidation,
  orderController.createOrder
);

router.patch(
  '/:id/status',
  requireAuth,
  [
    param('id').isMongoId().withMessage('id must be a valid Mongo id'),
    body('status').isString().notEmpty().withMessage('status is required'),
  ],
  handleValidation,
  orderController.updateOrderStatus
);

module.exports = router;

