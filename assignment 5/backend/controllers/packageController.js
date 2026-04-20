const Package = require('../models/Package');

// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single package
exports.getPackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new package
exports.createPackage = async (req, res) => {
  const { title, location, price, duration, description, image } = req.body;

  if (!title || !location || !price || !duration || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const pkg = new Package({
    title,
    location,
    price,
    duration,
    description,
    image
  });

  try {
    const newPackage = await pkg.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update package
exports.updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });

    if (req.body.title) pkg.title = req.body.title;
    if (req.body.location) pkg.location = req.body.location;
    if (req.body.price) pkg.price = req.body.price;
    if (req.body.duration) pkg.duration = req.body.duration;
    if (req.body.description) pkg.description = req.body.description;
    if (req.body.image) pkg.image = req.body.image;

    const updatedPackage = await pkg.save();
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete package
exports.deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
