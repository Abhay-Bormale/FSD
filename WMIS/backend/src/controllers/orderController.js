const Order = require('../models/Order');
const Product = require('../models/Product');
const Warehouse = require('../models/Warehouse');
const StockMovement = require('../models/StockMovement');

async function getOrders(req, res) {
  const query = {};

  // Admin and staff can see all orders, others only their own
  if (!['ADMIN', 'STAFF'].includes(req.user.role)) {
    query.userId = req.user.userId;
  }

  const orders = await Order.find(query)
    .populate('warehouseId')
    .populate('items.productId')
    .sort({ createdAt: -1 });

  return res.json(orders);
}

async function createOrder(req, res) {
  const { warehouseId, items } = req.body;

  const warehouse = await Warehouse.findById(warehouseId);
  if (!warehouse) {
    return res.status(404).json({ message: 'Warehouse not found' });
  }

  const uniqueProductIds = [...new Set(items.map((i) => i.productId.toString()))];
  const products = await Product.find({ _id: { $in: uniqueProductIds } });
  if (products.length !== uniqueProductIds.length) {
    return res.status(400).json({ message: 'One or more products not found' });
  }

  const productMap = new Map(products.map((p) => [p._id.toString(), p]));

  // Enrich items with unitPrice from the product if not provided.
  const orderItems = items.map((i) => {
    const product = productMap.get(i.productId.toString());
    const unitPrice = i.unitPrice !== undefined && i.unitPrice !== null ? i.unitPrice : product.price;
    return {
      productId: i.productId,
      quantity: i.quantity,
      unitPrice,
    };
  });

  const totalAmount = orderItems.reduce((sum, it) => sum + it.quantity * it.unitPrice, 0);
  const created = await Order.create({
    userId: req.user.userId,
    warehouseId,
    items: orderItems,
    totalAmount,
    status: 'PENDING',
  });

  const movements = orderItems.map((it) => ({
    type: 'OUT',
    productId: it.productId,
    warehouseId,
    quantity: it.quantity,
    unitPrice: it.unitPrice,
    amount: it.quantity * it.unitPrice,
    orderId: created._id,
  }));

  await StockMovement.insertMany(movements);

  const populated = await Order.findById(created._id)
    .populate('warehouseId')
    .populate('items.productId');

  return res.status(201).json(populated);
}

async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  // Only ADMIN and STAFF can update any order; others can only update their own
  const baseQuery = ['ADMIN', 'STAFF'].includes(req.user.role)
    ? { _id: id }
    : { _id: id, userId: req.user.userId };

  const updated = await Order.findOneAndUpdate(
    baseQuery,
    { $set: { status } },
    { returnDocument: 'after' }
  )
    .populate('warehouseId')
    .populate('items.productId');

  if (!updated) {
    return res.status(404).json({ message: 'Order not found' });
  }

  return res.json(updated);
}

module.exports = { getOrders, createOrder, updateOrderStatus };

