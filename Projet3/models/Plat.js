const mongoose = require('mongoose');

const platSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  prix: {
    type: Number,
    required: true,
    min: 0
  },
  disponible: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Plat', platSchema);