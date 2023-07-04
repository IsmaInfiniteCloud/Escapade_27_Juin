// const mongoose = require("mongoose");

// const HebergementSchema = new mongoose.Schema({
//   idHebergement: mongoose.Schema.Types.ObjectId,
//   titre: String,
//   description: String,
//   imageSrc: [],
//   categorie: String,
//   nbChambres: Number,
//   nbSalleBains: Number,
//   nbPersonneMax: Number,
//   localisation: {
//     adresse: String,
//     ville: String,
//     pays: String,
//     codePostal: String,
//   },
//   date_bloque: [],
//   prix: Number,
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
//   animalAccepte: Boolean,
// });

// module.exports = mongoose.model("Hebergement", HebergementSchema);

const mongoose = require("mongoose");

const hebergementSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nbSallesDeBain: Number,
  nbChambres: Number,
  nbPersonnesMax: Number,
  idUser: Number,
  adresse: String,
  ville: String,
  pays: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  description: String,
  photos: [String],
  prix: Number,
  categorie: String,
  titre: String,
  animalAccepte: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date_bloque: [],
  Reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
});

hebergementSchema.index({ location: "2dsphere" });

const Hebergement = mongoose.model("Hebergement", hebergementSchema);

module.exports = Hebergement;
