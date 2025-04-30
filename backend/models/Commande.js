// backend/models/Commande.js
const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  lignes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LigneCommande'
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Commande', commandeSchema);
