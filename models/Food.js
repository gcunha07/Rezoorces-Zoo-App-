const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
	name: { type: String, required: true },
	totalKg: { type: Number, required: true },
	fotoFoodUrl: { type: String, required: true },
}, {
	versionKey: false
});

module.exports = mongoose.models.Food || mongoose.model('Food', foodSchema);
