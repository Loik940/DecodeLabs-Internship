const express = require('express');
const router = express.Router();
const plats = require('../data/plats.json');

const commandes = [];
let prochainId = 1;

// GET /commandes — lire toutes les commandes
router.get('/', (req, res) => {
    if (commandes.length === 0) {
        return res.status(200).json({
            message: 'Aucune commande pour le moment',
            commandes: []
        });
    }
    res.status(200).json(commandes);
});

// POST /commandes — créer une commande
router.post('/', (req, res) => {
    const { client, platId, quantite, adresse } = req.body;

    if (!client || !platId || !quantite || !adresse) {
        return res.status(400).json({
            message: 'Les champs client, platId, quantite et adresse sont obligatoires'
        });
    }

    const plat = plats.find(p => p.id === parseInt(platId));
    if (!plat) {
        return res.status(404).json({ message: 'Ce plat est inexistant' });
    }

    if (!plat.disponible) {
        return res.status(400).json({ message: 'Ce plat est indisponible' });
    }

    const commande = {
        id: prochainId++,
        client,
        platId,
        quantite,
        adresse,
        prix: plat.prix * quantite,
        statut: 'confirmée'
    };

    commandes.push(commande);
    res.status(201).json({ message: 'Commande créée avec succès', commande });
});

module.exports = router;