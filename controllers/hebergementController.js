// Import Hebergement model
const Hebergement = require("../models/Hebergement");

// Import User model
const User = require("../models/User");

// Create Hebergement linked to user
exports.createHebergement = async (req, res) => {
  try {
    // Get user Id from the request body
    const userId = req.body.idUser;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new 'hebergement' excluding 'idUser' from request body
    const { idUser, ...hebergementData } = req.body;
    const newHebergement = new Hebergement({
      ...hebergementData,
      userId: userId,
    });

    const savedHebergement = await newHebergement.save();

    // Update the 'hebergements' of the user
    user.hebergements.push(savedHebergement._id);
    await user.save();

    // res.status(201).json(savedHebergement);
    res.status(201).json({
      message: "Escapade créée avec succès.",
      hebergement: savedHebergement,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete
exports.deleteHebergement = async (req, res) => {
  try {
    const hebergement = await Hebergement.findById(req.params.id);

    if (!hebergement) {
      return res.status(404).json({ message: "Hebergement not found" });
    }

    await hebergement.deleteOne();
    res.status(200).json({ message: "Hebergement removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// hebergement Update
exports.updateHebergement = async (req, res) => {
  try {
    const hebergement = await Hebergement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!hebergement) {
      return res.status(404).json({ message: "Hebergement not found" });
    }

    res.status(200).json(hebergement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// hebergement see Details
exports.getHebergement = async (req, res) => {
  try {
    const hebergement = await Hebergement.findById(req.params.id);

    if (!hebergement) {
      return res.status(404).json({ message: "Hebergement not found" });
    }

    res.status(200).json(hebergement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//get-all hebergement
exports.allHebergement = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const hebergements = await Hebergement.aggregate([
      { $sample: { size: limit } },
    ]);

    if (!hebergements || hebergements.length === 0) {
      return res.status(404).json({ message: "Aucun hebergement nexiste" });
    }

    res.status(200).json(hebergements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
