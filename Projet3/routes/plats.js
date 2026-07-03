const express = require('express');
const router = express.Router();
const Plat = require('../models/Plat');

// Récupérer tous les plats
router.get('/', async (req, res) => {
  try {
    const plats = await Plat.find();
    res.status(200).json(plats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Récupérer un plat par son ID
router.get('/:id', async (req, res) => {
  try {
    const plat = await Plat.findById(req.params.id);
    if (!plat) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    res.status(200).json(plat);
  } catch (error) {
  
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de plat invalide' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Ajouter un plat
router.post('/', async (req, res) => {
  try {
    const plat = new Plat(req.body);
    const nouveauPlat = await plat.save();
    res.status(201).json(nouveauPlat);
  } catch (error) {
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Un plat avec ce nom existe déjà' });
    }
    res.status(400).json({ message: error.message });
  }
});

// Modifier un plat
router.put('/:id', async (req, res) => {
  try {
    const plat = await Plat.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!plat) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    res.status(200).json(plat);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de plat invalide' });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Un plat avec ce nom existe déjà' });
    }
    res.status(400).json({ message: error.message });
  }
});

// Supprimer un plat 
router.delete('/:id', async (req, res) => {
  try {
   
    const plat = await Plat.findByIdAndUpdate(
      req.params.id,
      { disponible: false },
      { new: true }
    );
    if (!plat) {
      return res.status(404).json({ message: 'Plat non trouvé' });
    }
    res.status(200).json({ message: 'Plat désactivé avec succès', plat });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de plat invalide' });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;