// backend/routes/produitRoutes.js
const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit');

// GET all produits
router.get('/', async (req, res) => {
  try {
    const produits = await Produit.find();
    res.json(produits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single produit
router.get('/:id', async (req, res) => {
  try {
    const prod = await Produit.findById(req.params.id);
    if (!prod) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(prod);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create produit
router.post('/', async (req, res) => {
  const { libelle, prix } = req.body;
  const prod = new Produit({ libelle, prix });
  try {
    const nouveau = await prod.save();
    res.status(201).json(nouveau);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update produit
router.put('/:id', async (req, res) => {
  try {
    const updated = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE produit
router.delete('/:id', async (req, res) => {
  try {
    await Produit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
