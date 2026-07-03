const express = require('express');
const router = express.Router();
const Commande = require('../models/Commande');
const Plat = require('../models/Plat');

// GET /commandes — lire toutes les commandes
router.get('/', async (req, res) => {
  try {
    const commandes = await Commande.find();
    if (commandes.length === 0) {
      return res.status(200).json({
        message: 'Aucune commande pour le moment',
        commandes: []
      });
    }
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /commandes/:id — lire une commande
router.get('/:id', async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.status(200).json(commande);
  } catch (error) {
    // CastError = Mongoose n'arrive pas à convertir req.params.id en ObjectId
    // → faute du client (ID mal formé), donc 400, pas 500
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de commande invalide' });
    }
    res.status(500).json({ message: error.message });
  }
});

// POST /commandes — créer une commande
router.post('/', async (req, res) => {
  try {
    const { client, adresse, lignes } = req.body;

    if (!client || !adresse || !lignes || lignes.length === 0) {
      return res.status(400).json({
        message: 'Les champs client, adresse et lignes sont obligatoires'
      });
    }

    // Vérifier chaque plat et calculer le prix total
    let prixTotal = 0;
    const lignesValidées = [];

    for (const ligne of lignes) {
      const plat = await Plat.findById(ligne.platId);
      if (!plat) {
        return res.status(404).json({ message: `Plat ${ligne.platId} introuvable` });
      }
      if (!plat.disponible) {
        return res.status(400).json({ message: `Le plat "${plat.nom}" est indisponible` });
      }

      lignesValidées.push({
        platId: plat._id,
        nom: plat.nom,
        quantite: ligne.quantite,
        prixUnitaire: plat.prix
      });

      prixTotal += plat.prix * ligne.quantite;
    }

    const commande = new Commande({
      client,
      adresse,
      lignes: lignesValidées,
      prixTotal
    });

    const nouvelleCommande = await commande.save();
    res.status(201).json({ message: 'Commande créée avec succès', commande: nouvelleCommande });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /commandes/:id/statut — modifier le statut
router.put('/:id/statut', async (req, res) => {
  try {
   
    const statutsValides = ['en attente', 'confirmée', 'livrée', 'annulée'];
    if (!req.body.statut || !statutsValides.includes(req.body.statut)) {
      return res.status(400).json({ message: 'Statut invalide ou manquant' });
    }

    const commande = await Commande.findByIdAndUpdate(
      req.params.id,
      { statut: req.body.statut },
      { new: true, runValidators: true }
    );
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.status(200).json(commande);
  } catch (error) {
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de commande invalide' });
    }
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;