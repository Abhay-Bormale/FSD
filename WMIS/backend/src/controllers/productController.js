const Product = require('../models/Product');

async function getProducts(req, res) {
  const limit = req.query.limit ? Number(req.query.limit) : 50;
  const skip = req.query.skip ? Number(req.query.skip) : 0;

  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .skip(Number.isFinite(skip) ? skip : 0)
    .limit(Number.isFinite(limit) ? limit : 50);

  return res.json(products);
}

async function getProductById(req, res) {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.json(product);
}

async function createProduct(req, res) {
  const product = await Product.create(req.body);
  return res.status(201).json(product);
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const update = {};
  for (const key of ['name', 'sku', 'price', 'description']) {
    if (req.body[key] !== undefined) update[key] = req.body[key];
  }

  const updated = await Product.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.json(updated);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(204).send();
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

