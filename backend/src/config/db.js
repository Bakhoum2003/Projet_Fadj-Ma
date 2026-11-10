const mongoose = require('mongoose');

// Cache partagé entre les invocations réutilisant le même processus.
const cached = global.mongoose || {
  connection: null,
  promise: null,
};

global.mongoose = cached;

// Réinitialise le cache si MongoDB se déconnecte.
mongoose.connection.on('disconnected', () => {
  cached.connection = null;
  cached.promise = null;
});

/**
 * Établit une connexion à MongoDB ou réutilise la connexion existante.
 */
const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('La variable MONGODB_URI est requise.');
  }

  // Une connexion est déjà établie.
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Une connexion est déjà en cours ou doit être créée.
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoUri)
      .then(() => {
        cached.connection = mongoose.connection;

        console.log(
          `MongoDB connecté : ${mongoose.connection.host}`
        );

        return mongoose.connection;
      })
      .catch((error) => {
        // Autorise une nouvelle tentative après un échec.
        cached.promise = null;
        cached.connection = null;

        throw error;
      });
  }

  return cached.promise;
};

module.exports = connectDB;