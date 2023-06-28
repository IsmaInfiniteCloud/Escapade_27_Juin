const Hebergement = require('../models/Hebergement');
const User = require('../models/User');
const Reservation = require('../models/Reservation');


exports.createReservation = async (req, res) => {
    try {
      
        const user = await User.findById(req.body.idClient);
      //const user = await User.findById("6491cb59fab76de47e2b7a7b");
      console.log("le user est: "+req.body.idClient);

      const hebergement = await Hebergement.findById(req.body.idHebergement);
      //const hebergement = await Hebergement.findById("6491d03ccc07ec5bb69ce092");
      console.log("le hegergement est: "+req.body.idHebergement);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      if (!hebergement) {
        return res.status(404).json({ message: 'Hebergement not found' });
      }
  
      const newReservation = new Reservation({
        //attend tous les champs possibles
        ...req.body,
        hebergement: hebergement._id, 
        idClient: user._id,
      });
  
      const savedReservation = await newReservation.save();
  
      // Update les offres hebergements du user
      hebergement.reservations.push(savedReservation._id);
      await hebergement.save();
  
      user.reservations.push(savedReservation._id);
      await user.save();

      res.status(201).json(savedReservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.deleteReservation = async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.id);
  
      if (!reservation) {
        return res.status(404).json({ message: "Hebergement not found" });
      }
  
      await reservation.deleteOne();
      res.status(200).json({ message: "Hebergement removed" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };