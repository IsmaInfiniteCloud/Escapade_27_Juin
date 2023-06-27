const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  idReservation: mongoose.Schema.Types.ObjectId,
  idClient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  idHebergement: { type: mongoose.Schema.Types.ObjectId, ref: 'Hebergement' },
  dateDebut: Date,
  dateFin: Date,
  prixTotal: Number,
  dateReservation: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
