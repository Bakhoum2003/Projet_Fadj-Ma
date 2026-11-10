require('dotenv').config();

const app = require('./app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(
      `Serveur démarré : http://localhost:${PORT} (${process.env.NODE_ENV || 'development'})`
    );
  });
};

startServer().catch((error) => {
  console.error('Impossible de démarrer le serveur :', error.message);
  process.exit(1);
});