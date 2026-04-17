const Warehouse = require('../models/Warehouse');

async function getWarehouses(req, res) {
  const warehouses = await Warehouse.find({}).sort({ createdAt: -1 });
  return res.json(warehouses);
}

async function getWarehouseById(req, res) {
  const { id } = req.params;
  const warehouse = await Warehouse.findById(id);

  if (!warehouse) {
    return res.status(404).json({ message: 'Warehouse not found' });
  }

  return res.json(warehouse);
}

async function createWarehouse(req, res) {
  const warehouse = await Warehouse.create(req.body);
  return res.status(201).json(warehouse);
}

async function updateWarehouse(req, res) {
  const { id } = req.params;
  const update = {};

  for (const key of ['name', 'location']) {
    if (req.body[key] !== undefined) update[key] = req.body[key];
  }

  const updated = await Warehouse.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return res.status(404).json({ message: 'Warehouse not found' });
  }

  return res.json(updated);
}

async function deleteWarehouse(req, res) {
  const { id } = req.params;
  const deleted = await Warehouse.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ message: 'Warehouse not found' });
  }

  return res.status(204).send();
}

module.exports = { getWarehouses, getWarehouseById, createWarehouse, updateWarehouse, deleteWarehouse };

