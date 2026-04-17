const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['CLIENT', 'SUPPLIER', 'STAFF', 'ADMIN'],
      default: 'CLIENT',
    },
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform(doc, ret) {
    // Remove sensitive fields when serializing.
    delete ret.passwordHash;
    return ret;
  },
});

module.exports = mongoose.model('User', userSchema);

