const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  personalFoodIntake: { type: Number, required: true },
  number: { type: Number, default: 1 },
  photoAnimalUrl: { type: String, required: true },
}, {
  versionKey: false
});

module.exports = mongoose.models.Animals || mongoose.model('Animal', animalSchema);
