const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');

const publicUser = (user) => ({
  id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  gender: user.gender,
  birthDate: user.birthDate,
  email: user.email,
  createdAt: user.createdAt,
});

const createToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
});

exports.register = asyncHandler(async (req, res) => {
  const { firstName, lastName, gender, birthDate, email, password } = req.body;
  if (!firstName || !lastName || !gender || !birthDate || !email || !password) {
    return res.status(400).json({ success: false, message: 'Tous les champs requis doivent être renseignés.' });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'Cette adresse e-mail est déjà utilisée.' });
  }

  const user = await User.create({ firstName, lastName, gender, birthDate, email: normalizedEmail, password });
  res.status(201).json({ success: true, message: 'Utilisateur créé avec succès.', user: publicUser(user) });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "L'e-mail et le mot de passe sont requis." });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ success: false, message: "E-mail ou mot de passe incorrect." });
  }

  res.status(200).json({ success: true, token: createToken(user._id), user: publicUser(user) });
});
