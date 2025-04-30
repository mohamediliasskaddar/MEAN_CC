// backend/models/Produit.js
const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  libelle: {
    type: String,
    required: true,
    trim: true
  },
  prix: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Produit', produitSchema);
