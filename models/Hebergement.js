const mongoose = require("mongoose");

const HebergementSchema = new mongoose.Schema({
  idHebergement: mongoose.Schema.Types.ObjectId,
  titre: String,
  description: String,
  imageSrc: [],
  categorie: {
    type: String,
    enum: ["Chalet", "Appartement", "Maison"],
  },
  nbChambres: Number,
  nbSalleBains: Number,
  nbPersonneMax: Number,
  localisation: {
    adresse: String,
    ville: String,
    pays: String,
    codePostal: String,
  },
  date_bloque: [],
  prix: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
  animalAccepte: Boolean,
});

module.exports = mongoose.model("Hebergement", HebergementSchema);
