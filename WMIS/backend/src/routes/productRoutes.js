const express = require('express');
const { body, param, query } = require('express-validator');

const productController = require('../controllers/productController');
const { handleValidation } = require('../utils/validation');

const router = express.Router();

router.get(
  '/',
  [
    query('limit').optional().isInt({ min: 1 }).withMessage('limit must be a positive integer'),
    query('skip').optional().isInt({ min: 0 }).withMessage('skip must be a non-negative integer'),
  ],
  handleValidation,
  productController.getProducts
);

router.get(
  '/:id',
  [param('id').isMongoId().withMessage('id must be a valid Mongo id')],
  handleValidation,
  productController.getProductById
);

router.post(
  '/',
  [
    body('name').isString().notEmpty().withMessage('name is required'),
    body('sku').optional().isString().trim().notEmpty().withMessage('sku must be a non-empty string'),
    body('price').optional().isFloat({ min: 0 }).withMessage('price must be >= 0'),
    body('description').optional().isString(),
  ],
  handleValidation,
  productController.createProduct
);

router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('id must be a valid Mongo id'),
    body('name').optional().isString().notEmpty(),
    body('sku').optional().isString().trim().notEmpty(),
    body('price').optional().isFloat({ min: 0 }),
    body('description').optional().isString(),
  ],
  handleValidation,
  productController.updateProduct
);

router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('id must be a valid Mongo id')],
  handleValidation,
  productController.deleteProduct
);

module.exports = router;

