const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Le nom est obligatoire.'], trim: true, maxlength: 150 },
    description: { type: String, trim: true, maxlength: 2000, default: '' },
    dosage: { type: String, trim: true, maxlength: 100, default: '' },
    price: { type: Number, required: [true, 'Le prix est obligatoire.'], min: [0, 'Le prix doit être positif.'] },
    image: { type: String, trim: true, default: '' },
    posology: { type: String, trim: true, maxlength: 1000, default: '' },
    activeIngredients: { type: [String], default: [], validate: [(items) => items.every((item) => typeof item === 'string' && item.trim()), 'Les principes actifs doivent être des textes valides.'] },
    sideEffects: { type: [String], default: [], validate: [(items) => items.every((item) => typeof item === 'string' && item.trim()), 'Les effets secondaires doivent être des textes valides.'] },
    pharmaceuticalForm: { type: String, trim: true, maxlength: 100, default: '' },
    quantity: { type: Number, required: true, default: 0, min: [0, 'La quantité doit être positive ou nulle.'], validate: { validator: Number.isInteger, message: 'La quantité doit être un entier.' } },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Medicine', medicineSchema);
