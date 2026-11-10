// Transmet automatiquement les erreurs des contrôleurs async au middleware global.
module.exports = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
