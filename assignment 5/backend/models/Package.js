const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    duration: {
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
      default: 'https://via.placeholder.com/400x300?text=Travel+Package'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Package', packageSchema);
