// backend/server.js
require('dotenv').config();   // Charge .env
console.log('🔍 Environnement :', {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI
});

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connexion à MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
  res.send('API MEAN Factures est en ligne 🔥');
});

// **Enregistre d’abord tes routes**
app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/produits', require('./routes/produitRoutes'));
app.use('/api/lignes', require('./routes/ligneCommandeRoutes'));
app.use('/api/commandes', require('./routes/commandeRoutes'));

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});

// //routes
// const clientRoutes = require('./routes/clientRoutes');
// app.use('/api/clients', clientRoutes);


