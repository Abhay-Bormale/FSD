const bcrypt = require('bcryptjs');

const User = require('../models/User');

async function getMe(req, res) {
  const user = await User.findById(req.user.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json(user.toJSON());
}

async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.userId).select('+passwordHash');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const ok = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!ok) {
    return res.status(400).json({ message: 'Current password is incorrect' });
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();

  return res.json({ ok: true });
}

async function deleteMe(req, res) {
  await User.deleteOne({ _id: req.user.userId });
  return res.status(204).send();
}

module.exports = { getMe, changePassword, deleteMe };

