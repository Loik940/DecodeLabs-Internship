const mongoose = require('mongoose');

const ligneCommandeSchema = new mongoose.Schema({
  platId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plat',
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  quantite: {
    type: Number,
    required: true,
    min: 1
  },
  prixUnitaire: {
    type: Number,
    required: true,
    min: 0
  }
});

const commandeSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true,
    trim: true
  },
  adresse: {
    type: String,
    required: true,
    trim: true
  },
  statut: {
    type: String,
    enum: ['en attente', 'confirmée', 'livrée', 'annulée'],
    default: 'en attente'
  },
  prixTotal: {
    type: Number,
    required: true,
    min: 0
  },
  lignes: [ligneCommandeSchema]
}, { timestamps: true });

module.exports = mongoose.model('Commande', commandeSchema);