const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  motDePasse: String,
  favoris: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hebergement' }],
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
  hebergements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hebergement' }]
});

module.exports = mongoose.model('User', UserSchema);
