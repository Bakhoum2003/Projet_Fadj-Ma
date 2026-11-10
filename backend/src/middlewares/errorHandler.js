const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Erreur interne du serveur.';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((error) => error.message).join(' ');
  }
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Identifiant invalide.';
  }
  if (err.code === 11000) {
    statusCode = 409;
    message = 'Cette adresse e-mail est déjà utilisée.';
  }

  if (process.env.NODE_ENV !== 'test') console.error(err.stack || err);
  res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;
