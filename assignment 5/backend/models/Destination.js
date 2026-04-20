const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/400x300?text=Destination'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Destination', destinationSchema);
