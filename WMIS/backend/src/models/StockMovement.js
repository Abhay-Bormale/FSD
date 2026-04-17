const mongoose = require('mongoose');

const stockMovementSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['IN', 'OUT', 'ADJUSTMENT'], required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
    quantity: { type: Number, required: true, min: 0 },
    unitPrice: { type: Number, default: undefined },
    amount: { type: Number, default: undefined },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: undefined },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StockMovement', stockMovementSchema);

