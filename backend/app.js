const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const medicineRoutes = require('./src/routes/medicineRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

// Middlewares applicatifs partagés, y compris par les tests Supertest.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(morgan('dev'));

app.get(['/api/health', '/api/v1/health'], (req, res) => {
  res.status(200).json({
    status: mongoose.connection.readyState === 1 ? 'ok' : 'degraded',
    message: 'Fadj-Ma API is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/medicines', medicineRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Réponse uniforme pour toute route non définie.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Gestionnaire global : les futures routes y transmettront leurs erreurs.
app.use(errorHandler);

module.exports = app;
