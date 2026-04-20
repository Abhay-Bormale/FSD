const Destination = require('../models/Destination');

// Get all destinations
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single destination
exports.getDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.json(destination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new destination
exports.createDestination = async (req, res) => {
  const { name, country, description, image } = req.body;

  if (!name || !country || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const destination = new Destination({
    name,
    country,
    description,
    image
  });

  try {
    const newDestination = await destination.save();
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update destination
exports.updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: 'Destination not found' });

    if (req.body.name) destination.name = req.body.name;
    if (req.body.country) destination.country = req.body.country;
    if (req.body.description) destination.description = req.body.description;
    if (req.body.image) destination.image = req.body.image;

    const updatedDestination = await destination.save();
    res.json(updatedDestination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete destination
exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
