const Medicine = require('../models/Medicine');
const asyncHandler = require('../middlewares/asyncHandler');

const notFound = () => {
  const error = new Error('Médicament introuvable.');
  error.statusCode = 404;
  return error;
};

exports.getMedicines = asyncHandler(async (req, res) => {
  const medicines = await Medicine.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: medicines.length, data: medicines });
});

exports.getMedicine = asyncHandler(async (req, res) => {
  const medicine = await Medicine.findById(req.params.id);
  if (!medicine) throw notFound();
  res.status(200).json({ success: true, data: medicine });
});

exports.createMedicine = asyncHandler(async (req, res) => {
  const medicine = await Medicine.create(req.body);
  res.status(201).json({ success: true, message: 'Médicament créé avec succès.', data: medicine });
});

exports.updateMedicine = asyncHandler(async (req, res) => {
  const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!medicine) throw notFound();
  res.status(200).json({ success: true, message: 'Médicament mis à jour avec succès.', data: medicine });
});

exports.deleteMedicine = asyncHandler(async (req, res) => {
  const medicine = await Medicine.findByIdAndDelete(req.params.id);
  if (!medicine) throw notFound();
  res.status(200).json({ success: true, message: 'Médicament supprimé avec succès.' });
});
