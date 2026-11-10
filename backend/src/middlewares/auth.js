const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('./asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null;

  if (!token) {
    const error = new Error('Authentification requise.');
    error.statusCode = 401;
    throw error;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch {
    const error = new Error('Jeton invalide ou expiré.');
    error.statusCode = 401;
    throw error;
  }
});

module.exports = protect;
