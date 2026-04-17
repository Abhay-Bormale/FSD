const { validationResult } = require('express-validator');

function handleValidation(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      message: 'Validation error',
      errors: result.array(),
    });
  }
  next();
}

module.exports = { handleValidation };

