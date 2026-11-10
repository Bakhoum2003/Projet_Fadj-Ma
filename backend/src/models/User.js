const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, 'Le prénom est obligatoire.'], trim: true, maxlength: 50 },
    lastName: { type: String, required: [true, 'Le nom est obligatoire.'], trim: true, maxlength: 50 },
    gender: { type: String, required: [true, 'Le genre est obligatoire.'], enum: ['male', 'female', 'other', 'prefer_not_to_say'] },
    birthDate: {
      type: Date,
      required: [true, 'La date de naissance est obligatoire.'],
      validate: {
        validator: (value) => value <= new Date(),
        message: 'La date de naissance ne peut pas être dans le futur.',
      },
    },
    email: {
      type: String,
      required: [true, "L'e-mail est obligatoire."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "L'e-mail est invalide."],
    },
    password: { type: String, required: [true, 'Le mot de passe est obligatoire.'], minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères.'], select: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function hidePassword() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);
