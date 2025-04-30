// backend/routes/commandeRoutes.js
const express = require('express');
const router = express.Router();
const Commande = require('../models/Commande');

// GET all commandes
router.get('/', async (req, res) => {
  try {
    const commandes = await Commande.find()
      .populate('client')
      .populate({ path: 'lignes', populate: { path: 'produit' } });
    res.json(commandes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single commande
router.get('/:id', async (req, res) => {
  try {
    const cmd = await Commande.findById(req.params.id)
      .populate('client')
      .populate({ path: 'lignes', populate: { path: 'produit' } });
    if (!cmd) return res.status(404).json({ message: 'Commande non trouvée' });
    res.json(cmd);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create commande (en attente des lignes créées indépendamment)
router.post('/', async (req, res) => {
  const { client, date, lignes } = req.body;
  const cmd = new Commande({ client, date, lignes });
  try {
    const nouv = await cmd.save();
    res.status(201).json(nouv);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update commande
router.put('/:id', async (req, res) => {
  try {
    const updated = await Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE commande
router.delete('/:id', async (req, res) => {
  try {
    await Commande.findByIdAndDelete(req.params.id);
    res.json({ message: 'Commande supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
