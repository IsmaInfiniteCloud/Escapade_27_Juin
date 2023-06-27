// Import Hebergement model
const Hebergement = require("../models/Hebergement");

// Import User model
const User = require("../models/User");

// Create Hebergement linked to user
exports.createHebergement = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newHebergement = new Hebergement({
      //attend tous les champs possibles et ajoute userId
      ...req.body,
      user: user._id,
    });

    const savedHebergement = await newHebergement.save();

    // Update les offres hebergements du user
    user.hebergements.push(savedHebergement._id);
    await user.save();

    res.status(201).json(savedHebergement);
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
