const mongoose = require('mongoose');

/**
 * Établit la connexion à MongoDB à partir de la variable MONGO_URI.
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('La variable MONGODB_URI est requise.');
    }

    const connection = await mongoose.connect(mongoUri);
    console.log(`MongoDB connecté : ${connection.connection.host}`);
  } catch (error) {
    console.error(`Erreur de connexion MongoDB : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
