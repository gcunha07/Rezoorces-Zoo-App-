const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  personalKg: { type: Number, required: true },
  number: { type: Number, required: true },
  fotoAnimalUrl: { type: String, required: true },
}, {
  versionKey: false
});

module.exports = mongoose.models.Animals || mongoose.model('Animal', animalSchema);
