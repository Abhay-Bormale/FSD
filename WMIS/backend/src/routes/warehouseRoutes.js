const express = require('express');
const { body, param } = require('express-validator');

const warehouseController = require('../controllers/warehouseController');
const { handleValidation } = require('../utils/validation');

const router = express.Router();

router.get('/', warehouseController.getWarehouses);

router.get(
  '/:id',
  [param('id').isMongoId().withMessage('id must be a valid Mongo id')],
  handleValidation,
  warehouseController.getWarehouseById
);

router.post(
  '/',
  [
    body('name').isString().notEmpty().withMessage('name is required'),
    body('location').optional().isString(),
  ],
  handleValidation,
  warehouseController.createWarehouse
);

router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('id must be a valid Mongo id'),
    body('name').optional().isString().notEmpty(),
    body('location').optional().isString(),
  ],
  handleValidation,
  warehouseController.updateWarehouse
);

router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('id must be a valid Mongo id')],
  handleValidation,
  warehouseController.deleteWarehouse
);

module.exports = router;

