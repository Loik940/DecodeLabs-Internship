const express = require('express');
const router = express.Router();
const plats = require('../data/plats.json');

// Route pour récupérer toutes les commandes
router.get('/commandes', (req, res) => {
    if (commandes.length === 0) {
        return res.status(200).json({ 
            message: 'Aucune commande pour le moment',
            commandes: [] 
        });
    }
    res.status(200).json(commandes);
});

// Route pour récupérer tous les plats
router.get('/', (req, res) => {
  res.status(200).json(plats);
});

// Route pour récupérer un plat par son ID
router.get('/:id', (req, res) => {
  const Id = parseInt(req.params.id);
  const plat = plats.find(p => p.id === Id);
  if (plat) {
    res.status(200).json(plat);
  } else {
    res.status(404).json({ message: 'Plat non trouvé' });
  }
});




module.exports = router;