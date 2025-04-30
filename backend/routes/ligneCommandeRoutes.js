// backend/routes/ligneCommandeRoutes.js
const express = require('express');
const router = express.Router();
const LigneCommande = require('../models/LigneCommande');

// GET all lignes
router.get('/', async (req, res) => {
  try {
    const lignes = await LigneCommande.find().populate('produit');
    res.json(lignes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one ligne
router.get('/:id', async (req, res) => {
  try {
    const ligne = await LigneCommande.findById(req.params.id).populate('produit');
    if (!ligne) return res.status(404).json({ message: 'Ligne non trouvée' });
    res.json(ligne);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create ligne
router.post('/', async (req, res) => {
  const { produit, quantite, totalLigne } = req.body;
  const ligne = new LigneCommande({ produit, quantite, totalLigne });
  try {
    const nouv = await ligne.save();
    res.status(201).json(nouv);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update ligne
router.put('/:id', async (req, res) => {
  try {
    const updated = await LigneCommande.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE ligne
router.delete('/:id', async (req, res) => {
  try {
    await LigneCommande.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ligne supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
